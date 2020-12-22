const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

function deleteCollectionByRef(ref, batchSize) {
  const query = ref.limit(batchSize)
  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, batchSize, resolve, reject)
  })
}

function deleteQueryBatch(query, batchSize, resolve, reject) {
  query
    .get()
    .then((snapshot) => {
      if (snapshot.size === 0) {
        return 0
      }

      const batch = db.batch()
      snapshot.docs.forEach((doc) => batch.delete(doc.ref))
      return batch.commit().then(() => snapshot.size)
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve()
        return false
      }
      process.nextTick(() => {
        deleteQueryBatch(query, batchSize, resolve, reject)
      })
    })
    .catch(reject)
}

exports.deleteUser = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    const res = await admin.auth().deleteUser(data)
    return res
  })

exports.deleteUserData = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user) => {
    const uid = user.uid
    const posts = db.collection('posts').where('authorId', '==', uid)
    const deleteAllPosts = deleteCollectionByRef(posts, 499)
    const deleteDbUser = db.doc(`users/${user.uid}`).delete()
    const res = await Promise.all([deleteAllPosts, deleteDbUser])
    return res
  })

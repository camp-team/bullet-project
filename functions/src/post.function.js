const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')

const config = functions.config()
const client = algoliasearch(config.algolia.app_id, config.algolia.secret_key)

function transformDate(data) {
  return Object.entries(data).reduce((obj, [key, value]) => {
    if (value instanceof admin.firestore.Timestamp) {
      obj[key] = value.toMillis()
    }
    return obj
  }, data)
}

exports.createPost = functions
  .region('asia-northeast1')
  .firestore.document('posts/{id}')
  .onCreate((snap) => {
    const data = snap.data()
    const index = client.initIndex('posts')
    const item = transformDate(data)

    item.objectID = item.postId
    return index.saveObject(item)
  })

exports.deletePost = functions
  .region('asia-northeast1')
  .firestore.document('posts/{id}')
  .onDelete((snap) => {
    const data = snap.data()

    if (data) {
      const index = client.initIndex('posts')
      return index.deleteObject(data.postId)
    } else {
      return false
    }
  })

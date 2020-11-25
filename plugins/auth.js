import firebase from '~/plugins/firebase'

export default function ({ store }) {
  if (store.getters['auth/user'] !== null) return

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userObject = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
      store.dispatch('auth/setUser', userObject)
    }
  })
}

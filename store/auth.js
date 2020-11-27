import firebase from '~/plugins/firebase'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  logout(state) {
    state.user = null
  },
}

export const actions = {
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  googleLogin() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('logout')
      })
  },
}

export const getters = {
  user: (state) => {
    return state.user
  },
  isAuthenticated: (state) => {
    return !!state.user
  },
}

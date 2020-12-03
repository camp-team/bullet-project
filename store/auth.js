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
  logout({ commit }) {
    commit('logout')
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

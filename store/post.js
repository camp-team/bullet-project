export const state = () => ({
  posts: [],
})

export const mutations = {
  addPost(state, payload) {
    state.posts.push(payload)
  },
}

export const actions = {
  addPost({ commit }, { content, name, color }) {
    const newPost = {
      content,
      name,
      color,
    }
    commit('addPost', newPost)
  },
}

export const state = () => ({
  posts: [],
  filterQuery: {},
  colors: ['BLACK', 'BLUE', 'PURPLE', 'GREEN', 'RED', 'YELLOW', 'WHITE'],
})

export const mutations = {
  addPost(state, payload) {
    state.posts.push(payload)
  },
  setFilter(state, payload) {
    state.filterQuery = { ...payload }
  },
}

export const actions = {
  addPost({ commit }, { content, color }) {
    const newPost = {
      content,
      color,
    }
    commit('addPost', newPost)
  },
  setFilter({ commit }, filterQuery) {
    commit('setFilter', filterQuery)
  },
}

export const getters = {
  filterdPosts: (state) => {
    let posts = state.posts
    const keyword = state.filterQuery.keyword

    if (keyword) {
      posts = posts.filter((post) => {
        return post.content.includes(keyword) || post.name.includes(keyword)
      })
    }

    if (state.filterQuery.color) {
      posts = posts.filter((post) => {
        return post.color === state.filterQuery.color
      })
    }

    return posts
  },
}

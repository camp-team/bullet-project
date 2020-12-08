import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const postRef = db.collection('posts')

export const state = () => ({
  posts: [],
  filterQuery: {},
  colors: ['black', 'blue', 'purple', 'green', 'red', 'yellow', 'white'],
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
  setFilter({ commit }, filterQuery) {
    commit('setFilter', filterQuery)
  },
  fetch({ commit }) {
    return new Promise((resolve, reject) => {
      postRef.get().then((res) => {
        res.forEach((doc) => {
          commit('addPost', doc.data())
        })
        resolve()
      })
    })
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

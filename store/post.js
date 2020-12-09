import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const postRef = db.collection('posts')
const userRef = db.collection('users')

export const state = () => ({
  posts: [],
  filterQuery: {},
  colors: ['black', 'blue', 'purple', 'green', 'red', 'yellow', 'white'],
  authors: [],
  postsWithAuthor: [],
})

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setAuthor(state, payload) {
    state.authors.push(payload)
  },
  setPostsWithAuthor(state, payload) {
    state.postsWithAuthor = payload
  },
  setFilter(state, payload) {
    state.filterQuery = { ...payload }
  },
}

export const actions = {
  setFilter({ commit }, filterQuery) {
    commit('setFilter', filterQuery)
  },
  setPosts({ commit, dispatch }) {
    postRef.onSnapshot((querySnapshot) => {
      const posts = []
      querySnapshot.forEach((doc) => {
        posts.push(doc.data())
      })
      commit('setPosts', posts)
      dispatch('setAuthors')
    })
  },
  setAuthors({ commit, dispatch }) {
    userRef
      .get()
      .then((ref) => {
        ref.forEach((doc) => {
          commit('setAuthor', doc.data())
        })
      })
      .then(() => {
        dispatch('setPostsWithAuthor')
      })
  },
  setPostsWithAuthor({ commit, state }) {
    const posts = state.posts
    const authors = state.authors
    const result = posts.map((post) => {
      const postWithAuthor = {
        ...post,
        author: authors.find((user) => user.uid === post.authorId),
      }
      return postWithAuthor
    })
    commit('setPostsWithAuthor', result)
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

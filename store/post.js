import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const postRef = db.collection('posts')
const userRef = db.collection('users')

export const state = () => ({
  posts: [],
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
}

export const actions = {
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
      .then((res) => {
        res.forEach((doc) => {
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
  orderedPosts: (state) => {
    // eslint-disable-next-line no-undef
    return _.orderBy(state.postsWithAuthor, 'createdAt', 'desc')
  },
  filterByColor: (state) => (color) => {
    let posts = state.postsWithAuthor

    if (color) {
      posts = posts.filter((post) => {
        return post.color === color
      })
    }

    // eslint-disable-next-line no-undef
    return _.orderBy(posts, 'createdAt', 'desc')
  },
}

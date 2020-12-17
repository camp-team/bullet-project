import algoliasearch from 'algoliasearch/lite'
import firebase from '~/plugins/firebase'

const client = algoliasearch('2JJ6QFSYJE', '49d155a98ed7b52ce9b20cd157d0d133')
const index = client.initIndex('posts_dev')

const db = firebase.firestore()
const postRef = db.collection('posts')
const userRef = db.collection('users')

export const state = () => ({
  posts: [],
  colors: ['black', 'blue', 'purple', 'green', 'red', 'yellow', 'white'],
  authors: [],
  postsWithAuthor: [],
  searchHits: [],
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
  setSearchHits(state, payload) {
    state.searchHits = payload
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
  async search({ commit }, keyword) {
    const result = await index.search(keyword)
    commit('setSearchHits', result.hits)
  },
}

export const getters = {
  orderedPosts: (state) => {
    // eslint-disable-next-line no-undef
    return _.orderBy(state.postsWithAuthor, 'createdAt', 'desc')
  },
  searchHits: (state) => {
    const posts = state.searchHits
    const authors = state.authors
    const result = posts.map((post) => {
      const postWithAuthor = {
        ...post,
        author: authors.find((user) => user.uid === post.authorId),
      }
      return postWithAuthor
    })
    return result
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

<template>
  <v-row v-masonry class="grid masonry-container" item-selector=".item">
    <v-col
      v-for="(post, i) in postsWithAuthor"
      :key="i"
      v-masonry-tile
      class="item"
      cols="12"
      sm="4"
    >
      <v-card class="grid__card" :class="post.color | toClass" outlined>
        <v-card-text class="card__body">
          <span class="card__icon"><v-icon>mdi-train-variant</v-icon></span>
          <p class="card__content">{{ post.content }}</p>
          <p class="mb-0 text-right">
            {{ post.author.displayName }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  filters: {
    toClass(color) {
      if (!color) return ''
      return 'is-' + color
    },
  },
  data() {
    return {
      postsWithAuthor: [],
    }
  },
  computed: {
    posts() {
      return this.$store.state.post.posts
    },
  },
  created() {
    this.$store.dispatch('post/fetch').then(() => {
      this.getPosts(this.posts)
    })
  },
  mounted() {
    this.$redrawVueMasonry()
  },
  methods: {
    getPosts(posts) {
      this.getAuthers(posts).then((users) => this.addAuthorToPost(users))
    },
    getAuthers(posts) {
      return new Promise((resolve, reject) => {
        if (posts.length) {
          const authorIds = posts
            .filter((post, index, self) => {
              return (
                self.findIndex((item) => post.authorId === item.authorId) ===
                index
              )
            })
            .map((post) => post.authorId)

          const users = Promise.all(
            authorIds.map(async (uid) => {
              const doc = await firebase
                .firestore()
                .collection('users')
                .doc(uid)
                .get()
              const data = doc.data()
              return data
            })
          )

          resolve(users)
        } else {
          resolve([])
        }
      })
    },
    addAuthorToPost(users) {
      const result = this.posts.map((post) => {
        const postWithAuthor = {
          ...post,
          author: users.find((user) => user.uid === post.authorId),
        }
        return postWithAuthor
      })
      this.postsWithAuthor = result
    },
  },
}
</script>

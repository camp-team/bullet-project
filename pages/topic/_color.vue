<template>
  <div class="content">
    <div class="container">
      <h1 class="page__title">
        <span>{{ color }}</span
        >の投稿一覧
      </h1>
      <v-row v-masonry class="grid masonry-container" item-selector=".item">
        <v-col
          v-for="(post, i) in posts"
          :key="i"
          v-masonry-tile
          class="item"
          cols="12"
          sm="4"
        >
          <Card :post="post" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import Card from '~/components/Card'

const client = algoliasearch('2JJ6QFSYJE', '49d155a98ed7b52ce9b20cd157d0d133')
const index = client.initIndex('posts_dev')

export default {
  components: {
    Card,
  },
  asyncData({ params }) {
    const color = params.color
    return { color }
  },
  data() {
    return {
      posts: [],
    }
  },
  computed: {
    authors() {
      return this.$store.state.post.authors
    },
  },
  created() {
    this.$store.dispatch('post/setAuthors').then(() => {
      this.search()
    })
  },
  methods: {
    async search() {
      const result = await index.search('', {
        facetFilters: [`color:${this.color}`],
      })
      const posts = result.hits.map((post) => {
        const postWithAuthor = {
          ...post,
          author: this.authors.find((user) => user.uid === post.authorId),
        }
        return postWithAuthor
      })
      this.posts = posts
    },
  },
}
</script>

<style lang="scss" scoped>
.page__title {
  font-size: 24px;
  text-align: center;

  span {
    text-transform: capitalize;
  }
}
</style>

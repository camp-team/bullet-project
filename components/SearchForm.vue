<template>
  <div>
    <form @submit.prevent>
      <v-row :justify="justify">
        <v-col cols="12" sm="8">
          <v-text-field
            v-model.trim="keyword"
            outlined
            label="search keyword"
            prepend-inner-icon="fas fa-search"
            hide-details="auto"
            @change="search()"
          ></v-text-field>
        </v-col>
      </v-row>
    </form>
    <div class="chips text-center">
      <p class="chips__title">Color Topics</p>
      <div>
        <v-chip class="chips__item" color="rgba(0, 0, 0, 0.8)" to="/topic/black"
          ><v-icon left small>fas fa-train</v-icon>black</v-chip
        >
        <v-chip
          class="chips__item"
          color="rgba(66, 165, 245, 0.8)"
          to="/topic/blue"
          ><v-icon left small>fas fa-train</v-icon>blue</v-chip
        >
        <v-chip
          class="chips__item"
          color="rgba(171, 71, 188, 0.8)"
          to="/topic/purple"
          ><v-icon left small>fas fa-train</v-icon>purple</v-chip
        >
        <v-chip
          class="chips__item"
          color="rgba(102, 187, 106, 0.8)"
          to="/topic/green"
          ><v-icon left small>fas fa-train</v-icon>green</v-chip
        >
        <v-chip
          class="chips__item"
          color="rgba(239, 83, 80, 0.8)"
          to="/topic/red"
          ><v-icon left small>fas fa-train</v-icon>red</v-chip
        >
        <v-chip
          class="chips__item"
          color="rgba(255, 202, 40, 0.8)"
          to="/topic/yellow"
          ><v-icon left small>fas fa-train</v-icon>yellow</v-chip
        >
        <v-chip
          class="chips__item"
          color="rgba(189, 189, 189, 0.8)"
          to="/topic/white"
          ><v-icon left small>fas fa-train</v-icon>white</v-chip
        >
      </div>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch('2JJ6QFSYJE', '49d155a98ed7b52ce9b20cd157d0d133')
const index = client.initIndex('posts_dev')

export default {
  data() {
    return {
      keyword: '',
      justify: 'center',
    }
  },
  computed: {
    colors() {
      return this.$store.state.post.colors
    },
    authors() {
      return this.$store.state.post.authors
    },
  },
  methods: {
    async search() {
      const searchedPosts = await index.search(this.keyword)
      const result = searchedPosts.hits.map((post) => {
        const postWithAuthor = {
          ...post,
          author: this.authors.find((user) => user.uid === post.authorId),
        }
        return postWithAuthor
      })
      this.$emit('search', result)
    },
  },
}
</script>

<style lang="scss" scoped>
.chips {
  padding: 20px 0;

  &__title {
    font-size: 18px;
    font-weight: bold;
  }

  &__item {
    margin: 5px 2px;
    color: #fff;
  }
}
</style>

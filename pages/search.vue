<template>
  <div class="my-content">
    <div class="search-area">
      <div class="container pt-6 pb-6">
        <SearchForm @search="onSearch" />
      </div>
    </div>
    <div v-if="posts">
      <div class="container pt-6 pb-6">
        <v-row v-masonry class="masonry-container" item-selector=".item">
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
  </div>
</template>

<script>
import SearchForm from '~/components/SearchForm'
import Card from '~/components/Card'
import headMeta from '~/mixins/headMeta.js'

export default {
  components: {
    SearchForm,
    Card,
  },
  mixins: [headMeta],
  data() {
    return {
      meta: {
        title: 'Search | from 8号車',
        description: 'from 8号車の、検索ページです。',
      },
      posts: [],
    }
  },
  methods: {
    onSearch(result) {
      this.posts = result
    },
  },
}
</script>

<style lang="scss" scoped>
.search-area {
  background-color: #fff;
}
</style>

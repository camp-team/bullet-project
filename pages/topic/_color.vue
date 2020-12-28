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
import Card from '~/components/Card'
import headMeta from '~/mixins/headMeta.js'

export default {
  components: {
    Card,
  },
  mixins: [headMeta],
  asyncData({ params }) {
    const color = params.color
    return { color }
  },
  data() {
    return {
      meta: {
        title: 'topic | from 8号車',
        description: 'from 8号車の、topicページです。',
      },
    }
  },
  computed: {
    posts() {
      return this.$store.getters['post/filterByColor'](this.color)
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

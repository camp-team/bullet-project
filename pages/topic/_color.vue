<template>
  <div class="my-content">
    <div class="container pt-6 pb-6">
      <h1 class="page__title">
        <span>{{ color }}</span
        >の投稿一覧
      </h1>
      <v-row v-masonry class="mt-8 masonry-container" item-selector=".item">
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

export default {
  components: {
    Card,
  },
  asyncData({ params }) {
    const color = params.color
    return { color }
  },
  computed: {
    posts() {
      return this.$store.getters['post/filterByColor'](this.color)
    },
  },
  head() {
    return {
      title: `${this.color}の投稿一覧 | from 8号車`,
      meta: [
        {
          hid: 'description',
          name: 'descripton',
          content: `from 8号車の、${this.color}の投稿一覧です。`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.color}の投稿一覧 | from 8号車`,
        },
        {
          hid: 'og:description',
          name: 'og:descripton',
          content: `from 8号車の、${this.color}の投稿一覧です。`,
        },
      ],
    }
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

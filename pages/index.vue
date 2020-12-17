<template>
  <div class="content">
    <div class="container">
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
import Card from '~/components/Card.vue'

export default {
  components: {
    Card,
  },
  computed: {
    posts() {
      return this.$store.getters['post/orderedPosts']
    },
  },
  created() {
    this.$store.dispatch('post/setPosts')
  },
}
</script>

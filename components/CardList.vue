<template>
  <v-row v-masonry class="grid masonry-container" item-selector=".item">
    <v-col
      v-for="(post, i) in posts"
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
            {{ post.name }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  filters: {
    toClass(color) {
      if (!color) return ''
      return 'is-' + color
    },
  },
  computed: {
    posts() {
      return this.$store.getters['post/filterdPosts']
    },
  },
  mounted() {
    this.$redrawVueMasonry()
  },
}
</script>

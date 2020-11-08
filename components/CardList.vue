<template>
  <v-row class="grid">
    <v-col v-for="(post, i) in posts" :key="i" cols="12" sm="4">
      <v-card :class="post.color | toClass">
        <v-card-text>
          <p>{{ post.content }}</p>
          <p class="text-right">{{ post.name }}</p>
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
      return 'is-' + color.toLowerCase()
    },
  },
  computed: {
    posts() {
      return this.$store.state.post.posts
    },
  },
}
</script>

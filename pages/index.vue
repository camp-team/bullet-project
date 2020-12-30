<template>
  <div class="my-content">
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
          <Card :post="post" @set-message="setMessage" />
        </v-col>
      </v-row>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="#ff4081"
        outlined
      >
        {{ message }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card.vue'

export default {
  components: {
    Card,
  },
  data() {
    return {
      snackbar: false,
      message: '',
      timeout: 5000,
    }
  },
  computed: {
    posts() {
      return this.$store.getters['post/orderedPosts']
    },
  },
  methods: {
    setMessage(arg) {
      this.message = arg
      this.snackbar = true
    },
  },
}
</script>

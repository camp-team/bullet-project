<template>
  <v-card :class="post.color | toClass">
    <v-card-text>
      <p>{{ post.content }}</p>
      <p class="text-right">{{ post.name }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  filters: {
    toClass(color) {
      if (!color) return ''
      return 'is-' + color.toLowerCase()
    },
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

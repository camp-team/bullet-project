<template>
  <v-card class="grid__card" :class="post.color | toClass" outlined>
    <v-card-text class="card__body">
      <span class="card__icon"><v-icon>mdi-train-variant</v-icon></span>
      <p class="card__content">{{ post.content }}</p>
      <p class="mb-0 text-right">
        {{ post.author.displayName }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  filters: {
    toClass(color) {
      if (!color) return ''
      return 'is-' + color
    },
  },
  props: {
    post: {
      type: Object,
      default() {
        return {
          content: '',
          color: 'black',
        }
      },
    },
  },
}
</script>

<template>
  <v-card class="card" :class="post.color | toClass" outlined>
    <v-card-text class="card__body">
      <span class="card__icon"><v-icon>mdi-train-variant</v-icon></span>
      <p class="card__content mb-0">{{ post.content }}</p>
    </v-card-text>
    <v-card-actions class="pt-0 pr-0 pl-0">
      <v-list-item dense class="grow">
        <v-list-item-avatar size="24px" class="mt-0 mr-2 mb-0">
          <v-img class="elevation-6" alt="" :src="post.author.photoURL"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="card__name">{{
            post.author.displayName
          }}</v-list-item-title>
        </v-list-item-content>
        <v-row
          v-if="this.$route.name === 'index' && user.uid === post.authorId"
          align="center"
          justify="end"
          class="mr-0"
        >
          <v-icon small @click="deletePost(post.postId)"
            >mdi-trash-can-outline</v-icon
          >
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from 'firebase'

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
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
  },
  methods: {
    deletePost(id) {
      if (confirm('一度削除すると戻すことができません。本当に削除しますか？')) {
        firebase
          .firestore()
          .collection('posts')
          .doc(id)
          .delete()
          .then(() => {
            this.$emit('set-message', '削除されました。')
          })
      }
    },
  },
}
</script>

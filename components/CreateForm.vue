<template>
  <v-dialog v-if="authenticated" v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="white--text"
        color="#ff4081"
        depressed
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>mdi-pencil</v-icon>
        投稿
      </v-btn>
    </template>
    <v-card>
      <v-card-title><span class="headline">投稿フォーム</span></v-card-title>
      <v-card-text>
        <form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="content"
                  outlined
                  counter
                  label="content"
                  :rules="rules"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="color"
                  outlined
                  :items="colors"
                  label="color"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed @click="dialog = false">CLOSE</v-btn>
        <v-btn class="white--text" color="#ff4081" depressed @click="submit"
          >投稿を作成</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  props: {
    authenticated: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      content: '',
      rules: [(v) => v.length <= 140 || 'Max 140 characters'],
      color: 'BLACK',
      colors: this.$store.state.post.colors,
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('post/addPost', {
        content: this.content,
        color: this.color,
      })
      this.setPost()
      this.content = ''
      this.color = 'BLACK'
      this.dialog = false
    },
    setPost() {
      return new Promise((resolve, reject) => {
        const postObject = {}
        postObject.postId = this.createId()
        postObject.content = this.content
        postObject.color = this.color
        postObject.createdAt = new Date()
        postObject.authorId = this.user.uid
        const newPost = firebase
          .firestore()
          .collection('posts')
          .doc(postObject.postId)
        newPost.set(postObject, { merge: true }).then((result) => {
          this.$router.push({ path: '/' })
          resolve(postObject)
        })
      })
    },
    createId() {
      return firebase.firestore().collection('_').doc().id
    },
  },
}
</script>

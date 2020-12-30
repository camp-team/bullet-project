<template>
  <v-dialog v-if="authenticated" v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="pl-2 pr-2"
        min-width="40px"
        color="#fff"
        depressed
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>fas fa-pen</v-icon>
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
                  counter
                  :error-messages="contentErrors"
                  label="content"
                  required
                  @input="$v.content.$touch()"
                  @blur="$v.content.$touch()"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="color"
                  :items="colors"
                  :error-messages="selectErrors"
                  label="color"
                  required
                  @change="$v.color.$touch()"
                  @blur="$v.color.$touch()"
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
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import firebase from '~/plugins/firebase'

export default {
  mixins: [validationMixin],
  validations: {
    content: { required, maxLength: maxLength(140) },
    color: { required },
  },
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
      color: 'black',
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    colors() {
      return this.$store.state.post.colors
    },
    contentErrors() {
      const errors = []
      if (!this.$v.content.$dirty) return errors
      !this.$v.content.required && errors.push('必須項目です')
      !this.$v.content.maxLength && errors.push('140文字以内で登録してください')
      return errors
    },
    selectErrors() {
      const errors = []
      if (!this.$v.color.$dirty) return errors
      !this.$v.color.required && errors.push('選択してください')
      return errors
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.setPost()
        this.content = ''
        this.color = 'black'
        this.dialog = false
      }
    },
    setPost() {
      const postObject = {
        postId: this.createId(),
        content: this.content,
        color: this.color,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        authorId: this.user.uid,
      }
      const newPost = firebase
        .firestore()
        .collection('posts')
        .doc(postObject.postId)
      newPost
        .set(postObject, { merge: true })
        .then((result) => {
          this.$emit('set-message', '投稿されました！')
          this.$router.push({ path: '/' })
        })
        .catch((result) => {
          this.$emit('set-message', '投稿できませんでした。')
        })
    },
    createId() {
      return firebase.firestore().collection('_').doc().id
    },
  },
}
</script>

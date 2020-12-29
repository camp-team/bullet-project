<template>
  <v-card class="my-card" :class="post.color | toClass" outlined>
    <v-card-text class="my-card__body">
      <p class="my-card__content mb-0">{{ post.content }}</p>
    </v-card-text>
    <v-card-actions class="pt-0 pr-0 pl-0">
      <v-list-item dense class="grow">
        <v-list-item-content>
          <v-list-item-title class="my-card__name">{{
            post.author.displayName
          }}</v-list-item-title>
        </v-list-item-content>
        <v-row
          v-if="this.$route.name === 'index'"
          align="center"
          justify="end"
          class="mr-0"
        >
          <v-icon
            v-if="user != null && user.uid === post.authorId"
            small
            @click="deletePost(post.postId)"
            >mdi-trash-can-outline</v-icon
          >
          <v-menu
            v-if="user != null && user.uid !== post.authorId"
            bottom
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on"
                ><v-icon>mdi-dots-horizontal</v-icon></v-btn
              >
            </template>
            <v-list dense>
              <v-list-item
                href="https://forms.gle/H2UDZmD5d71r2h8t9"
                target="_blank"
              >
                <v-list-item-title>報告</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import firebase from '~/plugins/firebase'

export default {
  filters: {
    toClass(color) {
      if (!color) return ''
      return 'is-' + color
    },
  },
  mixins: [validationMixin],
  validations: {
    content: { required, maxLength: maxLength(500) },
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
  data() {
    return {
      dialog: false,
      content: '',
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    contentErrors() {
      const errors = []
      if (!this.$v.content.$dirty) return errors
      !this.$v.content.required && errors.push('必須項目です')
      !this.$v.content.maxLength && errors.push('500文字以内で入力してください')
      return errors
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
    openDialog() {
      setTimeout(() => (this.dialog = true))
    },
    submit(postId) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendMail(postId)
        this.content = null
        this.dialog = false
      }
    },
    async sendMail(postId) {
      const functions = firebase.app().functions('asia-northeast1')
      const sendInvite = functions.httpsCallable('sendMail')

      const res = await sendInvite({
        dynamic_template_data: {
          subject: '違反の報告',
          name: this.user.uid,
          postId,
          content: this.content,
        },
      })
      return res
    },
  },
}
</script>

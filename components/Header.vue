<template>
  <v-app-bar class="header" color="#fff" flat fixed app>
    <v-toolbar-title class="header__title" v-text="title" />
    <v-spacer />
    <v-btn icon to="/search"><v-icon>mdi-magnify</v-icon></v-btn>
    <v-btn
      v-if="!isAuthenticated"
      class="white--text"
      color="#ff4081"
      depressed
      @click="googleLogin()"
      >Sign in</v-btn
    >
    <v-menu v-if="isAuthenticated" class="header__menu" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="header__icon" icon v-bind="attrs" v-on="on"
          ><img v-if="user" :src="user.photoURL" alt="" /><v-icon v-else large
            >mdi-account-circle-outline</v-icon
          ></v-btn
        >
      </template>
      <v-list>
        <v-list-item v-if="user">
          <v-list-item-title class="list__title"
            >{{ user.displayName }} さん</v-list-item-title
          >
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item @click="logout()">
          <v-list-item-icon class="list__icon">
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="list__title">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <CreateForm :authenticated="isAuthenticated" @set-message="formMessage" />
    <v-snackbar v-model="snackbar" :timeout="timeout" color="#ff4081" outlined>
      {{ message }}
    </v-snackbar>
  </v-app-bar>
</template>

<script>
import firebase from '~/plugins/firebase'
import CreateForm from '~/components/CreateForm'

export default {
  components: {
    CreateForm,
  },
  data() {
    return {
      title: '8',
      snackbar: false,
      message: '',
      timeout: 5000,
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
  methods: {
    googleLogin() {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => this.getAccountData(result))
        .then((userObject) => this.setUserData(userObject))
        .catch((error) => this.onRejected(error))
    },
    getAccountData(result) {
      return new Promise((resolve, reject) => {
        const userObject = {}
        const user = result.user
        userObject.uid = user.uid
        userObject.isNewUser = result.additionalUserInfo.isNewUser
        if (userObject.isNewUser) {
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
        }
        resolve(userObject)
      })
    },
    setUserData(userObject) {
      return new Promise((resolve, reject) => {
        const user = firebase
          .firestore()
          .collection('users')
          .doc(userObject.uid)
        user.set(userObject, { merge: true }).then((result) => {
          this.message = 'ログインしました！'
          this.snackbar = true
          resolve(userObject)
        })
      })
    },
    onRejected() {
      this.message = 'ログインできませんでした。'
      this.snackbar = true
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.message = 'ログアウトしました。'
          this.snackbar = true
          this.$store.dispatch('auth/logout')
        })
    },
    formMessage(arg) {
      this.message = arg
      this.snackbar = true
    },
  },
}
</script>

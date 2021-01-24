<template>
  <v-app-bar class="my-header" flat fixed app>
    <h1 class="text-h4 font-weight-bold">
      <NuxtLink to="/" class="white--text text-decoration-none"
        >from 8</NuxtLink
      >
    </h1>
    <v-spacer />
    <v-btn icon to="/search"
      ><v-icon color="#fff" small>fas fa-search</v-icon></v-btn
    >
    <v-btn
      v-if="!isAuthenticated"
      color="#fff"
      depressed
      class="text-lowercase"
      @click="twitterLogin()"
      >Sign in</v-btn
    >
    <CreateForm :authenticated="isAuthenticated" @set-message="formMessage" />
    <v-menu v-if="isAuthenticated" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="my-header__icon ml-1" icon v-bind="attrs" v-on="on"
          ><img v-if="user" :src="user.photoURL" alt="" /><v-icon v-else large
            >far fa-user-circle</v-icon
          ></v-btn
        >
      </template>
      <v-list>
        <v-list-item v-if="user">
          <v-list-item-title>{{ user.displayName }} さん</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item href="https://forms.gle/sGa1N9Ruziub3nGu7" target="_blank">
          <v-list-item-icon class="mr-2">
            <v-icon small>far fa-envelope</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item @click="logout()">
          <v-list-item-icon class="mr-2">
            <v-icon small>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-list-item to="/leave">
          <v-list-item-title>退会</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
    twitterLogin() {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
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
          this.$router.push({ path: '/' })
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

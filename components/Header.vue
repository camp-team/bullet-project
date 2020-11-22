<template>
  <v-app-bar class="header" color="#fff" flat fixed app>
    <v-toolbar-title class="header__title" v-text="title" />
    <v-spacer />
    <v-btn v-if="!isLogin" color="primary" depressed @click="googleLogin()"
      >Sign in</v-btn
    >
    <v-menu v-if="isLogin" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on"
          ><img v-if="user" :src="user.photoURL" alt="" /><v-icon v-else large
            >mdi-account-circle-outline</v-icon
          ></v-btn
        >
      </template>
      <v-list>
        <v-list-item v-if="user">
          <v-list-item-title
            >こんにちは、{{ user.displayName }}さん</v-list-item-title
          >
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      title: '8',
      isLogin: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
  },
  created() {
    this.isLoginUser()
  },
  methods: {
    googleLogin() {
      this.$store.dispatch('auth/googleLogin')
    },
    logout() {
      this.$store.dispatch('auth/logout')
    },
    isLoginUser() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      })
      // const isAuthenticated = this.$store.getters['auth/isAuthenticated']
      // if (isAuthenticated) {
      //   this.isLogin = true
      // } else {
      //   this.isLogin = false
      // }
    },
  },
}
</script>

<template>
  <v-app-bar class="header" color="#fff" flat fixed app>
    <v-toolbar-title class="header__title" v-text="title" />
    <v-spacer />
    <v-btn
      v-if="!isAuthenticated"
      color="primary"
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
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      title: '8',
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
      this.$store.dispatch('auth/googleLogin')
    },
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

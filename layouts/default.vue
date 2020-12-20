<template>
  <v-app dark>
    <Header />
    <v-main class="main">
      <nuxt />
    </v-main>
    <v-footer color="#fff">
      <v-col class="text-center">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header,
  },
}
</script>

<template>
  <v-app dark>
    <Header />
    <v-main class="my-main">
      <nuxt />
    </v-main>
    <v-footer color="#fff">
      <v-row justify="center" align="center" class="pt-3">
        <v-btn text rounded to="/terms">利用規約</v-btn>
        <span> / </span>
        <v-btn text rounded to="/privacy">プライバシーポリシー</v-btn>
      </v-row>
      <v-col class="text-center mt-2" cols="12">
        <span>&copy; 8号車</span>
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

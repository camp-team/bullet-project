<template>
  <v-app dark>
    <Header />
    <v-main class="my-main">
      <nuxt />
    </v-main>
    <v-footer class="my-footer">
      <v-row justify="center" align="center" class="pt-3">
        <v-btn text small to="/about" class="text-lowercase"
          >from 8号車とは？</v-btn
        >
        <v-btn text small to="/terms">利用規約</v-btn>
        <v-btn text small to="/privacy">プライバシーポリシー</v-btn>
        <v-btn
          text
          small
          href="https://forms.gle/sGa1N9Ruziub3nGu7"
          target="_blank"
          >Contact</v-btn
        >
      </v-row>
      <v-col class="text-center mt-2" cols="12">
        <span>&copy; one of 8号車</span>
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

<style lang="scss" scoped>
.my-footer {
  background-color: #fff;
  border-top: 1px solid #f4f4f4;
}
</style>

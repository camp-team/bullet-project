<template>
  <div class="page-body text-center">
    <h1 v-if="error.statusCode === 404" class="page-title">
      {{ pageNotFound }}
    </h1>
    <h1 v-else class="page-title">
      {{ otherError }}
    </h1>
    <p v-if="error.statusCode === 404" class="page-description">
      URLが間違っている、もしくは削除された可能性があります。
    </p>
    <v-btn to="/" depressed color="primary">TOP PAGE</v-btn>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'お探しのページが見つかりません',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
.page-body {
  padding: 40px 0;
}

.page-title {
  margin: 0 0 25px;
  font-size: 20px;
  text-align: center;
}

.page-description {
  margin: 0 0 25px;
}
</style>

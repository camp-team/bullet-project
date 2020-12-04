<template>
  <div>
    <SearchForm />
    <h1 class="text-h4 mb-2 text-center">ALL</h1>
    <CardList />
  </div>
</template>

<script>
import CardList from '~/components/CardList.vue'
import SearchForm from '~/components/SearchForm.vue'

export default {
  components: {
    CardList,
    SearchForm,
  },
}
</script>

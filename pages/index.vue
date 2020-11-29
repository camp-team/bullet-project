<template>
  <div>
    <SearchForm />
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

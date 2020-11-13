<template>
  <div>
    <SearchForm />
    <CardList />
    <CreateForm />
  </div>
</template>

<script>
import CardList from '~/components/CardList.vue'
import CreateForm from '~/components/CreateForm.vue'
import SearchForm from '~/components/SearchForm.vue'

export default {
  components: {
    CardList,
    CreateForm,
    SearchForm,
  },
}
</script>

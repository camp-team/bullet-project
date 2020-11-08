<template>
  <div>
    <CardList />
    <CreateForm />
  </div>
</template>

<script>
import CardList from '~/components/CardList.vue'
import CreateForm from '~/components/CreateForm.vue'

export default {
  components: {
    CardList,
    CreateForm,
  },
}
</script>

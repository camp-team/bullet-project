<template>
  <v-row>
    <v-col v-for="n in 5" :key="n" cols="12" sm="4">
      <Card />
    </v-col>
  </v-row>
</template>

<script>
import Card from '~/components/Card.vue'

export default {
  components: {
    Card,
  },
}
</script>

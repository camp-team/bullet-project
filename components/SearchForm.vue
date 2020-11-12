<template>
  <div>
    <form>
      <v-row :justify="justify">
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.trim="filterQuery.keyword"
            outlined
            label="search keyword"
            hide-details="auto"
            clearable
            @change="setFilter"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="filterQuery.color"
            outlined
            :items="colors"
            label="select color"
            hide-details="auto"
            clearable
            @change="setFilter"
          ></v-select>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterQuery: {
        keyword: '',
        color: '',
      },
      justify: 'end',
    }
  },
  computed: {
    colors() {
      return this.$store.state.post.colors
    },
  },
  mounted() {
    this.$store.dispatch('post/setFilter', this.filterQuery)
  },
  methods: {
    setFilter() {
      this.$store.dispatch('post/setFilter', this.filterQuery)
    },
  },
}
</script>

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
            @click:clear="$nextTick(() => (filterQuery.color = ''))"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn
            class="white--text"
            color="#ff4081"
            depressed
            block
            @click="search()"
            >search</v-btn
          >
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
  methods: {
    search() {
      this.$store.dispatch('post/search', this.filterQuery)
    },
  },
}
</script>

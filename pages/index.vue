<template>
  <div>
    <v-row class="grid">
      <v-col v-for="post in posts" :key="post.id" cols="12" sm="4">
        <Card :post="post" />
      </v-col>
    </v-row>
    <CreateForm @add="addPost" />
  </div>
</template>

<script>
import Card from '~/components/Card.vue'
import CreateForm from '~/components/CreateForm.vue'

export default {
  components: {
    Card,
    CreateForm,
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    addPost(content, name, color) {
      const newPost = {}
      newPost.content = content
      newPost.name = name
      newPost.color = color
      this.posts.push(newPost)
    },
  },
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn--create" color="#000" fab v-bind="attrs" v-on="on">
        <v-icon color="#fff">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="content"
                  outlined
                  counter
                  label="content"
                  :rules="rules"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  outlined
                  :counter="15"
                  label="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="color"
                  outlined
                  :items="colors"
                  label="color"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed @click="dialog = false">CLOSE</v-btn>
        <v-btn depressed color="primary" @click="submit">投稿を作成</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      content: '',
      rules: [(v) => v.length <= 140 || 'Max 140 characters'],
      name: '',
      color: 'BLACK',
      colors: ['BLACK', 'BLUE', 'PURPLE', 'GREEN', 'RED', 'YELLOW', 'WHITE'],
    }
  },
  methods: {
    submit() {
      this.$emit('add', this.content, this.name, this.color)
      this.content = ''
      this.name = ''
      this.color = 'BLACK'
      this.dialog = false
    },
  },
}
</script>

<style></style>

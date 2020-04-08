<template>
  <v-navigation-drawer
    @input="close($event)"
    v-model="open"
    app
    temporary>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data () {
    return {
      open: false,
      items: [
        { title: 'Новый риэлтор', icon: 'mdi-account-multiple-plus' },
        { title: 'Список риэлторов', icon: 'mdi-format-list-bulleted-square' }
      ]
    }
  },
  computed: {},
  methods: {
    close (event) {
      if (!event) this.$emit('close', true)
    }
  },
  watch: {
    drawer (newData) {
      this.open = newData
    }
  }
}
</script>

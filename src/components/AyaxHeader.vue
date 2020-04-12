<template>
  <v-app-bar
    app
    dark
    shrink-on-scroll
    prominent
    src="https://picsum.photos/1920/1080?random"
    color="blue"
    fade-img-on-scroll
    scroll-threshold="300">
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)">
      </v-img>
    </template>
    <v-app-bar-nav-icon class="d-sm-none" @click="drawer"></v-app-bar-nav-icon>
    <search @value="search($event)"></search>
    <v-spacer class="d-none d-md-block"></v-spacer>
    <v-btn
      v-for="(item, index) in links"
      :key="index"
      class="ma-2 d-none d-sm-flex"
      outlined
      :to="item.path"
      tag="router-link">
      {{ item.name }}
    </v-btn>
  </v-app-bar>
</template>

<script>
import Search from '@/components/Search'
export default {
  components: {
    Search
  },
  data () {
    return {
      links: [
        {
          path: '/create',
          name: 'Новый риэлтор'
        },
        {
          path: '/',
          name: 'Список риэлторов'
        }
      ]
    }
  },
  methods: {
    drawer () {
      this.$emit('drawer', true)
    },
    search (event) {
      if (!event) this.$router.push('/')
      else this.$router.push(`/${event}`)
    }
  }
}
</script>

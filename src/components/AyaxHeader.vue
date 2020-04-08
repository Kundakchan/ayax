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
    <v-text-field
      class="mt-1"
      dense
      filled
      rounded
      placeholder="Поиск">
      <v-icon slot="append">mdi-magnify</v-icon>
    </v-text-field>
    <v-spacer class="d-none d-md-block"></v-spacer>
    <v-btn class="ma-2 d-none d-sm-block" outlined>Новый риэлтор</v-btn>
    <v-btn class="ma-2 d-none d-sm-block" outlined>Список риэлторов</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    drawer () {
      this.$emit('drawer', true)
    }
  }
}
</script>

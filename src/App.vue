<template>
 <v-app>
  <ayax-header @drawer="open"/>
  <left-drawer :drawer="drawer" @close="open"/>
  <v-content>
    <v-container fluid>
      <router-view/>
    </v-container>
  </v-content>
 </v-app>
</template>

<script>
import AyaxHeader from '@/components/AyaxHeader'
import LeftDrawer from '@/components/LeftDrawer'
export default {
  name: 'App',
  components: {
    'ayax-header': AyaxHeader,
    'left-drawer': LeftDrawer
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    open () {
      this.drawer = !this.drawer
    }
  }
}
</script>

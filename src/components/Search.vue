<template>
  <v-text-field
    @keydown.enter="search"
    v-model="value"
    class="mt-1"
    filled
    rounded
    dense
    placeholder="Поиск">
    <v-btn
      @click="search"
      small
      icon
      slot="append">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-text-field>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    search () {
      this.$emit('value', this.value)
    }
  }
}
</script>

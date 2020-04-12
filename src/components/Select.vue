<template>
<v-menu offset-y>
  <template v-slot:activator="{ on }">
    <v-text-field
      :error-messages="error"
      @change="test"
      v-model="value"
      placeholder="Выберите подразделения"
      v-on="on">
    </v-text-field>
  </template>
  <v-list>
    <v-list-item
      v-for="(item, index) in list"
      :key="index.id"
      @click="add(index)">
      <v-list-item-title>{{ item.value }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</template>

<script>
export default {
  props: {
    items: Array,
    item: Object,
    error: Array
  },
  data () {
    return {
      value: this.item.value
    }
  },
  computed: {
    list () {
      return this.items.filter(item => item.value.toLowerCase().includes(this.value.toLowerCase()))
    }
  },
  methods: {
    add (index) {
      this.value = this.items[index].value
      this.$emit('value', this.items[index])
    },
    test () {
      const res = this.items.find(item => item.value.toLowerCase() === this.value.toLowerCase())
      if (res) this.$emit('value', res)
      else {
        this.value = ''
        this.$emit('value', {})
      }
    }
  }
}
</script>

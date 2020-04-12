<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
        :error-messages="error"
        v-model="date"
        prepend-icon="mdi-calendar"
        placeholder="Укажите дату"
        readonly
        v-on="on">
        <v-btn
          v-if="date"
          @click="pickerClear"
          icon
          x-small
          slot="append">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      scrollable>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="pickerClose">Отмена</v-btn>
      <v-btn color="primary" @click="pickerSave">ОК</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'Picker',
  props: {
    input: String,
    error: Array
  },
  data () {
    return {
      menu: false,
      date: this.input.substr(0, 10)
    }
  },
  methods: {
    pickerClose () {
      this.menu = false
    },
    pickerSave () {
      this.$refs.menu.save(this.date)
      this.$emit('value', this.date)
    },
    pickerClear () {
      this.date = null
      this.$emit('value', this.date)
    }
  }
}
</script>

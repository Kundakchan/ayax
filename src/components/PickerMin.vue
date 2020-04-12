<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="dates"
    transition="scale-transition"
    offset-y
    min-width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dates"
        prepend-icon="mdi-calendar"
        placeholder="Укажите дату"
        readonly
        dense
        filled
        rounded
        v-on="on">
        <v-btn
          v-if="dates.length"
          @click="pickerClear"
          icon
          x-small
          slot="append">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-text-field>
    </template>
    <v-date-picker
      no-title
      range
      v-model="dates"
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
    input: String
  },
  data () {
    return {
      menu: false,
      dates: []
    }
  },
  methods: {
    pickerClose () {
      this.menu = false
    },
    pickerSave () {
      this.$refs.menu.save(this.dates)
      this.$emit('value', this.dates)
    },
    pickerClear () {
      this.dates = []
      this.$emit('value', this.dates)
    }
  }
}
</script>

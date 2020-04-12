<template>
  <v-dialog
    v-model="dialog"
    width="600">
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title>
        Вы уверены что хотите удалить данную запись на всегда ?
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="cancel">
          Нет
        </v-btn>
        <v-btn
          color="error"
          @click="confirm">
          Да
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  data () {
    return {}
  },
  methods: {
    confirm () {
      this.$emit('confirm', true)
    },
    cancel () {
      this.$emit('cancel', true)
    }
  }
}
</script>

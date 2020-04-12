<template>
  <v-row class="mt-md-12">
    <v-spacer></v-spacer>
    <v-col cols="12" :md="6">
      <v-card class="pa-6" outlined>
        <form>
          <v-text-field
            :error-messages="last_name_error"
            v-model="last_name"
            label="Фамилия">
          </v-text-field>
          <v-text-field
            :error-messages="first_name_error"
            v-model="first_name"
            label="Имя">
          </v-text-field>
          <app-select :error="directions_error" :items="getDirections" :item="getItemDirections(directions)" @value="selectValue($event)"></app-select>
          <date-picker
            :error="create_error"
            :input="create"
            @value="dateUpdate($event)">
          </date-picker>
          <v-btn class="mr-4 mt-5" outlined @click="save">Сохронить</v-btn>
          <v-btn class="mt-5" outlined @click="dialogOpen">Удалить</v-btn>
          <dialog-modal :dialog="dialog" @cancel="dialogOpen" @confirm="remove"></dialog-modal>
        </form>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import DialogModal from '@/components/DialogModal'
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import datePicker from '@/components/Picker'
import Select from '@/components/Select'
export default {
  name: 'Edit',
  props: {
    id: String
  },
  components: {
    'dialog-modal': DialogModal,
    'date-picker': datePicker,
    'app-select': Select
  },
  data () {
    return {
      last_name: '',
      first_name: '',
      directions: null,
      create: null,
      menu: false,
      dialog: false
    }
  },
  validations: {
    last_name: {
      required
    },
    first_name: {
      required
    },
    directions: {
      required
    },
    create: {
      required
    }
  },
  computed: {
    ...mapGetters([
      'getItemUsers',
      'getDirections',
      'getItemDirections'
    ]),
    last_name_error () {
      const error = []
      if (!this.$v.last_name.$dirty) return error
      else if (!this.$v.last_name.required) error.push('Данное поля обязательно к заполнению !')
      return error
    },
    first_name_error () {
      const error = []
      if (!this.$v.first_name.$dirty) return error
      else if (!this.$v.first_name.required) error.push('Данное поля обязательно к заполнению !')
      return error
    },
    directions_error () {
      const error = []
      if (!this.$v.directions.$dirty) return error
      else if (!this.$v.directions.required) error.push('Данное поля обязательно к заполнению !')
      return error
    },
    create_error () {
      const error = []
      if (!this.$v.create.$dirty) return error
      else if (!this.$v.create.required) error.push('Данное поля обязательно к заполнению !')
      return error
    }
  },
  methods: {
    ...mapActions([
      'REMOVE_USER',
      'UPDATE_USER'
    ]),
    init () {
      const user = JSON.parse(JSON.stringify(this.getItemUsers(this.id)))
      this.last_name = user.last_name
      this.first_name = user.first_name
      this.directions = user.directions
      this.create = user.create.substr(0, 10)
    },
    save () {
      if (!this.$v.$invalid) {
        const user = {
          last_name: this.last_name,
          first_name: this.first_name,
          directions: this.directions,
          create: this.create
        }
        this.UPDATE_USER({ id: this.id, data: user })
      } else this.$v.$touch()
    },
    dialogOpen () {
      this.dialog = !this.dialog
    },
    remove () {
      this.dialogOpen()
      this.REMOVE_USER(this.id)
      this.$router.push('/')
    },
    dateUpdate (event) {
      this.create = event
    },
    selectValue (event) {
      if (event) this.directions = event.id
      else this.directions = null
    }
  },
  created () {
    this.init()
  }
}
</script>

<template>
<v-row class="mt-md-12">
  <v-spacer></v-spacer>
  <v-col cols="12" :md="6">
    <v-card class="ma-3 pa-6" outlined>
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
        <v-select
          :error-messages="directions_error"
          v-model="directions"
          :items="getDirections"
          item-text="value"
          item-value="id"
          label="Подразделение">
        </v-select>
        <v-btn class="mr-4 mt-5" outlined @click="save">Сохронить</v-btn>
        <v-btn class="mt-5" outlined @click="clear">Очичтить</v-btn>
      </form>
    </v-card>
  </v-col>
  <v-spacer></v-spacer>
</v-row>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Create',
  data () {
    return {
      last_name: '',
      first_name: '',
      directions: null
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
    }
  },
  computed: {
    ...mapGetters([
      'getDirections'
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
    }
  },
  methods: {
    ...mapActions([
      'ADD_USER'
    ]),
    save () {
      if (!this.$v.$invalid) {
        const user = {
          last_name: this.last_name,
          first_name: this.first_name,
          directions: this.directions,
          create: new Date().toISOString()
        }
        this.ADD_USER(user)
        this.clear()
      } else this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.last_name = ''
      this.first_name = ''
      this.directions = null
    }
  }
}
</script>

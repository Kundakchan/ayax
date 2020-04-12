<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" :md="6">
          <v-row>
            <v-col>
              <v-text-field
                v-model="filter_last_name"
                placeholder="Фамилия"
                filled
                rounded
                dense>
              </v-text-field>
            </v-col>
            <v-col>
              <picker-min @value="dateUpdate($event)"></picker-min>
            </v-col>
            <v-col cols="2">
              <v-select
                placeholder="Количество"
                rounded
                dense
                filled
                v-model="filter_count"
                :items="pageList">
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" :md="6">
          <v-list two-line>
            <v-list-item-group>
              <template v-for="(item, index) in userList">
                <v-list-item :key="item.id" @dblclick="edit(item.id)">
                  <template v-slot:default="{ }">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.last_name + ' ' + item.first_name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ 'Зарегистрирован: ' + date(item.create) }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>
                        <v-chip color="primary">{{ directions(item.directions).value }}</v-chip>
                      </v-list-item-action-text>
                    </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index + 1 < getUsers.length"
                  :key="index">
                </v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" :md="6">
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="pageCount">
            </v-pagination>
          </div>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import PickerMin from '@/components/PickerMin'
export default {
  name: 'Home',
  props: {
    search: String
  },
  components: {
    'picker-min': PickerMin
  },
  data () {
    return {
      menu: false,
      picker: [],
      filter_last_name: null,
      filter_count: 10,
      pageList: [5, 10, 20],
      page: 1,
      users: null
    }
  },
  computed: {
    ...mapGetters([
      'getUsers',
      'getItemDirections'
    ]),
    filter_name () {
      if (this.filter_last_name) {
        return this.users.filter(item => {
          return item.last_name.toLowerCase().includes(this.filter_last_name.toLowerCase())
        })
      } else return this.users
    },
    filter_picker () {
      if (this.picker.length) {
        return this.filter_name.filter(item => {
          return Date.parse(item.create) >= Date.parse(this.picker[0]) && Date.parse(item.create) <= Date.parse(this.picker[1])
        })
      } else {
        return this.filter_name
      }
    },
    pageCount () {
      const page = Math.round(this.filter_picker.length / this.filter_count)
      if (page) return page
      else return 1
    },
    userList () {
      const list = []
      for (let i = 0; i < this.pageCount; i++) {
        list.push(this.filter_picker.slice((this.filter_count * i), (this.filter_count * (i + 1))))
      }
      return list[this.page - 1]
    }
  },
  methods: {
    dateUpdate (event) {
      this.picker = event
    },
    filler (value) {
      if (Number(value) < 10) return `0${value}`
      else return String(value)
    },
    date (value) {
      const dateTime = new Date(value)
      return `${this.filler(dateTime.getDate())}.${this.filler(dateTime.getMonth() + 1)}.${dateTime.getFullYear()} ${this.filler(dateTime.getHours())}:${this.filler(dateTime.getMinutes())}:${this.filler(dateTime.getSeconds())}`
    },
    directions (id) {
      return this.getItemDirections(id)
    },
    pickerClear () {
      this.picker = []
    },
    edit (id) {
      this.$router.push(`/edit/${id}`)
    },
    global_filter (value) {
      return this.getUsers.filter(item => {
        if (item.last_name.toLowerCase().includes(value.toLowerCase())) return true
        else if (item.first_name.toLowerCase().includes(value.toLowerCase())) return true
        else if (this.getItemDirections(item.directions).value.toLowerCase().includes(value.toLowerCase())) return true
        else return false
      })
    }
  },
  watch: {
    search (newDate) {
      if (this.search) this.users = this.global_filter(this.search)
      else this.users = this.getUsers
    }
  },
  created () {
    if (this.search) this.users = this.global_filter(this.search)
    else this.users = this.getUsers
  }
}
</script>

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/vuelidate'

import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from './config/firebase'
Vue.use(firebase)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  firebase,
  beforeCreate () {
    firebase.initializeApp(firebaseConfig)
    store.dispatch('INIT')
  },
  render: h => h(App)
}).$mount('#app')

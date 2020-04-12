import firebase from 'firebase/app'
export default {
  async INIT ({ commit }) {
    try {
      await firebase.database().ref('/directions').on('child_added', (data) => {
        commit('setDirections', { id: data.key, value: data.val() })
      })
      await firebase.database().ref('/users').on('child_added', (data) => {
        commit('setUsers', { id: data.key, ...data.val() })
      })
    } catch (error) {
      console.error(error.message)
      throw error
    }
  },
  async ADD_USER ({ commit }, payload) {
    try {
      await firebase.database().ref('users/').push(payload)
    } catch (error) {
      console.error(error.message)
      throw error
    }
  },
  async REMOVE_USER ({ dispatch }, payload) {
    try {
      await firebase.database().ref('users/').child(payload).remove()
      await dispatch('LOCAL_REMOVE_USER', payload)
    } catch (error) {
      console.error(error.message)
      throw error
    }
  },
  async UPDATE_USER ({ dispatch }, payload) {
    try {
      await firebase.database().ref('users/').child(payload.id).set(payload.data)
      dispatch('LOCAL_UPDATE_USER', payload)
    } catch (error) {
      console.error(error.message)
      throw error
    }
  },
  async LOCAL_REMOVE_USER ({ commit, getters }, payload) {
    try {
      commit('localRevomeUser', getters.getIndexUser(payload))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  async LOCAL_UPDATE_USER ({ commit, getters }, payload) {
    try {
      commit('localUpdateUser', {
        index: getters.getIndexUser(payload.id),
        data: {
          id: payload.id,
          ...payload.data
        }
      })
    } catch (error) {
      console.error(error.message)
      throw error
    }
  }
}

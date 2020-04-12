export default {
  setUsers (state, payload) {
    state.users.push(payload)
  },
  setDirections (state, payload) {
    state.directions.push(payload)
  },
  localRevomeUser (state, payload) {
    state.users.splice(payload, 1)
  },
  localUpdateUser (state, payload) {
    for (const item in state.users[payload.index]) {
      state.users[payload.index][item] = payload.data[item]
    }
  }
}

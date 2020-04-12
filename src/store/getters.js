export default {
  getUsers: state => state.users,
  getDirections: state => state.directions,
  getItemDirections: state => id => {
    return state.directions.find(item => String(item.id) === String(id))
  },
  getItemUsers: state => id => {
    return state.users.find(item => item.id === id)
  },
  getIndexUser: state => id => {
    return state.users.findIndex(item => item.id === id)
  }
}

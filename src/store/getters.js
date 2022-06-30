const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  photo: state => state.user.photo,
  username: state => state.user.username,
  first_name: state => state.user.first_name,
  last_name: state => state.user.last_name,
  email: state => state.user.email,
  // user_type: state => state.user.user_type
  userId: state => state.user.userId
}
export default getters

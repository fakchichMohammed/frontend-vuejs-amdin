const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  photo: state => state.user.photo,
  username: state => state.user.username
}
export default getters

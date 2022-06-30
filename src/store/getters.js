const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  photo: state => state.user.photo,
  username: state => state.user.username,
<<<<<<< HEAD
  first_name: state => state.user.first_name,
  last_name: state => state.user.last_name,
  email: state => state.user.email
=======
  userId: state => state.user.userId
>>>>>>> 934ce9e279b12fa5db78846fb8e6a53ee2a515af
}
export default getters

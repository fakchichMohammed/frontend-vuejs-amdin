import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken, getUserPhoto, setUsername, setUserPhoto, getUsername, setFirstname, getFirstname, setLastName, getLastName, setEmail, getEmail } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    username: getUsername(),
    photo: getUserPhoto(),
    first_name: getFirstname(),
    last_name: getLastName(),
    email: getEmail()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_FIRST_NAME: (state, first_name) => {
    state.first_name = first_name
  },
  SET_LAST_NAME: (state, last_name) => {
    state.last_name = last_name
  },
  SET_FIRST_NAME: (state, email) => {
    state.email = email
  },
  SET_AVATAR: (state, photo) => {
    state.photo = photo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, first_name, last_name, email } = userInfo
    console.log('user store: ', userInfo)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, client_id: '220243', client_secret: '67430d35f10a79df0e5171f10ad75863b957d8183091d3cfdc978d09' }).then(response => {
        console.log('inside login then')
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { username, photo, first_name, last_name, email} = data
        console.log(data)

        // save user token in local storage
        commit('SET_TOKEN', data.tokens.id_token)
        setToken(data.tokens.id_token, data.tokens.expires_in)

        // save user name in cookies
        commit('SET_NAME', username)
        setUsername(username)
        // save user first name
        commit('SET_FIRST_NAME', first_name)
        setFirstname(first_name)
        console.log(first_name, data)
        // save user last name
        commit('SET_LAST_NAME', last_name)
        setLastName(last_name)
        console.log(last_name, data)
        // save user email
        commit('SET_EMAIL', email)
        setEmail(email)
        console.log(email, data)
        // save user photo in cookies
        commit('SET_AVATAR', photo)
        setUserPhoto(photo)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // register user
  register({ commit }, userInfo) {
    const { firstname, lastname, username, email, password } = userInfo
    console.log('user store: ', userInfo)
    return new Promise((resolve, reject) => {
      register({ first_name: firstname.trim(), last_name: lastname.trim(), username: username.trim(), email: email.trim(), password: password.trim() }).then(response => {
        console.log('inside register then')
        const { data } = response

        if (!data) {
          return reject('Verification failed, please try again.')
        }

        // const { username, firstname } = data
        console.log(data)
        /* commit('SET_TOKEN', data.tokens.id_token)
        setToken(data.tokens.id_token, data.tokens.expires_in)
        commit('SET_NAME', username)
        commit('SET_AVATAR', photo)
        resolve() */
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  /* getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { username, photo } = data

        commit('SET_NAME', username)
        commit('SET_AVATAR', photo)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }, */

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


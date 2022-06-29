import Cookies from 'js-cookie'

const TokenKey = 'id_token'
const ExpireIn = 'expires_in'
const UserName = 'user_name'
const UserPhoto = 'user_photo'

export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token, expiresIn) {
  window.localStorage.setItem(TokenKey, token)
  window.localStorage.setItem(ExpireIn, expiresIn)
  return
}

export function removeToken() {
  window.localStorage.removeItem(TokenKey)
  window.localStorage.removeItem(ExpireIn)
  return
}

export function setUsername(userName) {
  return Cookies.set(UserName, userName)
}

export function getUsername() {
  return Cookies.get(UserName)
}

export function setUserPhoto(userPhoto) {
  return Cookies.set(UserPhoto, userPhoto)
}

export function getUserPhoto() {
  return Cookies.get(UserPhoto)
}

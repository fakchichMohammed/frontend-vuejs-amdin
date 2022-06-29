
const TokenKey = 'id_token'
const ExpireIn = 'expires_in'

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

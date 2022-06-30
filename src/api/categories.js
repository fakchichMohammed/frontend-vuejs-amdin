import request from '@/utils/request'
import { slugify } from '@/utils/slugfiy'

// fetch list category
export function getList(params) {
  return request({
    url: 'http://178.33.234.128:8022/api/category/',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// create category
export function create(params) {
  return request({
    url: 'http://178.33.234.128:8022/api/category/',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// handle add category
export function add(categoryInfo) {
  const { title, description } = categoryInfo
  const slug = slugify(title)
  return new Promise((resolve, reject) => {
    create({ title: title.trim(), slug: slug, description: description.trim() }).then(response => {
      console.log('inside category then')
      const { data } = response

      if (!data) {
        return reject('Creation failed, please try again.')
      }

      // const { username, firstname } = data
      console.log(data)
      /* commit('SET_TOKEN', data.tokens.id_token)
      setToken(data.tokens.id_token, data.tokens.expires_in)
      commit('SET_NAME', username)
      commit('SET_AVATAR', photo) */
      // resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

// remove category
export function remove(params) {
  return request({
    url: 'http://178.33.234.128:8022/api/category/',
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// handle delete category
export function deleteCategory(categoryInfo) {
  const { title, description } = categoryInfo
  return new Promise((resolve, reject) => {
    remove({ title: title.trim(), description: description.trim() }).then(response => {
      console.log('inside category then')
      const { data } = response

      if (!data) {
        return reject('Delete failed, please try again.')
      }

      // const { username, firstname } = data
      console.log(data)
      /* commit('SET_TOKEN', data.tokens.id_token)
      setToken(data.tokens.id_token, data.tokens.expires_in)
      commit('SET_NAME', username)
      commit('SET_AVATAR', photo) */
      // resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

// edit category
export function update(params) {
  return request({
    url: 'http://178.33.234.128:8022/api/category/',
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// handle edit category
export function edit(categoryInfo) {
  const { title, description } = categoryInfo
  return new Promise((resolve, reject) => {
    update({ title: title.trim(), description: description.trim() }).then(response => {
      console.log('inside category then')
      const { data } = response

      if (!data) {
        return reject('Edit failed, please try again.')
      }

      // const { username, firstname } = data
      console.log(data)
      /* commit('SET_TOKEN', data.tokens.id_token)
      setToken(data.tokens.id_token, data.tokens.expires_in)
      commit('SET_NAME', username)
      commit('SET_AVATAR', photo) */
      // resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

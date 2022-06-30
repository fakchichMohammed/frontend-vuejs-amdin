import request from '@/utils/request'
import { slugify } from '@/utils/slugfiy'

const apiUrl = 'http://178.33.234.128:8022/api/category/'

// fetch list category
export function getList(params) {
  return request({
    url: apiUrl,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// create category
export function create(data) {
  return request({
    url: apiUrl,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// handle add category
export function add(categoryInfo) {
  const { title, description } = categoryInfo
  const slug = slugify(title)
  return new Promise((resolve, reject) => {
    create({ title: title.trim(), slug: slug, description: description.trim() })
      .then((response) => {
        const { data } = response

        if (!data) {
          return reject('Creation failed, please try again.')
        }
        // const { username, firstname } = data
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// remove category
export function remove(params) {
  return request({
    url: apiUrl,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// handle delete category
export function deleteCategory(categoryInfo) {
  const { title, description } = categoryInfo
  return new Promise((resolve, reject) => {
    remove({ title: title.trim(), description: description.trim() })
      .then((response) => {
        const { data } = response

        if (!data) {
          return reject('Delete failed, please try again.')
        }

        // const { username, firstname } = data
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// edit category
export function update(data, category_slug) {
  return request({
    url: apiUrl + category_slug,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data,
  })
}

// handle edit category
export function edit(categoryInfo, categorySlug) {
  const { title, description } = categoryInfo
  const slug = slugify(title)
  return new Promise((resolve, reject) => {
    update({ title: title.trim(), slug: slug, description: description.trim() }, categorySlug)
      .then((response) => {
        const { data } = response

        if (!data) {
          return reject('Edit failed, please try again.')
        }

        // const { username, firstname } = data
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

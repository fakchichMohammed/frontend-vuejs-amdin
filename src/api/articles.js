import request from '@/utils/request'
import { slugify } from '@/utils/slugfiy'

const apiUrl = 'http://178.33.234.128:8022/api/articles/'

// fetch list articles
export function getList(params) {
  return request({
    url: apiUrl,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// create article
export function create(data) {
  return request({
    url: apiUrl,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// handle add article
export function add(articleInfo) {
  const { title, description } = articleInfo
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

// remove article
export function remove(params) {
  return request({
    url: apiUrl,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// handle delete article
export function deleteArticle(articleInfo) {
  const { title, description } = articleInfo
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

// edit article
export function update(data, article_slug) {
  return request({
    url: apiUrl + article_slug,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// handle edit article
export function edit(articleInfo, articleSlug) {
  const { title, description } = articleInfo
  const slug = slugify(title)
  return new Promise((resolve, reject) => {
    update({ title: title.trim(), slug: slug, description: description.trim() }, articleSlug)
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

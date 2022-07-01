import request from '@/utils/request'
import { slugify } from '@/utils/slugfiy'
import store from '@/store/index'

const apiUrl = 'http://178.33.234.128:8022/api/articles/'

// fetch list articles
export function getArticlesList() {
  return request({
    url: apiUrl,
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
}
export function getMyArticles() {
  return request({
    url: apiUrl,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    params: {
      user_id: store.state.user.userId
    }
  })
}
export function createArticle(data) {
  return request({
    url: apiUrl,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// remove article
export function deleteArticle(slug) {
  return request({
    url: apiUrl + slug,
    method: 'delete',
    headers: { 'Content-Type': 'application/json' }
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

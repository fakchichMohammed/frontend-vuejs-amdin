import request from '@/utils/request'
import store from '@/store/index'

const apiUrl = 'http://178.33.234.128:8022/api/articles/'

export function getAllArticles() {
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

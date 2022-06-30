import request from '@/utils/request'
import store from '@/store/index'

export function getAllArticles() {
  return request({
    url: 'http://178.33.234.128:8022/api/articles/',
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
}
export function getMyArticles() {
  return request({
    url: 'http://178.33.234.128:8022/api/articles/',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    params: {
      user_id: store.state.user.userId
    }
  })
}

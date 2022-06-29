import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://178.33.234.128:8022/api/login/',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

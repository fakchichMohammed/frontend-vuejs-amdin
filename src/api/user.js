import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/blogger-admin-dashboard/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/blogger-admin-dashboard/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/blogger-admin-dashboard/user/logout',
    method: 'post'
  })
}

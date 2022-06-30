import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://178.33.234.128:8022/api/login/',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
/*
export function getInfo(token) {
  return request({
    url: 'http://178.33.234.128:8022/api/login/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}*/

export function register(data) {
  return request({
    url: 'http://178.33.234.128:8022/api/register/',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// export function edit(id,data) {
//   return request({
//     url: 'http://178.33.234.128:8022/api/users/'+id,
//     method: 'put',
//     headers: { 'Content-Type': 'application/json' },
//     data
//   })
// }

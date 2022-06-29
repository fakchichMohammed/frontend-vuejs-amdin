import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://178.33.234.128:8022/api/category/',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

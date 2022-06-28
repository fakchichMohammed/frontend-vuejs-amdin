import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/categories',
    method: 'get',
    params
  })
}

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/blogger-admin-dashboard/articles/list',
    method: 'get',
    params
  })
}

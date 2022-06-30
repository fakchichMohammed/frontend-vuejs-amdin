import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/demands',
    method: 'get',
    params
  })
}

// get list of reviewed demands
export function getReviewedList(params) {
  return request({
    url: '/api/demands/reviewed',
    method: 'get',
    params
  })
}

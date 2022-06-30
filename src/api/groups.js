import request from '@/utils/request'
import { slugify } from '@/utils/slugfiy'

const apiUrl = 'http://178.33.234.128:8022/api/groups/'

// fetch list group
export function getList(params) {
  return request({
    url: apiUrl,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// create group
export function create(data) {
  return request({
    url: apiUrl,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// handle add group
export function add(groupInfo) {
  const { title, description } = groupInfo
  const slug = slugify(title)
  return new Promise((resolve, reject) => {
    create({ title: title.trim(), slug: slug, description: description.trim() })
      .then((response) => {
        const { data } = response

        if (!data) {
          return reject('Creation failed, please try again.')
        }
        // const { username, firstname } = data
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// remove group
export function remove(params) {
  return request({
    url: apiUrl,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// handle delete group
export function deleteGroup(groupInfo) {
  const { title, description } = groupInfo
  return new Promise((resolve, reject) => {
    remove({ title: title.trim(), description: description.trim() })
      .then((response) => {
        const { data } = response

        if (!data) {
          return reject('Delete failed, please try again.')
        }

        // const { username, firstname } = data
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// edit group
export function update(data, group_slug) {
  return request({
    url: apiUrl + group_slug,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

// handle edit group
export function edit(groupInfo, groupSlug) {
  const { title, description } = groupInfo
  const slug = slugify(title)
  return new Promise((resolve, reject) => {
    update({ title: title.trim(), slug: slug, description: description.trim() }, groupSlug)
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

import request from '@/utils/request'

// fetch list category
export function getList(params) {
  return request({
    url: 'http://178.33.234.128:8022/api/category/',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// create category
export function create(params) {
  return request({
    url: 'http://178.33.234.128:8022/api/category/',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

// handle add category
export function add(categoryInfo) {
  const { title, description } = categoryInfo
  return new Promise((resolve, reject) => {
    create({ title: title.trim(), description: description.trim() }).then(response => {
      console.log('inside category then')
      const { data } = response

      if (!data) {
        return reject('Verification failed, please try again.')
      }

      // const { username, firstname } = data
      console.log(data)
      /* commit('SET_TOKEN', data.tokens.id_token)
      setToken(data.tokens.id_token, data.tokens.expires_in)
      commit('SET_NAME', username)
      commit('SET_AVATAR', photo) */
      // resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

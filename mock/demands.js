const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    message: '@sentence(100, 1000)',
    'status|1': ['published', 'draft', 'deleted'],
    author: '@name',
    received_at: '@datetime'
  }]
})

module.exports = [
  {
    url: '/api/demands',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    owner: 'name',
    created_at: '@datetime',
    articles: '@integer(1, 5000)',
    description: 'test description'
  }]
})

module.exports = [
  {
    url: '/api/groups',
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

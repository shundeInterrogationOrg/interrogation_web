const Mock = require('mockjs')

module.exports = [
  {
    desc: '获取案件',
    url: '/caseClassification/queryPage',
    type: 'get',
    response: (req, res) => {
      const result = Mock.mock({
        'code': 200,
        'total': 20,
        'rows|3-10': [
          {
            'update_time': '2020-01-08 19:24:18',
            'update_user': 'account_a',
            'name': '案件类型名称_8aaa',
            'id': '@integer(300, 5000)',
            'status｜+1': ['0', '1']
          }
        ]

      })
      // let result = Mock.mock({
      //   'code': 500,
      //   'desc': '我报了500的错误'
      // })
      res.send(result)
    }
  },
  {
    desc: '新增案件',
    url: '/caseClassification/add',
    type: 'get',
    response: (req, res) => {
      const result = Mock.mock({
        'code': 200,
        'status': 'success'
      })
      // let result = Mock.mock({
      //   'code': 500,
      //   'desc': '我报了500的错误'
      // })
      res.send(result)
    }
  },
  {
    desc: '删除案件',
    url: '/caseClassification/delete',
    type: 'get',
    response: (req, res) => {
      const result = Mock.mock({
        'code': 200,
        'status': 'success'
      })
      // let result = Mock.mock({
      //   'code': 500,
      //   'desc': '我报了500的错误'
      // })
      res.send(result)
    }
  },
  {
    desc: '修改案件',
    url: '/caseClassification/update',
    type: 'get',
    response: (req, res) => {
      const result = Mock.mock({
        'code': 200,
        'status': 'success'
      })
      // let result = Mock.mock({
      //   'code': 500,
      //   'desc': '我报了500的错误'
      // })
      res.send(result)
    }
  }
]

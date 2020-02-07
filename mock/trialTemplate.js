const Mock = require('mockjs')

module.exports = [
  {
    desc: '获取审讯模版',
    url: '/trialTemplate/queryPage',
    type: 'get',
    response: (req, res) => {
      const result = Mock.mock({
        'code': 200,
        'total': 30,
        'rows|3-10': [
          {
            'template_name': '伪造牌照审讯模板_13',
            'update_time': '2020-01-09 10:45:22',
            'update_user': 'xiao_wang',
            'case_name': '伪造牌照',
            'case_id': '97b47072-712a-4454-b129-a156579474c4',
            'id': '10f76683-e136-4a75-8da6-ef4d5f19a7e8',
            'release_status': '0',
            'status': '1'
          }
        ]

      })
      res.send(result)
    }
  },
  {
    desc: '新增审讯模版',
    url: '/trialTemplate/add',
    type: 'get',
    response: (req, res) => {
      const result = Mock.mock({
        'code': 200,
        'status': 'success'
      })
      res.send(result)
    }
  },
  {
    desc: '删除审讯模版',
    url: '/trialTemplate/delete',
    type: 'get',
    response: (req, res) => {
      const result = Mock.mock({
        'code': 200,
        'status': 'success'
      })
      res.send(result)
    }
  },
  {
    desc: '修改审讯模版',
    url: '/trialTemplate/update',
    type: 'get',
    response: (req, res) => {
      const result = Mock.mock({
        'code': 200,
        'status': 'success'
      })
      res.send(result)
    }
  }
]

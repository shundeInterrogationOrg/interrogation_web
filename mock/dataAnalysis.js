const Mock = require('mockjs')

module.exports = [
  {
    desc: '数据统计',
    url: '/dataStatistics/dataStatisticsPageQuery',
    type: 'post',
    response: (req, res) => {
      const result = Mock.mock({
        'total': 24,
        'rows': [{
          'modelNum': 3,
          'useNum': 2,
          'name': '伪造牌照审讯模板_14',
          'questionNum': 10,
          'updateTime': '2020-01-09 16:55:24',
          'id': '010a7299-71da-4d44-b402-ab22e8c89c5a'
        },
        {
          'modelNum': 0,
          'useNum': 0,
          'name': '伪造牌照审讯模板_2',
          'questionNum': 0,
          'updateTime': '2020-01-09 10:45:22',
          'id': '0a23b8eb-282c-4c1b-ba8b-dd90fcea538d'
        },
        {
          'modelNum': 0,
          'useNum': 0,
          'name': '酒驾模板',
          'questionNum': 0,
          'updateTime': '2020-01-07 19:01:10',
          'id': 'bbbbbb'
        },
        {
          'modelNum': 0,
          'useNum': 0,
          'name': '伪造牌照审讯模板_10',
          'questionNum': 0,
          'updateTime': '2020-01-09 10:45:22',
          'id': '6d722be3-ae1a-427e-953b-8303da362854'
        },
        {
          'modelNum': 0,
          'useNum': 0,
          'name': '伪造牌照审讯模板_3',
          'questionNum': 0,
          'updateTime': '2020-01-09 10:45:22',
          'id': '1c1375dc-ff26-4e5f-bfa4-11ee8205c16d'
        },
        {
          'modelNum': 0,
          'useNum': 0,
          'name': '伪造牌照审讯模板_11',
          'questionNum': 0,
          'updateTime': '2020-01-09 10:45:22',
          'id': 'e0145bca-9f04-4fb7-acff-cf5ec1eec8f3'
        },
        {
          'modelNum': 0,
          'useNum': 0,
          'name': '伪造牌照审讯模板_30',
          'questionNum': 0,
          'updateTime': '2020-01-09 19:41:15',
          'id': '683ae99e-972b-4251-aaa0-ac66afcc61a1'
        },
        {
          'modelNum': 0,
          'useNum': 0,
          'name': '伪造牌照审讯模板_12',
          'questionNum': 0,
          'updateTime': '2020-01-09 10:45:22',
          'id': 'cc11796d-6fe1-4c9b-9468-d5e562a57e2c'
        },
        {
          'modelNum': 0,
          'useNum': 0,
          'name': '伪造牌照审讯模板_4',
          'questionNum': 0,
          'updateTime': '2020-01-09 10:45:22',
          'id': '7bc72a36-d7df-4740-bfe5-200dc5fe3996'
        },
        {
          'modelNum': 0,
          'useNum': 0,
          'name': '伪造牌照审讯模板_13',
          'questionNum': 0,
          'updateTime': '2020-01-09 10:45:22',
          'id': '10f76683-e136-4a75-8da6-ef4d5f19a7e8'
        }]
      })
      return result
    }
  }
]

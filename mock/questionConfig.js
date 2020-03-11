const Mock = require('mockjs')
module.exports = [
  {
    desc: '问题删除',
    url: '/question/delete',
    type: 'post',
    response: (req, res) => {
      const result = Mock.mock({
        'status': 'success'
      })
      return result
    }
  },
  {
    desc: '问题查询',
    url: '/question/queryPage',
    type: 'post',
    response: (req, res) => {
      const result = Mock.mock({
        'total': 18,
        'rows': [
          {
            'id': 'a2e4ed4a-54ed-4630-a742-a25b8607f5de',
            'content': '我们是佛山市公安机关的民警（出示证件），现依法对你进行询问。你应当如实回答我们的询问并协助调查，不得伪造、隐匿、毁灭证据，否则将承担法律责任。你有权对有关情况作陈述和申辩，有权就被询问事项自行提供书面材料，有权拒绝回答与案件无关的问题，有权提出对办案公安机关负责人、办案人员、鉴定人、翻译人的回避申请，有权核对询问笔录，对笔录记载有误或者遗漏之处提出更正或者补充意见。如果你回答的内容涉及国家秘密、商业秘密或者个人隐私，公安机关将予以保密。以上内容你是否已清楚？',
            'isVirtual': '0',
            'sequence': 'question01',
            'parentId': null,
            'trialTemplateId': '010a7299-71da-4d44-b402-ab22e8c89c5a',
            'status': '1',
            'replyNum': '2',
            'replyList': [
              {
                'id': '61184588-e767-4044-b96d-98a37ac680c7',
                'parsingWay': '1',
                'modelId': '',
                'regularExpression': '不',
                'jumpTo': '1',
                'repetitions': null,
                'afterRepeat': '',
                'afterIntervention': '',
                'questionId': 'a2e4ed4a-54ed-4630-a742-a25b8607f5de',
                'retValue': '',
                'status': '1',
                'addTime': '2020-02-26 15:33:57 321',
                'jumpToQuestion': 'question02',
                'regularNegation': '0',
                'sequence': null,
                'subSequence': null
              },
              {
                'id': 'c43ead71-a357-4ad2-9d18-0e19e5d17b8b',
                'parsingWay': '1',
                'modelId': '',
                'regularExpression': '不',
                'jumpTo': '3',
                'repetitions': 2,
                'afterRepeat': '0',
                'afterIntervention': '',
                'questionId': 'a2e4ed4a-54ed-4630-a742-a25b8607f5de',
                'retValue': '',
                'status': '1',
                'addTime': '2020-02-26 15:33:57 358',
                'jumpToQuestion': 'question02',
                'regularNegation': '1',
                'sequence': null,
                'subSequence': null
              }
            ]
          },
          {
            'id': '523cc297-54a4-42c7-ab5f-4d53f8ca9c61',
            'content': '你是否需要申请相关人员回避？',
            'isVirtual': '0',
            'sequence': 'question02',
            'parentId': null,
            'trialTemplateId': '010a7299-71da-4d44-b402-ab22e8c89c5a',
            'status': '1',
            'replyNum': '3',
            'replyList': [
              {
                'id': '0312929b-d0e7-420d-8136-93a56ee5df6b',
                'parsingWay': '1',
                'modelId': '',
                'regularExpression': '不',
                'jumpTo': '1',
                'repetitions': null,
                'afterRepeat': '',
                'afterIntervention': '',
                'questionId': '523cc297-54a4-42c7-ab5f-4d53f8ca9c61',
                'retValue': '',
                'status': '1',
                'addTime': '2020-02-26 15:28:36',
                'jumpToQuestion': 'question03',
                'regularNegation': '1',
                'sequence': null,
                'subSequence': null
              },
              {
                'id': '5fd1e753-eadf-4a48-8fd0-5166255025a4',
                'parsingWay': '1',
                'modelId': '',
                'regularExpression': '不',
                'jumpTo': '4',
                'repetitions': null,
                'afterRepeat': '',
                'afterIntervention': 'question03',
                'questionId': '523cc297-54a4-42c7-ab5f-4d53f8ca9c61',
                'retValue': '',
                'status': '1',
                'addTime': '2020-02-26 15:28:36',
                'jumpToQuestion': '',
                'regularNegation': '0',
                'sequence': null,
                'subSequence': null
              },
              {
                'id': 'e31e679a-6714-44c7-95dc-116d453f2c07',
                'parsingWay': '1',
                'modelId': '',
                'regularExpression': '什么',
                'jumpTo': '2',
                'repetitions': null,
                'afterRepeat': '',
                'afterIntervention': '',
                'questionId': '523cc297-54a4-42c7-ab5f-4d53f8ca9c61',
                'retValue': '',
                'status': '1',
                'addTime': '2020-02-26 15:28:36',
                'jumpToQuestion': 'question02_01',
                'regularNegation': '1',
                'sequence': null,
                'subSequence': null
              }
            ]
          }
        ]
      })
      return result
    }
  },
  {
    desc: '升序/降序排列',
    url: '/question/sequenceSort',
    type: 'post',
    response: (req, res) => {
      const result = Mock.mock({
        'status': 'success'
      })
      return result
    }
  },
  {
    desc: '问题新增',
    url: '/question/questionAdd',
    type: 'post',
    response: (req, res) => {
      const result = Mock.mock({
        'status': 'success'
      })
      return result
    }
  },
  {
    desc: '问题修改',
    url: '/question/update',
    type: 'post',
    response: (req, res) => {
      const result = Mock.mock({
        'status': 'success'
      })
      return result
    }
  },
  {
    desc: '模型查询',
    url: '/model/queryPage',
    type: 'post',
    response: (req, res) => {
      const result = Mock.mock({
        'total': 2,
        'rows': [
          {
            'model_category_id': 'aaa1',
            'model_category_name': '模型类别1',
            'retValue': 'retValue2',
            'name': '模型a',
            'use_status': 1,
            'id': 'bbb',
            'interface_url': 'http://localhost:8081'
          },
          {
            'model_category_id': 'aaa1',
            'model_category_name': '模型类别1',
            'retValue': 'retValue1',
            'name': '模型a',
            'use_status': 1,
            'id': 'aaa',
            'interface_url': 'http://localhost:8080'
          }
        ]
      })
      return result
    }
  }
]

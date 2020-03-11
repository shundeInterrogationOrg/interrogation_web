// 问题配置相关接口
import axios from '@/utils/axios'

// 查询问题
const questionSearch = function(params) {
  const data = axios.post('/question/queryPage', params)
  return data
}
// 删除问题
const questionDelete = function(params) {
  const data = axios.post('/question/delete', params)
  return data
}
// 新增问题
const questionAdd = function(params) {
  const data = axios.post('/question/add', params)
  return data
}
// 修改问题
const questionUpdate = function(params) {
  const data = axios.post('question/update', params)
  return data
}
// 升序/降序
const sequenceSort = function(params) {
  const data = axios.post('/question/sequenceSort', params)
  return data
}
// 模型查询
const queryPage = function(params) {
  const data = axios.post('/model/queryPage', params)
  return data
}
export {
  questionSearch,
  questionUpdate,
  questionAdd,
  questionDelete,
  sequenceSort,
  queryPage
}

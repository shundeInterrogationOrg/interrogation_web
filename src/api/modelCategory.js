// 数据统计相关接口
import axios from '@/utils/axios'

/**
 * @dec  获取模型类别
 */

const modelCategory = function(params) {
  return axios.post('/modelCategory/queryPage', params)
}

const modelCategoryUpdate = function(params) {
  return axios.post('/modelCategory/update', params)
}

const modelCategoryAdd = function(params) {
  return axios.post('/modelCategory/add', params)
}

const modelCategoryDel = function(params) {
  return axios.post('/modelCategory/delete', params)
}


export {
  modelCategory,
  modelCategoryUpdate,
  modelCategoryAdd,
  modelCategoryDel
}

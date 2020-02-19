// 数据统计相关接口
import axios from '@/utils/axios'

/**
 * @dec  获取模型类别
 */

const model = function(params) {
  return axios.post('/model/queryPage', params)
}

const modelUpdate = function(params) {
  return axios.post('/model/update', params)
}

const modelAdd = function(params) {
  return axios.post('/model/add', params)
}

const modelDel = function(params) {
  return axios.post('/model/delete', params)
}


export {
  model, modelUpdate, modelAdd, modelDel
}

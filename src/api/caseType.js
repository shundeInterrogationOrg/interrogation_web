// 案件类别相关接口
import axios from '@/utils/axios'

/**
 * @dec  获取案件类别
 */

const getCases = function(params) {
  const data = axios.post('/caseClassification/queryPage', params)
  return data
}

const addCases = function(params) {
  return axios.post('/caseClassification/add', params)
}
const deleteCases = function(params) {
  return axios.post('/caseClassification/delete', params)
}
const updataCases = function(params) {
  return axios.post('/caseClassification/update', params)
}

export {
  getCases,
  addCases,
  deleteCases,
  updataCases
}

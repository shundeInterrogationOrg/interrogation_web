// 数据统计相关接口
import axios from '@/utils/axios'

/**
 * @dec  获取数据统计
 */

const getAnalysisData = function(params) {
  return axios.post('/dataStatistics/dataStatisticsPageQuery', params)
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
  getAnalysisData,
  addCases,
  deleteCases,
  updataCases
}

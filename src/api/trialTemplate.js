// 审讯模版相关接口
import axios from '@/utils/axios'

/**
 * @dec  获取审讯模版
 */

const getTrialTemplate = function(params) {
  return axios.post('/trialTemplate/queryPage', { params })
}

const addTrialTemplate = function(params) {
  return axios.post('/trialTemplate/add', { params })
}
const deleteTrialTemplate = function(params) {
  return axios.post('/trialTemplate/delete', { params })
}
const updataTrialTemplate = function(params) {
  return axios.post('/trialTemplate/update', { params })
}

export {
  getTrialTemplate,
  addTrialTemplate,
  deleteTrialTemplate,
  updataTrialTemplate
}

// 在线预览相关接口
import axios from '@/utils/axios'

/**
 * @dec  获取数据统计数据
 */

const getOnlineData = function(params) {
  return axios.post('/onlinePreview/onlinePreviewPageQuery', { params })
}

export {
  getOnlineData
}

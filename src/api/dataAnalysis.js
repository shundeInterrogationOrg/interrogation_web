// 数据统计相关接口
import axios from '@/utils/axios'

/**
 * @dec  获取数据统计数据
 */

const getAnalysisData = function(params) {
  return axios.post('/dataStatistics/dataStatisticsPageQuery', { params })
}

export {
  getAnalysisData
}

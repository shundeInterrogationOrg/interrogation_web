// 在线预览相关接口
import axios from '@/utils/axios'

/**
 * @dec  获取数据统计数据
 */

const getOnlineData = function(params) {
  return axios.post('/onlinePreview/onlinePreviewPageQuery', { params })
}

let numStr = function (num) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; 
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
      let strArr = temp.toString().split("").reverse();
      let newNum = "";
      for (var i = 0; i < strArr.length; i++) {
          newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
      }
      return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) noWan = "0" + noWan;
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  // return num
}

export {
  getOnlineData,
  numStr
}

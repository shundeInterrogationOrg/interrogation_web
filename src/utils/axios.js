'use strict'

import axios from 'axios'
import { Message } from 'element-ui'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// ie get请求不缓存
axios.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate'
axios.defaults.headers.common['Pragma'] = 'no-cache'
axios.defaults.headers.common['Expires'] = 0
// let loadingInstance
const config = {
  baseURL: '/bigdata'
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(config => {
  // Do something before request is sent
  // if (config.showLoading !== false) {
  //   loadingInstance = Loading.service({ fullscreen: true })
  // }
  return config
}, error => {
  // Do something with request error
  // loadingInstance.close()
  return Promise.reject(error)
})

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // if (loadingInstance) {
    //   loadingInstance.close()
    // }
    const res = response.data
    const { code, desc } = res
    if (code === 200) {
      return res
    } else if (code === 500) {
      Message.error(desc)
      return Promise.reject(desc)
    } else if (code === 4000) {
      const { data } = res
      localStorage.removeItem('isLogin')
      localStorage.removeItem('userInfo')
      const params = encodeURIComponent(window.location.href)
      window.location.href = `${data}&&relayState=${params}`
      return Promise.reject(res)
    }
  },
  function(error) {
    // if (loadingInstance) {
    //   loadingInstance.close()
    // }
    // Do something with response error
    Message.error(`请求出错:${error}`)
    return Promise.reject(error)
  }
)

export default _axios

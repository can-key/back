/* eslint-disable quotes */
/* eslint-disable dot-notation */
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1',
  timeout: 3000
})

// 请求拦截
service.interceptors.request.use(config => {
  console.log('请求被拦截')

  if (config !== 'login') {
    // 存token，获取token
    const token = localStorage.getItem('token')
    console.log(token)
    config.headers["Authorization"] = token
    console.log(config)
  }
  return config
}, _error => {
  console.log(_error)
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('请求出错')
})

// 响应拦截
service.interceptors.response.use(res => {
  console.log('res删除状态码', res)
  console.log(res.data)

  var { msg, status } = res.data.meta
  console.log(msg, status)

  if (status === 400) {
    Message.error(msg)
    Promise.reject(msg)
  }

  if (res.data.data && res.data.meta) {
    // if (status === 200 || status === 201) {
    if (status === 200) {
      const { token } = res.data.data
      token && localStorage.setItem('token', token)
      // 登录成功提示
      Message({
        message: msg,
        type: 'success'
      })
      return {
        flag: 1,
        msg: msg,
        res: res
      }
    } else {
      Message.error(msg)

      Promise.reject(msg)
    }
  } else {
    if (status === 200) {
      Message({
        message: msg,
        type: 'success'
      })
      return {
        flag: 1,
        msg: msg
      }
    } else {
      Message.error('参数有误，请检查')
    }
  }
}, error => {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('响应出错', error)
})

export default service

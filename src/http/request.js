/* eslint-disable dot-notation */
/* eslint-disable computed-property-spacing */
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1',
  timeout: 3000
})

// 请求拦截
service.interceptors.request.use(config => {
  console.log('请求被拦截')
  // 存token

  if (config !== 'login') {
    const token = localStorage.getItem('token')
    console.log(token)
    config.headers["Authorization"] = token
    console.log(config)
  }
  // this.$store.dispatch('setToken', token)
  return config
}, _error => {
  console.log(_error)
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('请求出错')
})

// 响应拦截
service.interceptors.response.use(res => {
  console.log(res.data)
  // console.log(this.ruleForm)

  console.log(res)
  var { msg, status } = res.data.meta
  console.log(msg, status)

  if (status === 400) {
    Message.error(msg)
    Promise.reject(msg)
  }

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
      res: res
    }
  } else {
    Message.error(msg)
    return {
      flag: 2,
      msg: msg,
      result: res
    }
  }
}, error => {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('响应出错', error)
})

export default service

import request from './request'

// 封装登录接口
export function goLogin (info) {
  return request({
    url: '/login',
    method: 'post',
    data: info
  })
}

// 获取用户信心列表
export function getUsers (v) {
  return request({
    url: '/users',
    method: 'get',
    params: v
  })
}

// 添加用户信息
export function setUsers (v) {
  console.log(v)
  const { username, password, email, mobile } = v
  return request({
    url: '/users',
    method: 'post',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}

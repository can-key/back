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

// 修改用户状态
export function alterUserState (v) {
  return request({
    url: `users/${v.id}/state/${v.mg_state}`,
    method: 'put'
  })
}

// 编辑用户信息
export function compileUser (v) {
  return request({
    url: `users/${v.id}`,
    method: 'put'
  })
}

// 删除用户信息
export function deleUser (vid) {
  return request({
    url: `users/${vid}`,
    method: 'delete'
  })
}

// 分配角色
export function getAssignRoles () {
  return request({
    url: 'roles',
    method: 'get'
  })
}

// 查询
export function assignRolesId (id) {
  return request({
    url: `roles/${id}`,
    method: ''
  })
}

export function allocation (id) {
  return request({
    url: `users/${id}/role`,
    method: ''
  })
}

const actions = {
  // 存token值
  setToken ({ commit }, val) {
    // console.log('存token', val)
    commit('SETTOKEN', val)
  }
}

export default actions

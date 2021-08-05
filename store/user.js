export const state = () => ({
  err: 1,
  msg: '未登录',
  token: '',
  data: {}
})

export const mutations = {
  //  注意只是一个形参
  M_UPDATE_USER(state, payload) {
    state.err = payload.err
    state.msg = payload.msg
    state.data = payload.data
    state.token = payload.token
  }
}

export const actions = {
  //  这里的state指向的是 user.js 模块中的state, 不是全局的 index.js 中的state
  // A_UPDATE_HOME(state,payload){ ,从state中解析
  A_UPDATE_USER({commit, user}, payload) {
    // 异步业务
    commit('M_UPDATE_USER', payload)
  }
}

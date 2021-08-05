//主模块

//  state必须是个函数
export const state = () => ({
  //  导航
  bNav:false,
  //  Loading
  bLoading:false
})

//  mutations
export const mutations = {
  M_UPDATE_NAV(state, payload){
    state.bNav = payload.bNav
  },
  M_UPDATE_LOADING(state, payload){
    state.bLoading = payload.bLoading
  }
}

//actions
export const actions = {
  // nuxtServerInit(store, context){ 解构
  nuxtServerInit(store, {app:{$cookies}}){
    console.log('nuxtServerInit')
    //  初始化token信息到store当中
    console.log($cookies.get)
    let user = $cookies.get('user')?$cookies.get('user'):{err:2,msg:'未登录',token:''}
    store.commit('user/M_UPDATE_USER',user)
    // console.log(`初始化东西到store当中`)
    // console.log(store)
    // console.log(context)
    // console.log('nuxtServerInit')
  },
  A_UPDATE_NAV({commit, state}, payload){
    //异步处理
    commit('M_UPDATE_NAV', payload)
  }
}

//getters
export const getters = {
  getNav(state){
    return state.bNav?'显示':'隐藏'
  }
}

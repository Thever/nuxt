// 配置axios的全局拦截器
export default function({$axios,redirect,route,store,app:{$cookies}}){
  // 基本配置信息
  // 超时限定10秒
  $axios.defaults.timeout = 10000;

  // 请求拦截
  $axios.onRequest(config => {
    console.log(`请求拦截`)
    // config.headers.token="加token"
    // 从 vuex 中获取 token 写入
    // config.headers.token = store.state.user.token
    // if(store.state.user.token){
    //   config.headers.token = store.state.user.token
    // }
    // 从 cookie 中获取 token 写入
    // if($cookies.get('user')){
    //   let user = $cookies.get('user')
    //   config.headers.token = user.token
    // }
    // 返回配置
    // return config
  })

  // 响应拦截
  // 这里可以对接口的返回信息做判断和处理了，进行对应的逻辑操作
  $axios.onResponse(res => {
    console.log('响应拦截')
    //  通过错误状态和路径处理错误, 注意根据实际接口判断
    // if(res.data.err === 2 && route.fullPath !== '/login'){
    //   redirect('/login?path='+route.fullPath)
    // }
    // console.log(res)
    // console.log(res.data)
    return res.data
  })

  // 错误处理
  $axios.onError(error => {
    console.log('错误处理')
    // 处理
    return error
  })
}

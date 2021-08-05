// 插件作为全局前置守卫
export default ({app,redirect,params,query,store}) => {
  //  app == vue实例
  //  redirect跳转函数,实现页面的跳转重定向
  app.router.beforeEach((to,from,next) => {
    // console.log('运行插件 router')
    //全局前置的守卫，插件
    //next(true)  允许跳转
    //next(false) 不允许跳转
    //不存在next('/login')，跳转到/login
    // console.log('插件配置 全局前置', to)
    // if(to.name == 'login' || to.name == 'reg'){
    //   //  next()默认为true
    //   next()
    // }else{
    //   //  路径跳转
    //   // redirect('./login')
    //   //  别名跳转
    //   redirect({name:'login'})
    // }
    //  前置守卫放行
    next()
  })

  app.router.afterEach((to,from) => {
    // console.log('插件全局后置守卫')
  })
}

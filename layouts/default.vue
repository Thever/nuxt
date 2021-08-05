<template>
  <div>
    <!-- 跳转 声明式跳转 router-link -->
    <!-- 一级路由，只要将页面放到page下就会自动生成 -->
    <!-- <nuxt-link to="/">首页</nuxt-link>
    <nuxt-link to="/goods">商品</nuxt-link>
    <nuxt-link to="/user">用户</nuxt-link>
    <nuxt-link to="/login">登录</nuxt-link>
    <nuxt-link to="/reg">注册</nuxt-link> -->
    <!-- 将导航作为组件进行抽离，注意调用名称为文件名 -->
    <app-header v-if="bNav"></app-header>
    <!-- 展示区，相当于router-view -->
    <nuxt />
  </div>
</template>
<script>
//  引入导航组件
import appHeader from './app-header.vue'
export default {
  //  注册组件
  components:{
    appHeader
  },
  // middleware:'auth'  //页面层级的中间件,指向外部
  // 页面级别中间件，定义到内部，运行在外部nuxt中间件之后，页面实例化之前
  middleware({store,route,redirect,params,query,req,res}){
    // console.log('middleware layouts')
    //  context 服务端上下文
    //  全局守卫业务
    // console.log('middleware nuxt.config.js oustside')
    //  全局守卫前置业务
    //  store 状态数信息
    //  route 一条目标路由信息
    //  redirect 强制跳转
    //  params,query 校验参数合理性
    // console.log('middleware /layouts/default.vue 全局守卫前置业务')
    //  强制跳转到登录
    // redirect('/reg')
  },
  data(){
    return {
      bNav:true
    }
  },
  watch:{
    $route:{
      immediate:true,
      handler(route){
        //  登录注册页隐藏 app-header
        if(/login|reg/.test(route.path)){
          this.bNav = false
        }else{
          this.bNav = true
        }
      }
    }
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

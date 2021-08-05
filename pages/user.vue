<template>
  <div class="user">
    <h3>用户页</h3>
    <el-button @click="logout">注销</el-button>
    <el-button onclick="alert($)">组件引入的外部资源脚本</el-button>
  </div>
</template>
<script>
export default {
  //  单独定义组件的head
  head:{
    script:[
      {src:'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'}
    ],
  },
  middleware({store,route,redirect,params,query,req,res}){
    //  context 服务端上下文
    //  组件独享前置守卫
    // console.log('middleware nuxt.config.js oustside')
    //  全局守卫前置业务
    //  store 状态数信息
    //  route 一条目标路由信息
    //  redirect 强制跳转
    //  params,query 校验参数合理性
    // console.log('middleware /pages/user.vue 组件独享前置守卫')
    //  强制跳转到登录
    // redirect('/login')
  },
  methods:{
    logout(){
      //  删除cookie，清空vuex中的内容
      this.$cookies.remove('user')
      let before = {
        err: 1,
        msg: '未登录',
        token: '',
        data: {}
      }
      this.$store.commit('user/M_UPDATE_USER', before)
      //  跳转到登录页
      this.$router.push('/login')
    }
  }
}
</script>

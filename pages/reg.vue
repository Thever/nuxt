<template>
  <div class="reg">
    <h3>注册页</h3>
    <el-divider></el-divider>
    <el-input v-model="username" placeholder="请输入" class="mb">
      <template slot="prepend">用户</template>
    </el-input>
    <el-input type="password" v-model="password" placeholder="请输入" class="mb">
      <template slot="prepend">密码</template>
    </el-input>
    <div class="error">{{message}}</div>
    <el-button type="primary" @click="reg">注册</el-button>
    <el-button @click="$router.push('/login')">登录</el-button>
  </div>
</template>
<script>
export default {
  data:() => ({
    username:'',
    password:'',
    message:'',
  }),
  //  组件中的后置守卫
  beforeRouteLeave (to, from, next) {
    // console.log(`/pages/reg.vue beforeRouteLeave 后置路由守卫`)
    if(this.username||this.password){
      //  填写了内容要跳出就提示
      let bl = window.confirm('是否要离开？')
      next(bl)
    }else{
      next(true)
    }
  },
  methods:{
    async reg(){
      let formData = new FormData()
      formData.append('username',this.username)
      formData.append('password',this.password)
      //  这是一个演示的假接口
      // let res = await this.$axios({
      //   url:'api/reg',
      //   method:'post',
      //   data:formData
      // })
      //  成功
      // let res = {
      //   data:{
      //     err:0
      //   }
      // }
      //  失败
      let res = {
        data:{
          err:1,
          msg:'模拟登录失败了！'
        }
      }
      if(res.data.err == 0){
        //  注册成功
        this.$router.push('/login')
      }else{
        //  注册失败
        this.message = res.data.msg
      }
    }
  }
}
</script>
<style scoped>
  .reg{
    width:35%;
    height:auto;
    position:absolute;
    left:50%;
    top:30%;
    transform: translate(-50%);
  }
  .mb{
    margin-bottom:20px;
  }
  .error{
    color:red;
  }
</style>

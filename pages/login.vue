<template>
  <div class="login">
    <h3>登录页</h3>
    <el-divider></el-divider>
    <el-input v-model="username" placeholder="请输入" class="mb">
      <template slot="prepend">用户</template>
    </el-input>
    <el-input type="password" v-model="password" placeholder="请输入" class="mb">
      <template slot="prepend">密码</template>
    </el-input>
    <div class="error">{{message}}</div>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="$router.push('/reg')">注册</el-button>
  </div>
</template>

<script>
export default {
  data:() => ({
    username:'',
    password:'',
    message:''
  }),
  methods:{
    login(){
      this.$axios({
        url:'https://apiwzypfk.nbshwh.cn/user/login',
        method:'post',
        timeout: 5000,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
          'X-UDID':'a6916d10255782b0218be7635c5fc694'
        },
        //  添加这段话解决后台不能识别数据的问题
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        data:{
          mobile: this.username,
					password: this.password,
					type:1
        }
      }).then( res => {
        console.log('res')
        console.log(res)
        // this.$cookies.set('user',data)
        // this.$store.commit('user/M_UPDATE_USER',data)
        //  判断登录状态
        if(res.code == 200){
          //  登录成功
          //  拼接数据
          let data = {
            token:res.data.user_token,
            err: 0,
            msg: '已登录',
            data: {
              word:'通过真实接口，拼接数据返回登录细腻'
            }
          }
          //  更新cookie和vuex状态
          this.$cookies.set('user',data)
          this.$store.commit('user/M_UPDATE_USER',data)
          // 不存在 path 或者 登录/注册页的query 包含着path
          if(!this.$route.query.path || /login|reg/.test(this.$route.query.path)){
            //  跳转到用户页面
            this.$router.replace('/user')
          }else{
            //  其他就是从哪来就到哪去
            this.$router.replace(this.$route.query.path)
          }
        }else{
          //  登录失败
          this.message = res.message
        }
      }).catch( err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
  .login{
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

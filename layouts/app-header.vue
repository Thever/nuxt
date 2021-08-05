<template>
  <nav>
    <!-- active-class默认是模糊匹配，严格匹配可以加exact -->
    <!-- <nuxt-link to="/" exact active-class="app_header--active">首页</nuxt-link> -->
    <!-- <nav>
      <nuxt-link to="/" exact active-class="app_header--active">首页/</nuxt-link>
      <nuxt-link to="/index" exact active-class="app_header--active">首页/index</nuxt-link>
      <nuxt-link to="/goods" active-class="app_header--active">商品</nuxt-link>
      <nuxt-link to="/user" active-class="app_header--active">用户</nuxt-link>
      <nuxt-link to="/login" active-class="app_header--active">登录</nuxt-link>
      <nuxt-link to="/reg" active-class="app_header--active">注册</nuxt-link>
    </nav> -->
    <!-- 展示element-ui -->
    <!--<el-button type="primary">按钮</el-button>-->
    <!-- 用element-ui 来重写文件 -->
    <el-menu
      :default-active="activeIndex"
      @select="handleSelect"
      active-text-color="#399"
      mode="horizontal"
    >
      <el-menu-item
        v-for="(item,index) of navs"
        :key="index"
        :index="index + ''"
      >{{item.title}}</el-menu-item>
    </el-menu>
  </nav>
</template>
<script>
export default {
  data(){
    return{
      activeIndex:'-1',
      navs:[
        {path:'/index', title:'首页'},
        {path:'/goods', title:'商品'},
        {path:'/user', title:'用户'},
      ]
    }
  },
  methods:{
    handleSelect(key,keyPath){
      this.$router.push(this.navs[key].path)
    }
  },
  watch:{
    //  监听页面路由
    $route:{
      //  立即执行
      immediate:true,
      //  监听路由处理
      handler(route){
        let find = false
        this.navs.map((item,index) => {
          if(item.path == '/'){
            //  访问根目录重定向
            this.$router.push({name:'root'})
          }
          if(route.path == item.path){
            //  路径匹配就修改选中的index
            this.activeIndex = index + ''
            find = true
          }
        })
        if(!find){
          //  没找到匹配路径，就重置默认状态
          this.activeIndex = '-1'
        }
      }
    }
  }
}
</script>
<style scoped>
/*.app_header--active{
  background-color:#399;
  color:#fff;
}*/
</style>

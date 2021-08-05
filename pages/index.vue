<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel>
      <el-carousel-item
        v-for="(item,index) in banner" :key="index">
          <nuxt-link :to="{name:'goods-id',params:{id:item._id},query:{collectionName:'banner'}}">
            <img :src="item.banner" class="img">
            <div class="title_bg">
              <h3 class="title">{{item.title}}</h3>
              <h4 class="sub_title">{{item.sub_title}}</h4>
            </div>
          </nuxt-link>
        </el-carousel-item>
    </el-carousel>
    <!--栅格布局-->
    <el-row class="home" :gutter="20">
      <el-col :span="8" v-for="(item, index) in flexData" :key="index">
        <el-card :body-style="{padding:'0px'}" style="margin-bottom:20px;">
          <nuxt-link :to="{name:'goods-id', params:{id:item._id},query:{collectionName:'home'}}">
            <img :src="item.detail.auth_icon" class="images">
          </nuxt-link>
          <div style="padding:14px;">
            <span>{{item.title}}</span>
            <div class="bottom clearfix">
              <time class="time">{{item.time}}</time>
              <el-button class="button" type="warning" icon="el-icon-star-off" circle></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <h3>首页</h3>
    <h3>数据交互</h3>
    <h4>同域资源</h4>
    <h4>跨域资源</h4>
    <!-- 从接口获取信息 -->
    <p>{{sid}}</p>
    <p>{{text}}</p>
    <!-- vuex操作 -->
    <button @click="getStore">编程式操作</button>
    <div>index getters:{{getNav}}</div>
    <div>index state:{{bNav}}</div>
    <div>user state.data: {{data}}</div>
    <div>home state: {{home}}</div>

    <h4>内部资源指向</h4>
    <!-- 相对路径找到下一些需要压缩的资源 assets -->
    <img src="../assets/img/img1.png" alt="">
    <!-- 绝对路径找到下一些不压缩的资源 static -->
    <!-- ~表示根路径别名 -->
    <img src="~static/img/img2.jpg" alt="">
    <div class="bgimg">css指向压缩的资源</div>

    <h4>外部资源</h4>
    <el-button onclick="alert($)">测试外部JS脚本</el-button>
  </div>
</template>
<script>
//  使用自带的辅助函数
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
export default {
  /*SSR,跑在服务端的钩子，不存在window对象，可以访问上下文，不能访问this指向undefinded*/
  // middleware:'auth'  //页面层级的中间件,指向外部
  // 页面级别中间件，定义到内部，运行在外部nuxt中间件之后，页面实例化之前
  middleware(context){
    console.log('middleware index.vue')
    // console.log(window) //  客户端不能访问服务端的对象
  },
  //  参数校验
  validate(params,query){
    //  校验业务,通过返回true,不通过返回false
    console.log('validate')
    return true
    // return false
  },
  //  读取数据，返回给目标组件(该页面)
  // asyncData(context) {
  //   //  异步业务逻辑，读取服务端数据, 合并给目标组件(覆盖对应值)
  //   console.log('asyncData')
  //   return {
  //     a:11,
  //     b:2
  //   }
  // },

  //  asyncData读取 /static/data/list.json 文件信息
  async asyncData({$axios}){
    console.log(`asyncData`)
    console.log(this)
    // 读取同域资源
    // let res = await $axios({url:'/data/list.json'})
    // console.log(`读取到的资源`)
    // console.log(res)
    //  读取跨域资源
    let res2 = await $axios({url:'https://api.apiopen.top/getJoke'})
    // let res2 = await $axios({url:'/api/home'})
    console.log(`读取跨域资源`)
    console.log(res2.result[0])
    //  通过 return 将接口数据放到页面中
    return{
      //  网络接口访问数据
      sid:res2.result[0]['sid'],
      text:res2.result[0]['text'],
      //  自定义轮播图数据
      banner:[
        {
          banner: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东',
          sub_title:'1',
          _id:'banner1',
        },
        {
          banner: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通',
          sub_title:'2',
          _id:'banner2',
        },
        {
          banner: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
          sub_title:'3',
          _id:'banner3',
        }
      ],
      //  栅格布局数据
      flexData:[
        {
          _id:'card1',
          detail:{
            auth_icon:'https://cdn.uviewui.com/uview/swiper/1.jpg'
          },
          title:'卡片标题1',
          time:'00:00:01'
        },
        {
          _id:'card2',
          detail:{
            auth_icon:'https://cdn.uviewui.com/uview/swiper/2.jpg'
          },
          title:'卡片标题2',
          time:'00:00:02'
        },
        {
          _id:'card3',
          detail:{
            auth_icon:'https://cdn.uviewui.com/uview/swiper/3.jpg'
          },
          title:'卡片标题3',
          time:'00:00:03'
        },
      ]
    }
    // this.word = res2.result[0]['text']
  },
  //  读取数据，返回vuex
  // fetch(store){
  //   //  异步业务逻辑，读取服务端数据, 提交给vuex
  //   console.log('fetch')
  // },

  //  异步读取数据,修改vuex
  async fetch({$axios, store, error}){
    console.log(`fetch读取数据`)
    let res = await $axios({url:'https://api.apiopen.top/getJoke'})
    // console.log(`fetch读取数据 res`)
    // console.log(res)
    // 如果对应数据存在，就提交
    console.log(`fecth提交数据`)
    res.result[0] && store.commit('home/M_UPDATE_HOME', {err:0, data:{word:'fetch成功获取数据了，通过commit来修改内容'}})
  },
  /*CSR, SSR服务端与客户端都会运行*/
  beforeCreate(){
    console.log(`beforeCreate`)
  },
  created(){
    console.log(`created`)
  },
  /*CSR,跑在客户端的钩子,可以访问winodw,this(指向组件)*/
  beforeMount(){
    console.log(`beforeMount`)
  },
  mounted(){
    console.log(`mounted`)
    // console.log(window)
  },
  beforeUpdate(){
    console.log(`beforeUpdate`)
  },
  updated(){
    console.log(`updated`)
  },
  beforeDestroy(){
    console.log(`beforeDestroy`)
  },
  destroyed(){
    console.log(`destroyed`)
  },

  //  服务端不支持缓存，所以激活，失活不存在,别用keep-alive组件了
  // activated(){},
  // deactivated(){},
  //  目标组件数据源
  data(){
    return {
      a:1,
      word:'默认内容'
    }
  },
  methods:{
    getStore(){
      // 编程式访问vuex
      // 发出 actions 请求给 user 模块,务必加上user名称
      // 主模块不要带路径，默认直接写对应的方法即可
      // this.$store.dispatch('user/A_UPDATE_USER', {
      //   err:0,
      //   msg: '登录成功',
      //   token: '假token',
      //   data: {
      //     title: 'user模块的actions提交出来的数据'
      //   }
      // })

      // 发出 mutation 请求给 user 模块
      // this.$store.dispatch('user/A_UPDATE_USER', {
      //   err:0,
      //   msg: '登录成功',
      //   token: '假token',
      //   data: {
      //     title: '组件携带过去的数据'
      //   }
      // })

      /* 解构后调用方法 */
      // this.A_UPDATE_USER({
      //   err:0,
      //   msg: '登录成功',
      //   token: '假token',
      //   data: {
      //     title: 'this.A_UPDATE_USER 调用解构后的方法'
      //   }
      // })

      this.M_UPDATE_USER({
        err:0,
        msg: '登录成功',
        token: '假token',
        data: {
          title: 'this.M_UPDATE_USER 调用解构后的方法'
        }
      })

      console.log('done')
    },

    //  解构vuex自带的函数返回的对象方法，让该组件能够调用
    //  (模块名，方法名)
    //  解析返回 action 方法 A_UPDATE_USER
    ...mapActions('user',['A_UPDATE_USER']),
    //  接下返回 mutation 方法 M_UPDATE_USER
    ...mapMutations('user',['M_UPDATE_USER'])
  },
  computed:{
    xx(){},
    //  解构vuex自带的函数返回的对象方法，利用computed进行赋值
    //  (模块名，方法名)，index.js是根模块，不需要指定模块名
    //  解析返回 index.js getters 中 getNav 返回的值,调用属性名是 getNav
    ...mapGetters(['getNav']),
    //  解析返回 index.js state 中 bNav, 调用属性名是 bNav
    ...mapState(['bNav']),
    //  解析返回 user.js state 中 data 的数据，调用的属性名是 data
    //  由于解构不能修改属性名，在使用 vuex 中,设置对应属性应该做全局使用考虑，方便识别使用
    ...mapState('user',['data']),
    //  抓取 home.js 中的 data,默认使用回合上面 data 冲突，使用对方方式解决
    //  将获取到的值赋值给home,再使用
    ...mapState({home: state => state.home.data}),
  }
}
</script>
<style scoped>
.el-carousel_item .img{
  width:100%;
  height:auto;
}
.title_bg{
  background-color:rgba(0,0,0,1);
  color:#fff;
  height:60px;
  width:100%;
  position:absolute;
  left:0;
  bottom:0;
  z-index:99;
}
.home{
  margin-top:20px;
}
.time{
  font-size:13px;
  color:#999;
}
.bottom{
  margin-top:13px;
  line-height:12px;
}
.image{
  width:100%;
  display:block;
}
.button{
  padding:0;
  float:right;
}
.bgimg{
  width:200px;
  height:200px;
  /* 相对路径*/
  /*background:url('../assets/img/img2.jpg') no-repeat;*/
  /* 绝对路径*/
  background:url('~/assets/img/img2.jpg') no-repeat
}
</style>

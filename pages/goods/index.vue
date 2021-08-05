<!--
  把 /pages/good.vue 的内容放到 /pages/goods/index.vue 中,并且删除 /pages/good.vue ，那么原本的二级内容就回替换原本的一级内容进行展示
  也就是说 /pages/goods/index.vue 会充当当前路径下的一级目录，/pages/goods/ 下的其他文件会被当成一级内容展示(成一级目录)
-->
<template>
  <div class="goods">
    <h3>商品页</h3>
    <!--标签页-->
    <el-tabs tab-position="right" style="height:300px" v-model="collectionName">
      <el-tab-pane label="关注" name="follow">
        <el-table :data="follow" style="width:100%" @row-click="getDetail">
          <el-table-column label="标题" prop="title" width="180"></el-table-column>
          <el-table-column label="作者" prop="detail.auth"></el-table-column>
          <el-table-column label="发布时间" prop="time" width="480"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="栏目" name="column">
        <el-table :data="column" style="width:100%" @row-click="getDetail">
          <el-table-column label="标题" prop="title" width="180"></el-table-column>
          <el-table-column label="作者" prop="detail.auth"></el-table-column>
          <el-table-column label="发布时间" prop="time" width="480"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!--原本的内容-->
    <!--<nuxt-link to="/goods/1?a=1&b=2">商品01</nuxt-link>-->
    <!--<nuxt-link :to="{name:'goods-id',params:{id:2},query:{a:111,b:222}}">商品02</nuxt-link>-->
    <!-- 对象传递 -->
    <!-- 没有配置路由，使用默认路由，配置文件夹名称，_id忽略下划线，用-pingjie ,goods文件夹-id,goods-id -->
    <!-- params代表参数，传递的内容名称要与文件名匹配，goods-id,需要传入id -->
    <!-- query代表数据，传递的内容参数没有显示 -->
    <!--<nuxt-link :to="{name:'goods-id',params:{id:3},query:{a:111,b:222}}">商品03</nuxt-link>-->
    <!-- 约定子路由的展示区,展示子路由内容 -->
    <!--<nuxt-link to="/goods/comment">评论</nuxt-link>-->
    <!--<nuxt />-->
  </div>
</template>
<script>
export default {
  name:'goods',
  //  设置页面自定义的header
  head(){
    return {
      meta:[
        {name:'keywords', content:this.collectionName}
      ]
    }
  },
  asyncData({$axios}){
    //  没有接口，直接返回数据，注入到当前页面中
    if(false){
      //  课程演示接口
      return Promise.all([
        $axios({url:'/api/goods/follow'}),
        $axios({url:'/api/goods/follow'}),
      ]).then(
        ([follow,column]) => ({
          follow:follow.data.data,
          column:column.data.data
        })
      )
    }else{
      return {
        follow:[
          {
            _id:1,
            des:'描述',
            detail:{
              auth:'Thever Wang',
              auth_icon:'https://www.baidu.com/img/flexible/logo/pc/result.png',
              content:'follow默认内容'
            },
            time:'1553475675109',
            title:'follow1'
          }
        ],
        column:[
          {
            _id:1,
            des:'描述',
            detail:{
              auth:'Thever Wang',
              auth_icon:'https://www.baidu.com/img/flexible/logo/pc/result.png',
              content:'column默认内容'
            },
            time:'1553475675109',
            title:'column1'
          }
        ]
      }
    }
  },
  data:() => ({
    collectionName:'column'
  }),
  methods:{
    getDetail(row,col,ev){
      this.$router.push({name:'goods-id',params:{id:row._id},query:{collectionName:this.collectionName}})
    }
  }
}
</script>

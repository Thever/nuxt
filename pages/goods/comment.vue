<template>
  <div>
    <h3>评论 comment.vue</h3>
    <nuxt-link :to="{name:goods-comment-uid, params:{uid:1}, query:{a:1,b:2}}">评论01</nuxt-link>
    <nuxt-link to="/goods/comment/2?a=11&b=22">评论02</nuxt-link>
    <nuxt />
    <hr>
    <!-- 测试Vue全局指令指令 -->
    <div v-direc1="'red'">direc1</div>
    <div v-direc2>{{title}}</div>
    <hr>
    <!-- 测试全局组件 -->
    <uc-button></uc-button>
  </div>
</template>
<script>
export default {
  data(){
    return{
      title:'数据'
    }
  },
  mounted(){
    // 挂载完成之后尝试调用全局方法
    this.$show()
  }
}
</script>

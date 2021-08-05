<template>
  <!-- 下划线代表的是变量，可以指向一个动态的名称 -->
  <div class="detail">
    <h3>商品详情页</h3>
    <!-- {{ 数据 | 使用的过滤器方法}}-->
    <div>发布时间:{{data.time | data}}</div>
    <div>发布时间:{{4 | fillzero}}</div>
  </div>
</template>
<script>
export default {
  name:'goods-detail',
  validate({params,query}){
    //  返回true为成功，返回false为失败
    //  params.id必须为数字
    if(typeof params.id === 'number'){
      return true
    }
    if(typeof params.id === 'string'){
      return true
    }
    // return typeof params.id === 'number' || typeof params.id === 'string'
  },
  // transition:'动画类名',动画效果可以定义在文件内部或外部
  // 需要定义 类型-enter-active 类名--leave-active 类名-enter 类名-leave-active
  transition:'test',
  asyncData({query,params,$axios}) {
    // 接口请求
    // return $axios({
    //   url:`/api/goods/${query.collectionName}/${params.id}`
    // }).then(
    //   res => ({data:res.data.data})
    // )
    // 没有接口直接写入
    return {
      data:{
        des:'一些描述',
        detail:{
          auth:'Thever Wang',
          auth_icon:'https://www.baidu.com/img/flexible/logo/pc/result.png',
          content:'column默认内容'
        },
        time:1626341981000,
        title:'一些标题'
      }
    }
  },
    //  使用全局的混入方法来head,记得要放在服务端钩子后面方便读取数据
  head(){
    return this.$seo(this.data.title,this.data.des,[{}])
  },
}
</script>
<style scoped>
  /* 页面进入，页面离开动效 */
  /*.test-enter-active, .test-leave-active{
    transition:0.5s ease all;
  }*/
  /* 页面入场，页面退场动效 */
  /*.test-enter, .test-leave-active{
    margin-left: -1000px;
  }*/
</style>

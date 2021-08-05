<!-- 自定义的loading组件可以使用nuxt自带的一些方法 -->
<template>
  <div v-if="loading" class="spinner"></div>
</template>
<script>
export default {
  data:() => ({
    loading:false
  }),
  methods:{
    //  nuxt loading 自带方法，loading组件显示
    start(){
      this.loading = true
    },
    //  nuxt loading 自带方法，loading组件隐藏
    finish(){
      this.loading = false
    }
  }
}
</script>
<style scoped>
.spinner {
  width: 60px;
  height: 60px;
  background-color: #399;
  position:fixed;
  left:50%;
  top:50%;
  transform: translate(-30px, -30px);
  z-index:9;
  margin: 100px auto;
  -webkit-animation: rotateplane 1.2s infinite ease-in-out;
  animation: rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>

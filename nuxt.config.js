export default {
  mode: "universal",
  /*
   ** Headers of the page
   ** 约定头部信息
   */
  head: {
    title: process.env.npm_package_name || "默认标题",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "默认描述"
      }
    ],
    //  引入三方脚本库Jquery
    script:[
      {src:'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'}
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      //  使用谷歌字体
      { rel: "styleSheet", href: "https://fonts.googleapis.com/css?family=Roboto" },
    ]
  },
  //  配置router来添加middleware的处理判断
  //  路由跳转可以运行中间件
  router: {
    //  中间件监听路由
    middleware: "auth",
    //  配置拓展型路由
    extendRoutes(routes, resolve) {
      // console.log(routes)
      // console.log(resolve)
      // routes相当于array,要添加多个路由，就添加多个对象即可
      routes.push({
        name: "home",
        path: "/index",
        //  node中的resolve __dirname用来指向当前项目的根目录
        component: resolve(__dirname, "pages/index.vue")
      });
    }
  },
  /*
   ** 自定义系统默认loading效果，或者指定一个loading组件
   ** 滚动条需要有异步请求才会生效
   */
  // loading: { color: '#fff', height:'3px' },
  loading: "~/components/loading.vue",
  /*
   ** Global CSS 约定全局样式,引入约定好的页面进出动画效果
   ** element-ui/lib/theme-chalk/index.css,引入element-ui样式
   */
  css: [
    // 自定义动画样式
    "assets/css/transition.css",
    // ui组件样式
    "element-ui/lib/theme-chalk/index.css",
    // 自定义全局样式
    "assets/css/base.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    //  插件通用使用
    //  默认的路由插件使用
    "~/plugins/router",
    //  自定义使用插件
    //  使用axiox插件
    {
      //  使用插件配置地址
      src: "~/plugins/axios",
      //  开启SSR后台熏染
      ssr: true
    },
    //  使用插件element-ui
    {
      //  插件配置文件地址
      src: "~/plugins/element-ui",
      //  客户端渲染
      //  不支持ssr的插件只会在客户端运行，不要给true
      ssr: true
      // mode:'server' // 还可配置client,v2.4+的版本才会出现
    },
    //  导入自定义插件
    "~/plugins/mixins"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules  安装的插件模块，需要再这里引用配置
   */
  modules: ["@nuxtjs/axios", "cookie-universal-nuxt","@nuxtjs/style-resources"],
  /* 指定styleResources,来指定全局的scss文件 */
  styleResources:{
    scss:[
      './assets/scss/global.scss'
    ]
  },
  /*
    配置axios,允许跨域
  */
  axios: {
    //  开启axios跨域
    proxy: true
    //  配置基本url BaseUrl
    // prefix:'/api',
  },
  /*
    配置代理属性
  */
  proxy: {
    "/api/": {
      //  代理转发地址
      target: "http:localhost:3001",
      //  更改请求来源
      changeOrigin: true,
      //  地址重写
      pathRewrite: {
        // '^/user':''
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [
      //  element-ui在打包时候展示
      /^element-ui/
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

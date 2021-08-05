# learn-nuxt-ssr

> My solid Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


# 安装

  npm init -y 
  npm i create-nuxt-app@2.15.0 --save
  npx create-nuxt-app xxx
  Choose rendering mode Universal(SSR)

# 开发

  npm run dev

# 打包

  npm run build 
  npm run start

# 生命周期

  nuxtServerInit

  middleware
    中间件执行流程顺序
    nuxt.config.js -> 匹配布局 -> 匹配页面

  validate
    参数校验，校验失败，则自动跳转到错误页面

# 路由

  nuxt的路由默认是约定式，在pages目录下配置相关页面，路由能够自动产生。
    展示区:<nuxt />
    声明式跳转：<nuxt-link :to="{name:goods-comment-uid, params:{uid:1}, query:{a:1,b:2}}">评论01</nuxt-link>
      name:路由名 目录名-其他目录-文件名
      params:key 要对等文件名(_表示任意匹配，不要理会)
    
    子路由：
      目录代表子路由，子路由内部同级的文件，代表的是同一级路由

    展示区层级控制：
      |PATH                   |FILE                 |
      |:----------------------|:--------------------|
      |`/`                    |`index.vue`          |
      |`/goods`               |`goods/index.vue`    |
      |`/goods/123`           |`goods/_id.vue`      |
      |`/goods/comment`       |`goods/comment.vue`  |

      pages/一级目录/二级目录
                   /  index.vue 会在一级展示
                   /  index.vue 空文档 代表有默认页面，不会找寻其他 _详情.vue
      一般来说  pages/product/index.vue 搭配 pages/product/kind.vue ....
      这样一个二级目录是比较合理明显的

      如果是 pages/product.vue , pages/product/kind.vue...
      不想修改 pages/product.vue 文件的话,可以设置只带template的  pages/product/index.vue,来避免二级内容替换一级内容

    拓展路由
      在约定式路由基础下使用代码配置路由
      extendRoutes(routes, resolve){
      // routes相当于array,要添加多个路由，就添加多个对象即可
      routes.push({
        name:'home',
        path:'/index',
        //  node中的resolve __dirname用来指向当前项目的根目录
        component:resolve(__dirname,'pages/index.vue')
      })
    }

    参数校验
      可以在组件中调用钩子validate,来查看传入的参数，进行判断处理
      validate({params,query}){
        //  返回true为成功，返回false为失败
        //  params.id必须为数字
        return typeof params.id === 'number'
      }
    错误路由定制
      一般而言 nuxt 自带了页面错误的样式内容,按照约定，你可以创建 /layouts/error.vue, 通过接受error参数来判断处理错误。
      <!-- 配置error.vue用来自定义页面错误的展示信息 -->
      <template>
        <div>
          <h1 v-if="error.statusCode">{{error.message}}</h1>
          <h1 v-else>应用发送异常</h1>
          <button @click="$router.replace('/index')">跳转到首页</button>
        </div>
      </template>
      <script>
      export default {
        //接受错误信息  error: {statusCode,message}
        props:['error']
      }
      </script>

  # 动画
    页面切换动画效果
      全局页面切换动画效果，可以先创建文件css文件指定切换动画效果，在到 nuxt.config.js 的 css 属性中指定css文件即可。
      本项目的全局切换动画为 assets/css/transition.css, 在根目录下的 nuxt.config.js中指定了,page开头的类表示全局页面切换的动画效果。
      /* 页面进入，页面离开动效 */
      .page-enter-active, .page-leave-active{
        transition:opacity 0.5s;
      }
      /* 页面入场，页面退场动效 */
      .page-enter, .page-leave-active{
        opacity:0;
      }

      特定页面的动画效果，可以用transition指定动画类来实现，用指定的动画类来基于对应动画效果即可
      //  transition:'动画类名'
      transition:'test'

      /* 页面进入，页面离开动效 */
      .test-enter-active, .test-leave-active{
        transition:0.5s ease all;
      }
      /* 页面入场，页面退场动效 */
      .test-enter, .test-leave-active{
        margin-left: -1000px;
      }

      对应的动画类的样式可以放到特定页面的style中，或者放到全局页面切换动画效果的css文件中

    路由守卫
      路由守卫能够监听路由的变化，方便进行逻辑处理,具体参考各个模块内调用的内容
      前置
        依赖中间件middleware,插件
        全局守卫: nuxt.config.js 指向middleware
                 layouts定义中间件
        组件独享守卫:
                 middleware
        插件全局前置守卫
      
      后置
        使用vue的 beforeRouteLeave钩子
        插件全局后置守卫

    数据交互
      安装
        npm i @nuxtjs/axios@5.9.7 @nuxtjs/proxy@1.3.3 -D

      nuxt.config.js
      配置插件
        modules: [
          '@nuxtjs/axios'
        ],

      配置跨域
      axios: {
        //  开启axios跨域
        proxy:true,
        //  配置基本url BaseUrl
        // prefix:'/api',
      },
      proxy:{
        '/api/':{
          //  代理转发地址
          target:'http:localhost:3001',
          //  更改请求来源
          changeOrigin:true,
          //  地址重写
          pathRewrite:{
            // '^/api':''
          }
        }
      },

      页面中请求文件,依赖页面组件调动特定的钩子函数
        async asyncData({$axios}){
          console.log(`asyncData`)
          // 读取同域资源
          let res = await $axios({url:'/data/list.json'})
          console.log(`读取到的资源`)
          console.log(res)

          //  读取跨域资源
          // let res2 = await $axios({url:'http://localhost:3001/api/home'})
          let res2 = await $axios({url:'/api/home'})
          console.log(`读取跨域资源`)
          console.log(res2.data)
        },

        async fetch({$axios}){
          let res = await $axios({url:'/data/list.json'})
          console.log(`读取到的资源 res`)
          console.log(res.data.title)
        },

    拦截器
      其实就是对@nuxtjs/axios请求库的配置，创建 /plugins/axios.js 配置文件，再到nuxt.config.js中配置使用即可
      
        plugins: [
          {
            //  使用插件配置地址
            src:'~/plugins/axios',
            //  开启SSR后台渲染
            ssr:true
          }
        ],

    自定义Loading页面
      loading:{
        //  设置默认loading条
        color:'#399',
        height:'3px'
      }
      //自定义loading组件
      loading:'~/components/loading.vue'

    vuex
      **模块方式：** `store` 目录下每个 `.js` 文件会被转换成状态树[指定命名的子模块](https://vuex.vuejs.org/en/modules.html) (当然,`index` 是根模块)

      **Classic(不建议使用):**  `store/index.js` 创建返回Vuex.Store实例的方法
    
    状态持久化 && token校验
      思想：登录是2，同步 vuex 和 cookie, 强制刷新后, nuxtServerInit 钩子，取出 cookies, 同步vuex, axios拦截器读取vuex

      依赖库 cookie-universal-nuxt
      
      安装
        npm i cookie-universal-nuxt@2.1.3 --save 
      
      配置插件
        modules: [
          'cookie-universal-nuxt'
        ]
    
    element-ui

      安装库
        npm i element-ui@2.13.1 --save

      配置
        在 ~/plugins/ 下创建配置文件 element-ui.js

      引入使用
        在 nuxt.config.js 中配置使用 plugin 和 css样式

        plugins:[
          //  使用插件element-ui
          {
            //  插件配置文件地址
            src:'~/plugins/element-ui',
            //  客户端渲染
            //  不支持ssr的插件只会在客户端运行，不要给true
            ssr:true,
            // mode:'server' // 还可配置client,v2.4+的版本才会出现
          }
        ],
        css: [
          'element-ui/lib/theme-chalk/index.css'
        ],
        配置完成后就能在全局使用element-ui样式功能了

      全局方法
        定义 
          创建 '~/plugins/mixins.js'

        nuxt.config.js插件方式引入
          plugins: [
            '~/plugins/mixins'
          ]

        使用
          如果是定义在vue.prototype上的话，服务器钩子不能使用，因为this不会指向vue实例对象
          自定义插件被导入后就会生效和使用。

      全局样式
        创建全局CSS样式文件，在nuxt.config.js中的css中引入使用
            css: [
              // 自定义全局样式
              "assets/css/base.css"
            ],   

      mete 信息注入
        方法1： 在nuxt.config.js 中配置header，全局使用
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
              link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
            }, 

          方法2：在对应页面中使用head属性指定内容
            /* 直接写 */
            head(){
              return {
                meta:[
                  {name:'keywords', content:this.collectionName}
                ]
              }
            }

            /* 使用全局的混入方法写 */
            // 混入插件mixins
            //  混入methods,帮助页面赋予单独的meta
              Vue.mixin({
                methods: {
                  $seo(title, content, payload = []) {
                    return {
                      title,
                      meta: [
                        {
                          hid: "description",
                          name: "keywords",
                          content
                        }
                      ].concat(payload)
                    };
                  }
                }
              });

            _id.vue
            //  使用全局的混入方法来head,记得要放在服务端钩子后面方便读取数据
            //  这里不要使用指针函数会丢失对象
            head(){
              return this.$seo(this.data.title,this.data.des,[{}])
            },

      全局配置导入SCSS
        安装依赖
          npm i node-sass@5.0.0 sass-loader@10.1.0 --save
        
        单页面无需配置，直接可以在文件中使用
          <style lang="scss" scoped>
            $bg:#399;
            .box{
              background:$bg
            }
          </style>

        全局使用需要安装 @nuxtjs/style-resources@1.0.0
          npm i @nuxtjs/style-resources@1.0.0 --save

        写入全局scss
          ./assets/scss/global.scss $theme-bg: #393;

        在nuxt.config.js中配置
            /* 指定使用的模块 */
            modules: ["@nuxtjs/style-resources"]
            /* 指定styleResources,来指定全局的scss文件 */
            styleResources:{
              scss:[
                './assets/scss/global.scss'
              ]
            },
        
        在对应文件中使用全局样式
          <div class="box2">box2</div>
          <style lang="scss" scoped>
            .box2{
              background:$theme-bg
            }
          </style>

      定义化html模板
        在项目的根目录新建app.html,重新编译运行即可，可以通过查看源码来确定是否生效
          app.html
          <!DOCTYPE html>
          <html {{HTML_ATTRS}}>
          <head {{HEAD_ATTRS}}>
            {{HEAD}}
            <!-- 加入个性的内容 -->
          </head>
          <body {{BODY_ATTRS}}>
            {{APP}}
          </body>
          </html>

      资源指向与引入
        
        指向：相对路径同原本的相对路径引用，根路径不能用/，要用~符号来指定根路径

        引入：
            局部映入：1.如果定义化html模板，在根目录配置了app.html,可以在里面标签直接引用。
                      <!DOCTYPE html>
                      <html {{HTML_ATTRS}}>
                      <head {{HEAD_ATTRS}}>
                        {{HEAD}}
                        <!-- 加入个性的内容 -->
                        <!-- <script src="外部资源"></script> -->
                      </head>
                      <body {{BODY_ATTRS}}>
                        {{APP}}
                      </body>
                      </html>

                     2.在nuxt.config.js中配置head
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
                        }

              局部引入：在对应页面中配置head引入使用
                        user.vue
                        head:{
                          script:[
                            {src:'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'}
                          ],
                        },

      用ts来写nuxt项目：
        1.新建项目，使用ts语言开发
          # 需要在tsconfig.json 中配置 "skipLibCheck":true, 项目才能正常运行
          
        2.对现有的nuxt项目进行改装。
          参考：https://typescript.nuxtjs.org/zh-hant/guide/setup/#configuration
          安装对于的依赖包
            npm i @nuxt/typescript-build@0.6.6 --save

          在nuxt.config.js中配置模块
            buildModules: [
              '@nuxt/typescript-build'
            ],

          在根目录下创建tsconfig.json文件，增加 esModuleInterop:true 配置
          tsconfig.json
          {
            "compilerOptions": {
              "target": "ES2018",
              "module": "ESNext",
              "moduleResolution": "Node",
              "lib": [
                "ESNext",
                "ESNext.AsyncIterable",
                "DOM"
              ],
              "esModuleInterop": true,
              "allowJs": true,
              "sourceMap": true,
              "strict": true,
              "noEmit": true,
              "baseUrl": ".",
              "paths": {
                "~/*": [
                  "./*"
                ],
                "@/*": [
                  "./*"
                ]
              },
              "types": [
                "@types/node",
                "@nuxt/types"
              ]
            },
            "exclude": [
              "node_modules"
            ]
          }

          在项目目录下创建vue的垫层js--vue-shim.d.ts
          vue-shim.d.ts
          declare module "*.vue" {
            import Vue from 'vue'
            export default Vue
          }

          tsconfig.json中添加 "skipLibCheck":true, 来解决依赖报错

          安装必要包来实现class实现vue的组件功能
            npm i vue-property-decorator@8.4.2 vue-class-component@7.2.3 --save

          具体的修改详情可以查看以下文件
          /components/global/uc-button/uc.buytton.vue
          /components/global/loading
          /layouts/app-header.vue
          /layouts/default.vue
          /layouts/error.vue
          /pages/goods/_id.vue

          //  ts中如果使用$axios方法，使用app.$axios即可，需要配置文件重新指定$axios的返回类型
          //  具体配置可以参考根目录下的 vue.d.ts(配置文件名字可以随意)  

          //  将vue的配置文件放到 types 文件夹下    
          //  跑不起来心烦，弃坑旧项目改造成ts语言，找个vue+ts的项目直接重开

    nuxt部署
      
      配置

      nuxt工程/nuxt.config.js

      server:{
        port:3000, // defalut:3000
        host:'0.0.0.0' // defalut:localhost
      }
      
      nuxt
        npm run build 打包

        需要赋值到服务器的文件
        .nuxt
        package-lock.json
        package.json
        nuxt.config.json
        static
        server 反向代理

      api服务器
        全部copy到服务器

      阿里云
        需要开启安全组:3000 9001 (阿里后台)

        远程工具链接阿里云(finallShell)

          pm2 start /usr/local/9001/bin/www --name=node9001
          cd /usr/local/3000/
          pm2 --name=nuxt3000 start npm -- run start



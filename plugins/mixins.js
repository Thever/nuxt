//  自定义全局方法
import Vue from "vue";
let show = () => console.log("全局方法");
//  由于是绑到了Vue的原型上，那么服务端钩子就不可用 ==> this不会执行vue实例
Vue.prototype.$show = show;

//  全局过滤器
import * as filters from "../assets/script/filters";
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

//  全局指令
import direc1 from "../assets/script/directives/direc1";
import direc2 from "../assets/script/directives/direc2";
Vue.directive("direc1", direc1);
Vue.directive("direc2", direc2);

//  全局组件
import UcButton from "../components/global/uc-button/uc-button.vue";
Vue.component("uc-button", UcButton);

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

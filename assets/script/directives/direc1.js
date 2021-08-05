function direc1(el, binding, vnode) {
  console.log(`全局指令1`);
  console.log(el);
  console.log(binding);
  console.log(vnode);
}

export default {
  //  绑定时触发
  bind(el, binding, vnode) {
    direc1(el, binding, vnode);
  }
};

function direc2(el, binding, vnode) {
  console.log(`全局指令2`);
  console.log(el);
  console.log(binding);
  console.log(vnode);
}

export default {
  //  插入DOM时触发
  inserted(el, binding, vnode) {
    direc2(el, binding, vnode);
  },
  //  组件更新时触发
  componentUpdated(el, binding, vnode) {
    direc2(el, binding, vnode);
  }
};

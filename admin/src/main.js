import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/**
 * 引入elementUI部分组件
 * 在不加载babel-plugin-component模块下，
 * 可以采用类似lodash的cherry pick 方式引入组件和对应的样式
 * 这种引用方式比babel-plugin-component的按需加载大小还要小很多
 */
/* 按需引入elementUI组件*/
import Button from 'element-ui/lib/button'
/* icon字体路径变量 */
import 'element-ui/lib/theme-chalk/fonts/element-icons.ttf'
import 'element-ui/lib/theme-chalk/fonts/element-icons.woff'
/* 按需引入用到的组件的css文件和基础css文件 */
import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/button.css'

Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

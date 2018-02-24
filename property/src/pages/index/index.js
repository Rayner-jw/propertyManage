// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import { 
	Form,
	FormItem,
	Input,
	Button
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../../assets/myIcon/iconfont.css'

Vue.use(VueResource);

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
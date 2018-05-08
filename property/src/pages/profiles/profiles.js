// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import {
	Form,
	FormItem,
	Input,
	Button,
	Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
	Badge,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Pagination,
	Table,
	TableColumn,
	Select,
	Option,
	Breadcrumb,
	BreadcrumbItem,
	Dialog,
	DatePicker
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../../assets/myIcon/iconfont.css'

Vue.use(VueResource);

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Badge)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

webpackJsonp([14],{0:function(t,e){},"51Er":function(t,e,s){"use strict";s.d(e,"a",function(){return n});var n=function(t,e){var s={yyyy:t.getFullYear(),yy:(""+t.getFullYear()).slice(-2),M:t.getMonth()+1,MM:("0"+(t.getMonth()+1)).slice(-2),d:t.getDate(),dd:("0"+t.getDate()).slice(-2),H:t.getHours(),HH:("0"+t.getHours()).slice(-2),h:t.getHours()%12,hh:("0"+t.getHours()%12).slice(-2),m:t.getMinutes(),mm:("0"+t.getMinutes()).slice(-2),s:t.getSeconds(),ss:("0"+t.getSeconds()).slice(-2),w:["日","一","二","三","四","五","六"][t.getDay()]};return e.replace(/([a-z]+)/gi,function(t){return s[t]})}},8423:function(t,e){},Ea02:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),a=s("bKyE"),o=s("I2Ym"),i=s("zL8q"),r=s("51Er"),l={name:"manageFees",data:function(){return{uid:localStorage.uid,tableData:[],seeMore:"查看更多..."}},created:function(){this.$http.get("http://localhost:3000/user/payment?accountId="+this.uid).then(function(t){this.tableData=t.body.results},function(t){if(void 0===t.body.msg)var e="服务器正在维护，造成不便，请理解！";else e=t.body.msg;Object(i.Message)({type:"error",message:e})})},methods:{handleClick:function(t,e){var s=this;i.MessageBox.confirm("是否确定缴纳该年度管理费","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){s.pay(t,e)}).catch(function(){})},pay:function(t,e){var s={accountId:this.uid,launchFeeId:t.launchFeeId,totalFee:t.square*t.costPerSquare,payTime:Object(r.a)(new Date,"yyyy-MM-dd HH:mm:ss")};this.$http.put("http://localhost:3000/user/payment",s).then(function(t){Object(i.Message)({type:"success",message:t.body.msg});var s=this.tableData[e];s.status=1,this.tableData.splice(e,1,s)},function(t){if(void 0===t.body.msg)var e="服务器正在维护，造成不便，请理解！";else e=t.body.msg;Object(i.Message)({type:"error",message:e})})},seeMoreEvt:function(){"这回真的没有了"!=this.seeMore&&this.$http.post("http://localhost:3000/user/payment?accountId="+this.uid).then(function(t){this.tableData=t.body.results,this.seeMore="这回真的没有了"},function(t){if(void 0===t.body.msg)var e="服务器正在维护，造成不便，请理解！";else e=t.body.msg;Object(i.Message)({type:"error",message:e})})}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"manageFees"},[s("span",{staticClass:"title"},[t._v("物业管理费")]),t._v(" "),s("div",{staticClass:"fees"},[s("el-alert",{attrs:{title:"缴费须知",type:"warning",description:"物业管理费包含了公共部位维修费、管理费、电梯运行维护费、水泵运行维护费、小区公用设施维修费 、绿化费、保安费、保洁费、电梯代验费、消防监控费、智能监控费、可视对讲系统、化粪池清掏费、利润、税金、光缆入网费、收视费、各项费用统收服务费、生活垃圾清运费。如有疑问，请致电JW物业处---电话100 1000 1100",closable:!1}}),t._v(" "),s("el-table",{attrs:{data:t.tableData,align:"center",width:"100%"}},[s("el-table-column",{attrs:{align:"center",type:"index",width:"50"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"theYear",label:"年度","min-width":"180"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"costPerSquare",label:"总费用","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.costPerSquare*e.row.square))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"status",label:"缴费状态","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(1==e.row.status?"已缴费":"未交费"))])]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{disabled:1==e.row.status,type:"primary",size:"mini"},on:{click:function(s){t.handleClick(e.row,e.$index)}}},[t._v("缴费")])]}}])})],1),t._v(" "),s("el-button",{staticStyle:{width:"100%"},attrs:{type:"text",size:"small"},domProps:{innerHTML:t._s(t.seeMore)},on:{click:t.seeMoreEvt}})],1)])},staticRenderFns:[]};var c=s("VU/8")(l,u,!1,function(t){s("m8fh")},null,null).exports,d={name:"App",components:{MenuNav:a.a,HomeHeaderNav:o.a,ManageFees:c}},m={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"lf"},[e("MenuNav")],1),this._v(" "),e("div",{staticClass:"lr"},[e("HomeHeaderNav"),this._v(" "),e("ManageFees")],1)])},staticRenderFns:[]};var f=s("VU/8")(d,m,!1,function(t){s("wO26")},null,null).exports,g=s("8+8L");s("tvR6"),s("cF5e");n.default.use(g.a),n.default.use(i.Form),n.default.use(i.FormItem),n.default.use(i.Input),n.default.use(i.Button),n.default.use(i.Menu),n.default.use(i.Submenu),n.default.use(i.MenuItem),n.default.use(i.MenuItemGroup),n.default.use(i.Badge),n.default.use(i.Dropdown),n.default.use(i.DropdownMenu),n.default.use(i.DropdownItem),n.default.use(i.Alert),n.default.use(i.Table),n.default.use(i.TableColumn),n.default.config.productionTip=!1,new n.default({el:"#app",template:"<App/>",components:{App:f}})},I2Ym:function(t,e,s){"use strict";var n=s("51Er"),a={name:"homeHeaderNav",data:function(){return{uid:localStorage.uid,notify:[],message:[],account:"",formatDate:n.a}},created:function(){this.$http.get("http://localhost:3000/user/notify/notify?uid="+this.uid).then(function(t){this.notify=t.body.results,this.account=t.body.account},function(t){if(void 0===t.body.msg)var e="服务器正在维护，造成不便，请理解！";else e=t.body.msg;Message({type:"error",message:e})}),this.$http.get("http://localhost:3000/user/notify/message?uid="+this.uid).then(function(t){this.message=t.body.results},function(t){if(void 0===t.body.msg)var e="服务器正在维护，造成不便，请理解！";else e=t.body.msg;Message({type:"error",message:e})})},methods:{logOut:function(){this.$http.post("http://localhost:3000/logOut").then(function(t){location.href=t.body.url},function(t){if(void 0===t.body.msg)var e="服务器正在维护，造成不便，请理解！";else e=t.body.msg;Message({type:"error",message:e})})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"homeHeaderNav"},[s("el-dropdown",{attrs:{trigger:"click",placement:"bottom-start"}},[s("el-badge",{staticClass:"icon",attrs:{value:t.message.length,hidden:!t.message.length}},[s("i",{staticClass:"my-icon my-icon-3"})]),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("div",{staticClass:"dropdownBox"},[s("h4",[t._v(" "+t._s(0!=t.message.length?"您有"+t.message.length+"条未读消息":"暂无未读消息")+" ")]),t._v(" "),t._l(t.message,function(e){return 0!=t.message.length?[s("span",[t._v("["+t._s(t.formatDate(new Date(e.createAt),"yyyy-MM-dd HH:mm:ss"))+"] "),s("span",[t._v(t._s(e.content))])])]:t._e()}),t._v(" "),0!=t.message.length?s("a",{attrs:{href:"/user/receiveMsg"}},[t._v("查看全部")]):t._e()],2)])],1),t._v(" "),s("el-dropdown",{attrs:{trigger:"click",placement:"bottom-start"}},[s("el-badge",{staticClass:"icon",attrs:{value:t.notify.length,hidden:!t.notify.length}},[s("i",{staticClass:"my-icon my-icon-gonggao"})]),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("div",{staticClass:"dropdownBox"},[s("h4",[t._v(" "+t._s(0!=t.notify.length?"您有"+t.notify.length+"条未读公告":"暂无未读公告")+" ")]),t._v(" "),t._l(t.notify,function(e){return 0!=t.notify.length?[s("span",[t._v("["+t._s(t.formatDate(new Date(e.createAt),"yyyy-MM-dd HH:mm:ss"))+"] "),s("span",[t._v(t._s(e.annocementContent))])])]:t._e()}),t._v(" "),0!=t.notify.length?s("a",{attrs:{href:"/user/annocementLog"}},[t._v("查看全部")]):t._e()],2)])],1),t._v(" "),s("el-dropdown",{staticClass:"icon_me",attrs:{trigger:"click",placement:"bottom"}},[s("el-badge",{staticClass:"icon"},[s("i",{staticClass:"my-icon my-icon-iconuser"})]),t._v(" "),s("el-dropdown-menu",{staticClass:"userBox",attrs:{slot:"dropdown"},slot:"dropdown"},[[s("li",[t._v(t._s("用户 "+t.account))]),t._v(" "),s("li",{staticClass:"line"}),t._v(" "),s("li",[s("a",{attrs:{href:"/user/basicInfo"}},[t._v("基本信息")])]),t._v(" "),s("li",[s("a",{attrs:{href:"/user/setting"}},[t._v("安全设置")])]),t._v(" "),s("li",{staticClass:"line"}),t._v(" "),s("li",{on:{click:t.logOut}},[t._v("退出")])]],2)],1)],1)},staticRenderFns:[]};var i=s("VU/8")(a,o,!1,function(t){s("8423")},null,null);e.a=i.exports},bKyE:function(t,e,s){"use strict";var n=s("zL8q"),a={name:"menuNav",data:function(){return{uid:localStorage.uid,menus:[]}},created:function(){void 0===this.uid&&(Object(n.Message)({type:"warning",message:"登录信息已失效，请重新登录"}),setTimeOut(function(){location.href="/"},2e3)),this.$http.get("http://localhost:3000/menus?uid="+this.uid).then(function(t){this.menus=t.body},function(t){if(void 0===t.body.msg)var e="服务器正在维护，造成不便，请理解！";else e=t.body.msg;Object(n.Message)({type:"error",message:e})})},methods:{}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"menuNav"},[s("el-menu",{staticClass:"menu",attrs:{"unique-opened":!0,"background-color":"#222d32","text-color":"#fff","active-text-color":"#ffd04b"}},t._l(t.menus,function(e,n){return s("el-submenu",{key:n,attrs:{index:n+""}},[s("template",{slot:"title"},[s("i",{class:e.icon}),t._v(" "),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.menuName))])]),t._v(" "),t._l(e.childs,function(e,a){return s("el-menu-item",{key:a,attrs:{index:n+"-"+a}},[s("a",{attrs:{href:e.url}},[t._v(t._s(e.name))])])})],2)}))],1)},staticRenderFns:[]};var i=s("VU/8")(a,o,!1,function(t){s("j/pX")},null,null);e.a=i.exports},cF5e:function(t,e){},"j/pX":function(t,e){},m8fh:function(t,e){},tvR6:function(t,e){},wO26:function(t,e){}},["Ea02"]);
//# sourceMappingURL=manageFees.1514d51bed3ff64df37a.js.map
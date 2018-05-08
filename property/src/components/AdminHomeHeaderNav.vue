<template>
  <div class="adminHomeHeaderNav">
    <el-dropdown trigger="click" placement="bottom-start">
      <el-badge :value="message.complain + message.message" :hidden="message.complain + message.message == 0" class="icon">
        <i class="my-icon my-icon-3"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <div class="dropdownBox">
          <h4> {{ message.complain + message.message != 0 ? ('有未处理消息') : ('暂无消息')}} </h4>
          <span v-if="message.complain != 0"><a href="/admin/complainLogs">收到{{message.complain}}条投诉信息</a></span>
          <span v-if="message.message != 0"><a href="/admin/receiveMsgs">收到{{message.message}}条私发信息</a></span>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown trigger="click" placement="bottom-start">
      <el-badge :value="notify.repair + notify.userinfo" :hidden="notify.repair + notify.userinfo == 0" class="icon">
        <i class="my-icon my-icon-gonggao"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <div class="dropdownBox">
          <h4> {{notify.length != 0 ? ('有未处理通知') : ('暂无通知')}} </h4>
          <span v-if="notify.userinfo != 0"><a href="/admin/profiles">收到{{notify.userinfo}}条用户审核通知</a></span>
          <span v-if="notify.repair != 0"><a href="/admin/repairLogs">收到{{notify.repair}}条用户报修通知</a></span>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown trigger="click" placement="bottom" class="icon_me">
      <el-badge class="icon">
        <i class="my-icon my-icon-iconuser"></i>
      </el-badge>
      <el-dropdown-menu class="userBox" slot="dropdown">
        <template>
          <li>{{ '管理员 ' + account }}</li>
          <li class="line"></li>
          <li><a href="/admin/setting">安全设置</a></li>
          <li class="line"></li>
          <li @click="logOut">退出</li>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'adminHomeHeaderNav',
  data () {
    return {
      //uid: localStorage.uid,
      notify:[],
      message:[],
      account:''
    }
  },
  created(){
    this.$http.get('http://localhost:3000/admin/notify/notify').then(
      function(data){
        this.notify = data.body.results[0];
        this.account = data.body.account;
      },
      function(res){
        if(typeof(res.body.msg) == 'undefined'){
          var msg = '服务器正在维护，造成不便，请理解！';
        }else{
          var msg = res.body.msg;
        }
        Message({
          type:'error',
          message:msg
        });
      }
    );
    this.$http.get('http://localhost:3000/admin/notify/message').then(
      function(data){
        this.message = data.body.results[0];
      },
      function(res){
        if(typeof(res.body.msg) == 'undefined'){
          var msg = '服务器正在维护，造成不便，请理解！';
        }else{
          var msg = res.body.msg;
        }
        Message({
          type:'error',
          message:msg
        });
      }
    )
  },
  methods:{
    logOut(){
      this.$http.post('http://localhost:3000/logOut').then(
        function(data){
          location.href = data.body.url;
        },
        function(res){
          if(typeof(res.body.msg) == 'undefined'){
            var msg = '服务器正在维护，造成不便，请理解！';
          }else{
            var msg = res.body.msg;
          }
          Message({
            type:'error',
            message:msg
          });
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.adminHomeHeaderNav{
	width: 100%;
	height: 50px;
  background: #FFF;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
  -webkit-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
  -moz-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
  -o-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
}
.adminHomeHeaderNav .icon{
  margin: 0 10px;
}
.adminHomeHeaderNav .el-badge__content.is-fixed{
  top: 12px;
}
.adminHomeHeaderNav .el-badge__content{
  border: none;
}
.adminHomeHeaderNav .my-icon{
  font-size: 36px;
  color: #629aa9;
}
.adminHomeHeaderNav .icon_me{
  float: right;
  margin-right: 50px;
}
.userBox{
  width: 180px;
  list-style: none;
  padding: 5px 0;
}
.userBox li{
  padding-bottom: 0;
  font-size: 14px;
  padding: 0 15px;
  box-sizing: border-box;
  margin: 5px 0;
}
.userBox li > a{
  text-decoration: none;
  color: inherit;
}
.userBox li:hover{
  color: #0366d6;
  cursor: pointer;
}
.el-dropdown-menu > .line{
  height: 1px;
  margin: 8px 1px;
  background-color: #e1e4e8;
}
.dropdownBox{
  padding: 10px;
}
.dropdownBox > h4{
    text-align: center;
    margin: 0;
    margin-bottom: 15px;
    font-size: 16px;
}
.dropdownBox > span{
  display: block;
  width: 200px;
  font-size: 14px;
  margin-top: 5px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.dropdownBox > span a{
  color: orange;
  display: block;
  text-align: center
}
.adminHomeHeaderNav .el-dropdown{
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
}
</style>

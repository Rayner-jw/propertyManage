<template>
  <div class="homeHeaderNav">
    <el-dropdown trigger="click" placement="bottom-start">
      <el-badge :value="message.length" :hidden="!message.length" class="icon">
        <i class="my-icon my-icon-3"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <div class="dropdownBox">
          <h4> {{message.length != 0 ? ('您有'+message.length+'条未读消息') : ('暂无未读消息')}} </h4>
          <template v-if="message.length != 0" v-for="item in message">
            <span>[{{formatDate(new Date(item.createAt),'yyyy-MM-dd HH:mm:ss')}}] <span>{{item.content}}</span></span>
          </template>
          <a v-if="message.length != 0" href="/user/receiveMsg">查看全部</a>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown trigger="click" placement="bottom-start">
      <el-badge :value="notify.length" :hidden="!notify.length" class="icon">
        <i class="my-icon my-icon-gonggao"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <div class="dropdownBox">
          <h4> {{notify.length != 0 ? ('您有'+notify.length+'条未读公告') : ('暂无未读公告')}} </h4>
          <template v-if="notify.length != 0" v-for="item in notify">
            <span>[{{formatDate(new Date(item.createAt),'yyyy-MM-dd HH:mm:ss')}}] <span>{{item.annocementContent}}</span></span>
          </template>
          <a v-if="notify.length != 0" href="/user/annocementLog">查看全部</a>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown trigger="click" placement="bottom" class="icon_me">
      <el-badge class="icon">
        <i class="my-icon my-icon-iconuser"></i>
      </el-badge>
      <el-dropdown-menu class="userBox" slot="dropdown">
        <template>
          <li>{{ '用户 ' + account }}</li>
          <li class="line"></li>
          <li><a href="/user/basicInfo">基本信息</a></li>
          <li><a href="/user/setting">安全设置</a></li>
          <li class="line"></li>
          <li @click="logOut">退出</li>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'homeHeaderNav',
  data () {
    return {
      uid: localStorage.uid,
      notify:[],
      message:[],
      account:'',
      formatDate:formatDate
    }
  },
  created(){
    this.$http.get('http://localhost:3000/user/notify/notify?uid=' + this.uid).then(
      function(data){
        this.notify = data.body.results;
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
    this.$http.get('http://localhost:3000/user/notify/message?uid=' + this.uid).then(
      function(data){
        this.message = data.body.results;
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
.homeHeaderNav{
	width: 100%;
	height: 50px;
  background: #FFF;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
  -webkit-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
  -moz-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
  -o-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
}
.homeHeaderNav .icon{
  margin: 0 10px;
}
.homeHeaderNav .el-badge__content.is-fixed{
  top: 12px;
}
.homeHeaderNav .el-badge__content{
  border: none;
}
.homeHeaderNav .my-icon{
  font-size: 36px;
  color: #629aa9;
}
.homeHeaderNav .icon_me{
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
  min-width: 280px;
}
.dropdownBox > h4{
    text-align: center;
    margin: 0;
    margin-bottom: 15px;
    font-size: 14px;
}
.dropdownBox > span{
  display: block;
  width: 300px;
  font-size: 12px;
  margin-top: 5px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.dropdownBox > a{
  display: block;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  text-decoration: none;
  color: #999;
}
.homeHeaderNav .el-dropdown{
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
}
</style>

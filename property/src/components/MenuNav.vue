<template>
  <div class="menuNav">
    <el-menu
      class="menu"
      :unique-opened="true"
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu v-for='(itemP,indexP) in menus' :key="indexP" :index="indexP+''">
        <template slot="title">
          <i :class="itemP.icon"></i>
          <span slot="title">{{itemP.menuName}}</span>
        </template>
        <el-menu-item v-for='(itemC,indexC) in itemP.childs' :key="indexC" :index="indexP+'-'+indexC">
          <a :href="itemC.url">{{itemC.name}}</a>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'menuNav',
  data () {
    return {
      uid: localStorage.uid,
      menus:[]
    }
  },
  created (){
    if(typeof this.uid == 'undefined'){
      Message({
        type:'warning',
        message:'登录信息已失效，请重新登录'
      });
      setTimeOut(function(){
        location.href = '/';
      },2000)
    }
    this.$http.get('http://localhost:3000/menus?uid='+this.uid).then(
      function(data){
        this.menus = data.body;
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.menuNav{
	width: 100%;
  height: 100%;
}
.menuNav .menu{
  width: 200px;
}
.menuNav .el-menu{
  border: none;
  height: 100%;
}
.menu a{
  color: inherit;
  text-decoration-line: none;
}
</style>

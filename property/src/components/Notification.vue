<template>
  <div class="notification wrap">
    <span class="title">最新公告</span>
    <div class="main">
      <template v-if="notice.length > 0" v-for="item in notice">
        <section class="notify">
          <h3>{{item.annocementType}}</h3>
          <p><span style="color:#ffb22b"> {{item.isread == 'n' ? ('[未读]') : ('[已读]')}} </span>{{item.annocementContent}}</p>
          <span class="info"><time>{{ formatDate(new Date(item.createAt),'yyyy-MM-dd') }}</time> --- JW物业处</span>
        </section>
      </template>
      <el-button style="width:100%" type="text" size="small"><a href="/user/annocementLog">查看更多</a></el-button>
      <h3 v-if="notice.length == 0">暂无最新公告</h3>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'notification',
  data () {
    return {
      uid: localStorage.uid,
      notice:[],
      formatDate:formatDate
    }
  },
  created (){
    this.$http.get('http://localhost:3000/user/annocement?uid=' + this.uid).then(
      function(data){
        this.notice = data.body.results;
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
.wrap{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.wrap .title{
  color: #629aa9;
  font-size: 24px;
}
.notification .main{
  margin-top: 10px
}
.notification .notify{
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px 20px;
  min-height: 80px;
  background: #ffffff;
}
.notification .notify .info{
  font-size: 12px;
  color: #aaa;
}
.notification .main > h3{
  text-align:center;
  width: 80%;
  margin: 0 auto;
  margin-top: 100px;
  color: orange;
}
</style>

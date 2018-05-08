<template>
  <div class="repairProcess">
    <span class="title">报修情况</span>
    <div class="main">
      <h3 v-if="allRepair.length == 0">报修已完成，没有需要处理的报修</h3>
      <template v-else>
        <div v-for="(item,index) in repairs" class="step">
          <el-button class="cancel" size="small" type="text" @click="cancelEvt(item,index)">取消</el-button>
          <span>[{{item.repairType}}] </span><span>{{item.repairContent}}</span>
          <el-steps :active="item.repairProcess">
            <el-step title="申请成功" description="报修申请已发起，请等待JW物业处确认"></el-step>
            <el-step title="维修中" description="已确认报修申请，维修人员正在进行维修"></el-step>
            <el-step title="维修完成"></el-step>
          </el-steps>
        </div>
        <el-button style="width:100%" type="text" size="small" @click="seeMoreEvt" v-html="seeMore"></el-button>
      </template>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
export default {
  name: 'repairProcess',
  data () {
    return {
      uid: localStorage.uid,
      repairs:[],
      allRepair:[],
      seeMore:'查看更多',
      isSee:false
    }
  },
  created (){
    this.$http.get('http://localhost:3000/user/repairApi?uid=' + this.uid).then(
      function(data){
        this.allRepair = data.body;
        if(this.allRepair.length >= 2){
          this.repairs = this.allRepair.slice(0,2);
        }else{
          this.repairs = this.allRepair;
        }
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
    cancelEvt (item,i){
      if(Number(item.repairProcess) == 1) {
        Message({
          type:'warning',
          message:'维修工作已在进行，无法取消'
        });
      }else{
        MessageBox.confirm('取消后JW物业处将无法收到此报修申请，是否确定取消', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirmCancel(item.repairId,i);
        }).catch(() => {
        });
      }
    },
    confirmCancel (repairId,i){
      this.$http.get('http://localhost:3000/user/repairApi?repairId=' + repairId).then(
        function(data){
          this.allRepair.splice(i,1);
          if(this.isSee == false){
            this.repairs.splice(i,1);
          }else{
            this.repairs = this.allRepair;
          }
          Message({
            type:'success',
            message:'已取消申请'
          });
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
    seeMoreEvt(){
      this.repairs = this.allRepair;
      this.seeMore = '这回真的没了';
      this.isSee = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.repairProcess{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.repairProcess .title{
  color: #629aa9;
  font-size: 24px;
}
.repairProcess .main{
  width: 80%;
  height: 60%;
  margin: 0 auto;
  margin-top: 10px;
}
.repairProcess .main h3{
  margin-top: 100px;
  color: orange;
  text-align: center;
}
.repairProcess .main .step{
  margin-bottom: 20px;
  padding: 10px;
  min-height: 80px;
  background: #ffffff;
  position: relative;
}
.repairProcess .main .step .cancel{
  position: absolute;
  top: 5px;
  right: 10px;
  font-weight: normal;
}
.repairProcess .main .step > span{
  font-size: small;
  font-weight: bold;
}
.repairProcess .main .el-steps{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.repairProcess .el-step.is-horizontal{
  color: orange;
}
.repairProcess .el-step__title.is-process{
  color: inherit;
}
.repairProcess .el-step__description.is-process{
  color: inherit;
}
.repairProcess .el-step__head.is-process {
    color: inherit;
    border-color: inherit;
}
</style>

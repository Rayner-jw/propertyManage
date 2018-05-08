<template>
  <div class="manageFees">
    <span class="title">物业管理费</span>
    <div class="fees">
      <el-alert
        title="缴费须知"
        type="warning"
        description="物业管理费包含了公共部位维修费、管理费、电梯运行维护费、水泵运行维护费、小区公用设施维修费 、绿化费、保安费、保洁费、电梯代验费、消防监控费、智能监控费、可视对讲系统、化粪池清掏费、利润、税金、光缆入网费、收视费、各项费用统收服务费、生活垃圾清运费。如有疑问，请致电JW物业处---电话100 1000 1100"
        :closable="false">
      </el-alert>
      <el-table :data="tableData" align="center" width="100%">
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column align="center" prop="theYear" label="年度" min-width="180"></el-table-column>
        <!-- <el-table-column align="center" prop="name" label="业主" min-width="80"></el-table-column> -->
        <el-table-column align="center" prop="costPerSquare" label="总费用" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.costPerSquare*scope.row.square}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="缴费状态" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.status == 1 ? ('已缴费') : ('未交费')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="80">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.status == 1" @click="handleClick(scope.row,scope.$index)" type="primary" size="mini">缴费</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width:100%" type="text" size="small" @click="seeMoreEvt" v-html="seeMore"></el-button>
    </div>

  </div>
</template>

<script>
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'manageFees',
  data () {
    return {
      uid: localStorage.uid,
      tableData:[],
      seeMore:'查看更多...'
    }
  },
  created (){
    this.$http.get('http://localhost:3000/user/payment?accountId=' + this.uid).then(
      function(data){
        this.tableData = data.body.results;
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
    handleClick (item,index){
      MessageBox.confirm('是否确定缴纳该年度管理费', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.pay(item,index);
      }).catch(() => {
      });
    },
    pay (item,index){
      var para = {
        accountId : this.uid,
        launchFeeId : item.launchFeeId,
        totalFee : item.square * item.costPerSquare,
        payTime : formatDate(new Date(),'yyyy-MM-dd HH:mm:ss')
      }
      this.$http.put('http://localhost:3000/user/payment', para).then(
        function(data){
          Message({
            type:'success',
            message:data.body.msg
          });
          var a = this.tableData[index];
          a.status = 1;
          this.tableData.splice(index,1,a);
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
    seeMoreEvt (){
      if(this.seeMore == '这回真的没有了'){
        return
      }
      this.$http.post('http://localhost:3000/user/payment?accountId=' + this.uid).then(
        function(data){
          this.tableData = data.body.results;
          this.seeMore = '这回真的没有了'
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.manageFees{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.manageFees .title{
  color: #629aa9;
  font-size: 24px;
}
.manageFees .fees{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>

<template>
  <div class="repairLog">
    <span class="title">报修记录</span>
    <div class="main">
      <h3 v-if="tableData.length == 0">暂无报修记录</h3>
      <template v-else>
        <el-table :data="tableData" align="center" width="100%">
          <el-table-column align="center" type="index" width="50"></el-table-column>
          <el-table-column align="center" prop="repairProcess" label="状态" min-width="80">
            <template slot-scope="scope">
              <span>{{scope.row.repairProcess == '0' ? ('已申请') : scope.row.repairProcess == '1' ? ('维修中') : scope.row.repairProcess == '2' ? ('已完成') : ('已取消')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="repairType" label="类型" min-width="100"></el-table-column>
          <el-table-column align="center" prop="applicantPhone" label="联系电话" min-width="100"></el-table-column>
          <el-table-column align="center" prop="applicantAddress" label="维修地点" min-width="100"></el-table-column>
          <el-table-column align="center" label="时间" min-width="100">
            <template slot-scope="scope">
              <span>{{ formatDate(new Date(scope.row.applicantTime),'yyyy-MM-dd HH:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="repairContent" label="内容" min-width="100"></el-table-column>
          <el-table-column align="center" label="" min-width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="delEvt(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin: 10px 0 20px 0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </template>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'repairLog',
  data () {
    return {
      uid: localStorage.uid,
      tableData:[],
      currentPage:1,
      pageSize:5,
      total:0,
      formatDate:formatDate
    }
  },
  created (){
    this.pageEvent();
  },
  methods:{
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageEvent();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageEvent();
    },
    pageEvent (){
      var para = {
        pageSize : this.pageSize,
        currentPage : this.currentPage,
        uid : this.uid
      }
      this.$http.post('http://localhost:3000/user/repairApi',para).then(
        function(data){
          this.tableData = data.body.results;
          if(typeof(data.body.total) != 'undefined'){
            this.total = data.body.total;
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
    delEvt (item,i){
      if(Number(item.repairProcess) == 1) {
        Message({
          type:'warning',
          message:'维修工作已在进行，无法删除'
        });
      }else{
        MessageBox.confirm('删除后将无此条数据，是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirmDel(item.repairId,i);
        }).catch(() => {
        });
      }
    },
    confirmDel (repairId,i){
      this.$http.delete('http://localhost:3000/user/repairApi?repairId=' + repairId).then(
        function(data){
          this.tableData.splice(i,1);
          Message({
            type:'success',
            message:'已删除记录'
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.repairLog{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.repairLog .title{
  color: #629aa9;
  font-size: 24px;
}
.repairLog .main{
  width: 80%;
  height: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.repairLog .main h3{
  margin-top: 100px;
  color: orange;
  text-align: center;
}
</style>

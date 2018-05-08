<template>
  <div class="complainLog">
    <span class="title">投诉记录</span>
    <div class="main">
      <h3 v-if="tableData.length == 0">暂无投诉记录</h3>
      <template v-else>
        <el-table :data="tableData" align="center" width="100%">
          <el-table-column align="center" type="index" width="50"></el-table-column>
          <el-table-column align="center" prop="complainType" label="类型" min-width="100"></el-table-column>
          <el-table-column align="center" prop="complainBy" label="投诉人" min-width="80"></el-table-column>
          <el-table-column align="center" label="时间" min-width="100">
            <template slot-scope="scope">
              <span>{{ formatDate(new Date(scope.row.complainTime),'yyyy-MM-dd HH:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="complainContent" label="内容" min-width="100"></el-table-column>
          <!-- <el-table-column align="center" label="" min-width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="delEvt(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column> -->
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
  name: 'complainLog',
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
      this.$http.post('http://localhost:3000/user/complain',para).then(
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
    // delEvt (item,i){
    //   if(Number(item.complainProcess) == 1) {
    //     Message({
    //       type:'warning',
    //       message:'维修工作已在进行，无法删除'
    //     });
    //   }else{
    //     MessageBox.confirm('删除后将无此条数据，是否确定删除', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.confirmDel(item.complainId,i);
    //     }).catch(() => {
    //     });
    //   }
    // },
    // confirmDel (complainId,i){
    //   this.$http.delete('http://localhost:3000/complain?complainId=' + complainId).then(
    //     function(data){
    //       this.tableData.splice(i,1);
    //       Message({
    //         type:'success',
    //         message:'已删除记录'
    //       });
    //     },
    //     function(res){
    //       if(typeof(res.body.msg) == 'undefined'){
    //         var msg = '服务器正在维护，造成不便，请理解！';
    //       }else{
    //         var msg = res.body.msg;
    //       }
    //       Message({
    //         type:'error',
    //         message:msg
    //       });
    //     }
    //   )
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.complainLog{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.complainLog .title{
  color: #629aa9;
  font-size: 24px;
}
.complainLog .main{
  width: 80%;
  height: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.complainLog .main h3{
  margin-top: 100px;
  color: orange;
  text-align: center;
}
</style>

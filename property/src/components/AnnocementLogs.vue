<template>
  <div class="annocementLogs">
    <span class="title">公告记录</span>
    <div class="main">
      <div style="margin-bottom:10px">
        <el-button size="small" type="primary" @click="dialogTableVisible = true">查询</el-button>
        <el-breadcrumb separator="+">
          <el-breadcrumb-item v-for="(item,index) in searchs" :key="index+''">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="tableData" align="center" width="100%">
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column align="center" prop="annocementType" label="公告类型" min-width="100"></el-table-column>
        <el-table-column align="center" prop="readNumber" label="阅读用户量" min-width="100"></el-table-column>
        <el-table-column align="center" prop="annocementContent" label="内容" min-width="100"></el-table-column>
        <el-table-column align="center" label="时间" min-width="100">
          <template slot-scope="scope">
            <span>{{ formatDate(new Date(scope.row.createAt),'yyyy-MM-dd HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" min-width="60">
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
    </div>
    <el-dialog title="查询条件" :visible.sync="dialogTableVisible">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="公告类型">
          <el-select v-model="formInline.annocementType" placeholder="">
            <el-option label="" value=""></el-option>
            <el-option label="小区" value="小区"></el-option>
            <el-option label="投诉" value="投诉"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'annocementLogs',
  data () {
    return {
      tableData:[],
      currentPage:1,
      pageSize:5,
      total:0,
      formatDate:formatDate,
      formInline:{},
      paras:{},
      searchs:[],
      dialogTableVisible:false
    }
  },
  created (){
    this.pageEvent();
  },
  methods:{
    search (){
      this.dialogTableVisible = false;
      //添加查询面包屑
      this.searchs = [];
      for(var item in this.formInline){
        if(this.formInline[item] != ''){
          this.searchs.push(this.formInline[item]);
        }
      }
      this.paras = JSON.parse(JSON.stringify(this.formInline));
      this.pageEvent(this.paras);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageEvent(this.paras);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageEvent(this.paras);
    },
    pageEvent (a){
      if( typeof(a) == 'undefined' ){
        a = {}
      }
      var para = {
        pageSize : this.pageSize,
        currentPage : this.currentPage,
        searchs : a
      }
      this.$http.post('http://localhost:3000/admin/annocement',para).then(
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
      MessageBox.confirm('删除后用户将看不到该条公告，是否确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmDel(item.annocementId,i);
      }).catch(() => {
      });
    },
    confirmDel (annocementId,i){
      this.$http.delete('http://localhost:3000/admin/annocement?annocementId=' + annocementId).then(
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
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.annocementLogs{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.annocementLogs .title{
  color: #629aa9;
  font-size: 24px;
}
.annocementLogs .main{
  width: 80%;
  height: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.annocementLogs .main .expandDiv{
  width: 80%;
  margin: 0 auto;
}
.annocementLogs .main .expandMain > span{
  display: inline-block;
  margin-right: 20px;
}
.annocementLogs .main .expandDiv h3{
  margin-top: 0;
}
.annocementLogs .main .expandDiv p{
  text-align: center;
  margin-bottom: 50px;
}
.annocementLogs .el-button--small{
  padding: 7px 15px;
  margin-right: 10px;
}
.annocementLogs .el-breadcrumb{
  display: inline-block;
}
.annocementLogs .el-breadcrumb__inner{
  font-weight: normal;
  color: #606266;
}
</style>

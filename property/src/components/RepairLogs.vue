<template>
  <div class="repairLogs">
    <span class="title">住户报修记录</span>
    <div class="main">
      <div style="margin-bottom:10px">
        <el-button size="small" type="primary" @click="dialogTableVisible = true">查询</el-button>
        <el-breadcrumb separator="+">
          <el-breadcrumb-item v-for="(item,index) in searchs" :key="index+''">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="tableData" align="center" width="100%">
        <el-table-column type="expand" width="50">
          <template slot-scope="scope">
            <div class="expandDiv">
                <h3>
                  <span>[{{scope.row.repairType}}]</span>
                  <span>{{scope.row.repairProcess == '0' ? ('未处理') : scope.row.repairProcess == '1' ? ('维修中') : scope.row.repairProcess == '2' ? ('已完成') : ('已取消')}}</span>
                </h3>
                <div class="expandMain">
                  <span>{{formatDate(new Date(scope.row.applicantTime),'yyyy-MM-dd HH:mm:ss')}}</span>
                  <span>地点：{{scope.row.applicantAddress}}</span>
                  <span>联系电话：{{scope.row.applicantPhone}}</span>
                </div>
                <hr>
                <p>{{scope.row.repairContent}}</p>
                <el-button v-if="scope.row.repairProcess == '0'" type="primary" size="small" @click="repairEvt(scope.row,scope.$index)">处理报修</el-button>
                <div class="expandMain" v-else-if="scope.row.repairProcess == '1' || scope.row.repairProcess == '2'">
                  <span>维修人员：{{scope.row.repairBy}}</span>
                  <el-button v-if="scope.row.repairProcess == '1'" type="primary" size="small" @click="finishEvt(scope.row,scope.$index)">确认完成</el-button>
                  <span v-if="scope.row.repairProcess == '2'">完成时间：{{ formatDate(new Date(scope.row.finishTime),'yyyy-MM-dd HH:mm:ss') }}</span>
                </div>
                <span v-else>业主取消了该次报修</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column align="center" prop="repairProcess" label="状态" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.repairProcess == '0' ? ('未处理') : scope.row.repairProcess == '1' ? ('维修中') : scope.row.repairProcess == '2' ? ('已完成') : ('已取消')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="repairType" label="类型" min-width="100"></el-table-column>
        <!-- <el-table-column align="center" prop="applicant" label="申请人" min-width="80"></el-table-column> -->
        <el-table-column align="center" prop="applicantPhone" label="联系电话" min-width="100"></el-table-column>
        <el-table-column align="center" prop="applicantAddress" label="维修地点" min-width="100"></el-table-column>
        <el-table-column align="center" label="时间" min-width="100">
          <template slot-scope="scope">
            <span>{{ formatDate(new Date(scope.row.applicantTime),'yyyy-MM-dd HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="repairContent" label="内容" min-width="100"></el-table-column>
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
        <el-form-item label="报修人">
          <el-input v-model="formInline.applicant" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select v-model="formInline.repairProcess" placeholder="">
            <el-option label="" value=""></el-option>
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="维修中" value="维修中"></el-option>
            <el-option label="未处理" value="未处理"></el-option>
            <el-option label="已取消" value="已取消"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formInline.repairType" placeholder="">
            <el-option label="" value=""></el-option>
            <el-option label="自家" value="自家"></el-option>
            <el-option label="公共" value="公共"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="处理报修" :visible.sync="dealWithRepair">
      <el-form :inline="true">
        <el-form-item label="维修人员">
          <el-input v-model="repairBy" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dealWith(repairId,curIndex)">确定</el-button>
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
  name: 'repairLogs',
  data () {
    return {
      uid: localStorage.uid,
      tableData:[],
      currentPage:1,
      pageSize:5,
      total:0,
      formatDate:formatDate,
      formInline:{},
      paras:{},
      searchs:[],
      dialogTableVisible:false,
      dealWithRepair:false,
      repairBy:'',
      repairId:'',
      curIndex:''
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
      if(typeof(this.formInline.repairProcess) != 'undefined' && this.formInline.repairProcess != ''){
        if(this.formInline.repairProcess == '未处理'){
          this.paras.repairProcess = 0;
        }else if(this.formInline.repairProcess == '维修中'){
          this.paras.repairProcess = 1;
        }else if(this.formInline.repairProcess == '已完成'){
          this.paras.repairProcess = 2;
        }else{
          this.paras.repairProcess = 3;
        }
      }
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
      this.$http.post('http://localhost:3000/admin/repairs',para).then(
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
      this.$http.delete('http://localhost:3000/admin/repairs?repairId=' + repairId).then(
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
    repairEvt(item,i){
      this.dealWithRepair = true;
      this.repairId = item.repairId;
      this.curIndex = i;
    },
    dealWith(repairId,i,ar3){
      var para = {
        repairId:repairId,
        repairBy:this.repairBy
      },
      replace = JSON.parse(JSON.stringify(this.tableData[i]));
      if(typeof(ar3) != 'undefined'){
        delete para.repairBy;
        this.finishTime = formatDate(new Date(),'yyyy-MM-dd HH:mm:ss');
        para.finishTime = this.finishTime;
        replace.finishTime = this.finishTime;
        replace.repairProcess = 2;
      }else{
        replace.repairBy = this.repairBy;
        replace.repairProcess = 1;
      }
      this.dealWithRepair = false;
      this.$http.put('http://localhost:3000/admin/repairs',para).then(
        function(data){
          this.tableData.splice(i,1,replace);
          Message({
            type:'success',
            message:data.body.msg
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
    finishEvt(item,i){
      MessageBox.confirm('请确定维修是否完成', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dealWith(item.repairId,i,'ar3');
      }).catch(() => {
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.repairLogs{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.repairLogs .title{
  color: #629aa9;
  font-size: 24px;
}
.repairLogs .main{
  width: 80%;
  height: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.repairLogs .main .expandDiv{
  width: 80%;
  margin: 0 auto;
}
.repairLogs .main .expandMain > span{
  display: inline-block;
  margin-right: 20px;
}
.repairLogs .main .expandDiv h3{
  margin-top: 0;
}
.repairLogs .main .expandDiv p{
  text-align: center;
  margin-bottom: 50px;
}
.repairLogs .el-button--small{
  padding: 7px 15px;
  margin-right: 10px;
}
.repairLogs .el-breadcrumb{
  display: inline-block;
}
.repairLogs .el-breadcrumb__inner{
  font-weight: normal;
  color: #606266;
}
</style>

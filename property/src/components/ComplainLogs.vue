<template>
  <div class="complainLogs">
    <span class="title">业主投诉记录</span>
    <div class="main">
        <div style="margin-bottom:10px">
          <el-button size="small" type="primary" @click="dialogTableVisible = true">查询</el-button>
          <el-breadcrumb separator="+">
            <el-breadcrumb-item v-for="(item,index) in searchs" :key="index+''">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table :data="tableData" highlight-current-row @row-click="handleCurrent"  align="center" width="100%">
          <el-table-column align="center" type="index" width="50"></el-table-column>
          <el-table-column align="center" prop="adminIsRead" label="" min-width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.adminIsRead == 0 ? ('未读') : ('已读') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.status == 0 ? ('未处理') : ('已处理') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="statusResult" label="标记" min-width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.statusResult == 1 ? ('采纳') : scope.row.statusResult == 2 ? ('无意义') : scope.row.statusResult == 3 ? ('警告') : ('无') }}</span>
            </template>
          </el-table-column>
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
    </div>
    <el-dialog title="查询条件" :visible.sync="dialogTableVisible">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="投诉人">
          <el-input v-model="formInline.complainBy" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="阅读状态">
          <el-select v-model="formInline.adminIsRead" placeholder="">
            <el-option label="" value=""></el-option>
            <el-option label="已读" value="已读"></el-option>
            <el-option label="未读" value="未读"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select v-model="formInline.status" placeholder="">
            <el-option label="" value=""></el-option>
            <el-option label="已处理" value="已处理"></el-option>
            <el-option label="未处理" value="未处理"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投诉类型">
          <el-select v-model="formInline.complainType" placeholder="">
            <el-option label="" value=""></el-option>
            <el-option label="过道" value="过道"></el-option>
            <el-option label="过道s" value="过道s"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog center title="投诉内容" :before-close="handleClose" :visible.sync="readBox">
      <div class="readDiv">
          <h3>
            <span>[{{readContent.complainType}}]</span>
            <span>{{readContent.status == '0' ? ('未处理') : ('已处理')}}</span>
          </h3>
          <div class="readMain">
            <span>{{formatDate(new Date(readContent.complainTime),'yyyy-MM-dd HH:mm:ss')}}</span>
            <span>投诉人：{{readContent.complainBy}}</span>
          </div>
          <hr>
          <p>{{readContent.complainContent}}</p>
          <el-button-group v-if="readContent.status == 0">
            <el-button type="primary" size="small" @click="dealWithEvt(readContent.complainId,1)">接纳</el-button>
            <el-button type="info" size="small" @click="dealWithEvt(readContent.complainId,2)">无意义</el-button>
            <el-button type="danger" size="small" @click="dealWithEvt(readContent.complainId,3)">警告</el-button>
          </el-button-group>
          <template v-else>
            <el-tag v-if="readContent.statusResult == 1" type="primary">接纳了投诉意见并处理</el-tag>
            <el-tag v-if="readContent.statusResult == 2" type="info">该投诉无意义</el-tag>
            <el-tag v-if="readContent.statusResult == 3" type="danger">警告了该此恶劣投诉</el-tag>
          </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'complainLogs',
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
      readBox:false,
      readContent:{},
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
      if(typeof(this.formInline.adminIsRead) != 'undefined' && this.formInline.adminIsRead != ''){
        if(this.formInline.adminIsRead == '未读'){
          this.paras.adminIsRead = 0;
        }else{
          this.paras.adminIsRead = 1;
        }
      }
      if(typeof(this.formInline.status) != 'undefined' && this.formInline.status != ''){
        if(this.formInline.status == '未处理'){
          this.paras.status = 0;
        }else{
          this.paras.status = 1;
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
      this.$http.post('http://localhost:3000/admin/complains',para).then(
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
    handleCurrent(row) {
      this.readBox = true;
      this.readContent = row;
      this.tableData.forEach((item,index) => {
        if(item.complainId == row.complainId){
          this.curIndex = index;
        }
      })
      //未读则更新 已读
      if(row.adminIsRead == 0){
        this.$http.get('http://localhost:3000/admin/complains?complainId=' + row.complainId).then(
          function(data){
            console.log(data);
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
    },
    handleClose(done) {
        done();
        this.readContent.adminIsRead = 1;
        this.tableData.splice(this.curIndex,1,this.readContent);
    },
    dealWithEvt(complainId,n){
      var para = {
        complainId:complainId,
        statusResult:n
      }
      this.$http.put('http://localhost:3000/admin/complains',para).then(
        function(data){
          this.readContent.status = 1;
          this.readContent.statusResult = n;
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
    }
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
.complainLogs{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.complainLogs .title{
  color: #629aa9;
  font-size: 24px;
}
.complainLogs .main{
  width: 80%;
  height: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.complainLogs .main h3{
  margin-top: 100px;
  color: orange;
  text-align: center;
}
.complainLogs .readDiv{
  width: 80%;
  margin: 0 auto;
}
.complainLogs .readMain > span{
  display: inline-block;
  margin-right: 20px;
}
.complainLogs .readDiv h3{
  margin-top: 0;
}
.complainLogs .readDiv p{
  text-align: center;
  margin-bottom: 100px;
}
.complainLogs .el-button--small{
  padding: 7px 15px;
  margin-right: 10px;
}
.complainLogs .el-breadcrumb{
  display: inline-block;
}
.complainLogs .el-breadcrumb__inner{
  font-weight: normal;
  color: #606266;
}

</style>

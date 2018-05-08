<template>
  <div class="profiles">
    <span class="title">住户资料</span>
    <div class="main">
      <div style="margin-bottom:10px">
        <el-button size="small" type="primary" @click="dialogTableVisible = true">查询</el-button>
        <el-breadcrumb separator="+">
          <el-breadcrumb-item v-for="(item,index) in searchs" :key="index+''">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="tableData" align="center" width="100%">
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column align="center" label="状态" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.userStatus == 0 ? ('不通过') : scope.row.userStatus == 2 ? ('待审核') : scope.row.userStatus == 3 ? ('通过') : ('') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="业主" min-width="100"></el-table-column>
        <el-table-column align="center" prop="userPhone" label="联系电话" min-width="100"></el-table-column>
        <el-table-column align="center" prop="idCard" label="身份证" min-width="100"></el-table-column>
        <el-table-column align="center" prop="buildingName" label="楼座" min-width="80"></el-table-column>
        <el-table-column align="center" label="房号" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.houseLayer != null">{{ scope.row.houseLayer + ' - ' + scope.row.houseNumber  }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="入住时间" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.check_in_time != null ? (formatDate(new Date(scope.row.check_in_time),'yyyy-MM-dd')) : ('') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核" min-width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" :disabled="scope.row.userStatus != 2" @click="pass(scope.row,scope.$index)">通过</el-button>
            <el-button type="text" size="small" :disabled="scope.row.userStatus != 2" @click="notPass(scope.row,scope.$index)">不通过</el-button>
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
        <el-form-item label="业主">
          <el-input v-model="formInline.userName" placeholder="业主"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.userStatus" placeholder="状态">
            <el-option label="" value=""></el-option>
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="通过" value="通过"></el-option>
            <el-option label="不通过" value="不通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="录入信息" :visible.sync="passBox">
      <el-form :inline="true" :model="objCont" :rules="rules" ref="ruleForm">
        <el-form-item label="楼座名" prop="buildingName">
          <el-select v-model="objCont.buildingName" placeholder="请选择">
            <el-option
              v-for="item in buildingNames"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
  		  </el-form-item>
        <el-form-item label="楼层号" prop="houseLayer">
          <el-select v-model="objCont.houseLayer" placeholder="请选择">
            <el-option
              v-for="item in houseLayers"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
  		  </el-form-item>
        <el-form-item label="楼房号" prop="houseNumber">
          <el-select v-model="objCont.houseNumber" placeholder="请选择">
            <el-option
              v-for="item in houseNumbers"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
  		  </el-form-item>
        <el-form-item label="入住日期" prop="check_in_time">
          <el-date-picker
            v-model="objCont.check_in_time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="passSure">确认</el-button>
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
  name: 'profiles',
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
      dialogTableVisible:false,
      passBox:false,
      curIndex:'',
      objCont:{},
      rules:{
				buildingName: [
					{ required: true, message: '请选择楼座名', trigger: 'change' }
				],
        houseLayer: [
          { required: true, message: '请选择楼层号', trigger: 'change' }
        ],
				houseNumber: [
					{ required: true, message: '请选择楼房号', trigger: 'change' }
				],
        check_in_time:[
          { required: true, message: '请选择入住时间', trigger: 'change' }
        ]
      },
      buildingNames:[],
      houseLayers:[],
      houseNumbers:[]
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
      if(typeof(this.formInline.userStatus) != 'undefined' && this.formInline.userStatus != ''){
        if(this.formInline.userStatus == '不通过'){
          this.paras.userStatus = 0;
        }else if(this.formInline.userStatus == '待审核'){
          this.paras.userStatus = 2;
        }else if(this.formInline.userStatus == '通过'){
          this.paras.userStatus = 3;
        }else{
          this.paras.userStatus = 1;
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
      this.$http.post('http://localhost:3000/admin/profilesApi',para).then(
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
    pass(item,i){
      this.objCont = {}
      this.passBox = true;
      this.curIndex = i;
      if(this.buildingNames.length != 0){
        return false;
      }
      //获取楼房
      this.$http.get('http://localhost:3000/admin/houseInfoApi').then(
        function(data){
          this.buildingNames = data.body.buildingNames;
          this.houseLayers = data.body.houseLayers;
          this.houseNumbers = data.body.houseNumbers;
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
    passSure(){
      this.objCont.uid = this.tableData[this.curIndex].id;
      this.objCont.check_in_time = formatDate(this.objCont.check_in_time,'yyyy-MM-dd');
      this.$http.put('http://localhost:3000/admin/profilesApi', this.objCont).then(
        function(data){
          var two = Object.assign(this.tableData[this.curIndex],this.objCont);
          two.userStatus = 3;
          this.tableData.splice(this.curIndex,1,two);
          this.passBox = false;
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
    notPass(item,i){
      this.$http.get('http://localhost:3000/admin/profilesApi?uid=' + item.id).then(
        function(data){
          var two = this.tableData[i];
          two.userStatus = 0;
          this.tableData.splice(i,1,two);
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
        MessageBox.confirm('删除后将注销该用户，是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirmDel(item.id,i);
        }).catch(() => {
        });
    },
    confirmDel (id,i){
      this.$http.delete('http://localhost:3000/admin/profilesApi?uid=' + id).then(
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
.profiles{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.profiles .title{
  color: #629aa9;
  font-size: 24px;
}
.profiles .main{
  width: 80%;
  height: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.profiles .main h3{
  margin-top: 100px;
  color: orange;
  text-align: center;
}
.profiles .el-breadcrumb{
  display: inline-block;
}
.profiles .el-breadcrumb__inner{
  font-weight: normal;
  color: #606266;
}
</style>

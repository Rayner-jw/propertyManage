<template>
  <div class="payment">
    <span class="title">缴费情况</span>
    <div class="main">
        <div style="margin-bottom:10px">
          <el-button size="small" type="primary" @click="dialogTableVisible = true">查询</el-button>
          <el-breadcrumb separator="+">
            <el-breadcrumb-item v-for="(item,index) in searchs" :key="index+''">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table :data="tableData"  align="center" width="100%">
          <el-table-column align="center" type="index" width="50"></el-table-column>
          <el-table-column align="center" label="年度" min-width="100">
            <template slot-scope="scope">
              <span>{{ theYear }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="" min-width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.buildingName + ' ' + scope.row.houseLayer + '-' + scope.row.houseNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="square" label="房屋大小" min-width="80"></el-table-column>
          <el-table-column align="center" label="单位价格" min-width="80">
            <template slot-scope="scope">
              <span>{{ costPerSquare }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="totalFee" label="总费用" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.square*costPerSquare }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="状态" min-width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.status == 0 ? ('未缴费') : ('已缴费') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small" :disabled="scope.row.status != 0" @click="notify(scope.row,scope.$index)">通知</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="缴费时间" min-width="100">
            <template slot-scope="scope">
              <span>{{ formatDate(new Date(scope.row.payTime),'yyyy-MM-dd HH:mm:ss') }}</span>
            </template>
          </el-table-column> -->
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
        <el-form-item label="年度" prop="theYear">
          <el-date-picker
            v-model="formInline.theYear"
            :editable="false"
            :clearable="false"
            type="year"
            placeholder="">
          </el-date-picker>
  		  </el-form-item>
        <el-form-item label="缴费状态">
          <el-select v-model="formInline.status" placeholder="">
            <el-option label="" value=""></el-option>
            <el-option label="已缴" value="已缴"></el-option>
            <el-option label="未缴" value="未缴"></el-option>
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
  name: 'payment',
  data () {
    return {
      tableData:[],
      currentPage:1,
      pageSize:5,
      total:0,
      formatDate:formatDate,
      dialogTableVisible:false,
      formInline:{
        theYear:formatDate(new Date(),'yyyy')
      },
      paras:{},
      searchs:[],
      costPerSquare:1
    }
  },
  created (){
    this.searchs.push(this.formInline.theYear);
    this.paras = this.formInline;
    this.pageEvent(this.formInline);
  },
  methods:{
    search (){
      this.dialogTableVisible = false;
      this.searchs = [];
      this.paras = JSON.parse(JSON.stringify(this.formInline));
      this.paras.theYear = formatDate(new Date(this.paras.theYear),'yyyy');
      //添加查询面包屑
      for(var item in this.paras){
        if(this.paras[item] != ''){
          this.searchs.push(this.paras[item]);
        }
      }
      if(typeof(this.paras.status) != 'undefined' && this.paras.status != ''){
        if(this.paras.status == '未缴'){
          this.paras.status = 0;
        }else if(this.paras.status == '已缴'){
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
      var para = {
        pageSize : this.pageSize,
        currentPage : this.currentPage,
        searchs : a
      }
      this.$http.post('http://localhost:3000/admin/paymentApi',para).then(
        function(data){
          this.tableData = data.body.results;
          this.theYear = para.searchs.theYear;
          if(typeof(data.body.total) != 'undefined'){
            this.total = data.body.total;
            this.costPerSquare = data.body.costPerSquare;
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
    notify(item){
      this.$http.get('http://localhost:3000/admin/message?sendTo='+item.id+'&createAt='+formatDate(new Date(),'yyyy-MM-dd')).then(
        function(data){
          Message({
            type:'success',
            message:'成功对该用户发起缴费通知'
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
.payment{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.payment .title{
  color: #629aa9;
  font-size: 24px;
}
.payment .main{
  width: 80%;
  height: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.payment .main h3{
  margin-top: 100px;
  color: orange;
  text-align: center;
}
.payment .el-button--small{
  padding: 7px 15px;
  margin-right: 10px;
}
.payment .el-breadcrumb{
  display: inline-block;
}
.payment .el-breadcrumb__inner{
  font-weight: normal;
  color: #606266;
}

</style>

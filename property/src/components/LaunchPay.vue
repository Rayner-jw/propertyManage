<template>
  <div class="launchPay">
    <span class="title">管理费</span>
    <div class="main">
        <div style="margin-bottom:10px">
          <el-button size="small" type="primary" @click="dialogTableVisible = true">发起</el-button>
        </div>
        <el-table :data="tableData" align="center" width="100%">
          <el-table-column align="center" type="index" width="50"></el-table-column>
          <el-table-column align="center" label="年度" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.theYear }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="costPerSquare" label="价格" min-width="100"></el-table-column>
          <el-table-column align="center" label="发起时间" min-width="100">
            <template slot-scope="scope">
              <span>{{ formatDate(new Date(scope.row.createAt),'yyyy-MM-dd HH:mm:ss') }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="" min-width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="delEvt(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
    </div>
    <el-dialog title="发起" :visible.sync="dialogTableVisible">
      <el-form class="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
  		  <el-form-item label="年度" prop="theYear">
          <el-date-picker
            v-model="ruleForm.theYear"
            :editable="false"
            type="year"
            placeholder="选择年度">
          </el-date-picker>
  		  </el-form-item>
  		  <el-form-item label="每平米价格" prop="costPerSquare">
  		    <el-input v-model="ruleForm.costPerSquare" auto-complete="off" placeholder=""></el-input>
  		  </el-form-item>
  		  <el-form-item label="">
          <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
  name: 'launchPay',
  data () {
    return {
      tableData:[],
      formatDate:formatDate,
      dialogTableVisible:false,
      ruleForm:{
      },
      rules:{
      	theYear: [
					{ required: true, message: '请选择年度', trigger: 'change' }
				],
				costPerSquare: [
					{ required: true, message: '请输入每平米价格', trigger: 'blur' },
          { pattern: /^\d+(\.\d+)?$/, message: '请输入正确格式，例如：2.3', trigger: 'blur' }
				]
      },
    }
  },
  created (){
    this.$http.get('http://localhost:3000/admin/paymentApi').then(
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.makeSure();
          } else {
            console.log('error submit!!');
            return false;
          }
      });
  	},
  	makeSure () {
      var para = JSON.parse(JSON.stringify(this.ruleForm));
      para.theYear = formatDate(new Date(para.theYear),'yyyy');
      para.createAt = formatDate(new Date(),'yyyy-MM-dd HH:mm:ss');
  		this.$http.put('http://localhost:3000/admin/paymentApi', para).then(
  			function(data){
          if(typeof(data.body.type) != 'undefined'){
            Message({
              type:data.body.type,
              message:data.body.msg
            });
            return;
          }
          Message({
            type:'success',
            message:data.body.msg
          });
          this.tableData.unshift(para);
          this.dialogTableVisible = false;
          this.ruleForm = {};
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
.launchPay{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.launchPay .title{
  color: #629aa9;
  font-size: 24px;
}
.launchPay .main{
  width: 80%;
  height: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.launchPay .main h3{
  margin-top: 100px;
  color: orange;
  text-align: center;
}
</style>

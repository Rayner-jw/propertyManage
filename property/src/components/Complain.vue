<template>
  <div class="complain">
    <span class="title">发起投诉</span>
    <el-form class="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
    	<el-form-item label="投诉类型" prop="complainType">
        <el-select v-model="ruleForm.complainType" placeholder="请选择投诉类型">
          <el-option
            v-for="item in complainTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
		  </el-form-item>
      <el-form-item label="是否匿名">
        <el-radio-group v-model="ruleForm.anonymous">
          <el-radio label="y">是</el-radio>
          <el-radio label="n">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.anonymous == 'n'" label="姓名" prop="name">
		    <el-input v-model="ruleForm.name" auto-complete="off" placeholder="请输入您的名字"></el-input>
		  </el-form-item>
      <el-form-item label="投诉内容" prop="complainContent">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="ruleForm.complainContent"></el-input>
      </el-form-item>
		  <el-form-item label="">
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'complain',
  data () {
    return {
      uid: localStorage.uid,
      complainTypes:[],
      ruleForm:{
        anonymous:'y'
      },
      rules:{
      	complainType: [
					{ required: true, message: '请选择投诉类型', trigger: 'change' }
				],
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				complainContent: [
					{ required: true, message: '请输入投诉内容', trigger: 'blur' }
				]
      },
    }
  },
  created (){
    this.complainTypes=[
      {
        label:'家居',
        value:'家居'
      },
      {
        label:'过道',
        value:'过道'
      }
    ]
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
      this.ruleForm.uid = this.uid;
      if(this.ruleForm.anonymous == 'y'){
        this.ruleForm.complainBy = '匿名';
      }
      this.ruleForm.complainTime = formatDate(new Date(),'yyyy-MM-dd HH:mm:ss');
  		this.$http.put('http://localhost:3000/user/complain', this.ruleForm).then(
  			function(data){
          Message({
            type:'success',
            message:data.body.msg
          });
          location.href = data.body.url;
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
.complain{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.complain .title{
  color: #629aa9;
  font-size: 24px;
}
.complain .ruleForm{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.complain .ruleForm .el-form-item__content{
  width: 50%
}
.complain .ruleForm .el-select{
  width: 100%
}
</style>

<template>
  <div class="repair">
    <span class="title">发起报修</span>
    <el-form class="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
    	<el-form-item label="报修类型" prop="repairType">
        <el-select v-model="ruleForm.repairType" placeholder="请选择报修类型">
          <el-option
            v-for="item in repairTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
		  </el-form-item>
		  <el-form-item v-if="ruleForm.repairType != '自家'" label="报修位置" prop="applicantAddress">
		    <el-input v-model="ruleForm.applicantAddress" auto-complete="off" placeholder="请输入报修位置"></el-input>
		  </el-form-item>
		  <el-form-item label="联系电话" prop="applicantPhone">
		    <el-input v-model="ruleForm.applicantPhone" auto-complete="off" placeholder="请输入您的联系电话"></el-input>
		  </el-form-item>
		  <el-form-item label="报修内容" prop="repairContent">
		    <el-input type="textarea" :rows="4" v-model="ruleForm.repairContent" auto-complete="off" placeholder="请填写具体的报修内容"></el-input>
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
  name: 'repair',
  data () {
    return {
      uid: localStorage.uid,
      repairTypes:[
        {label:'自家',value:'自家'},
        {label:'公共',value:'公共'},
        {label:'其他',value:'其他'}
      ],
      ruleForm:{
        repairType:'自家'
      },
      rules:{
      	repairType: [
					{ required: true, message: '请选择报修类型', trigger: 'change' }
				],
				applicantAddress: [
					{ required: true, message: '请输入报修位置', trigger: 'blur' }
				],
				applicantPhone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{ pattern: /^1[34578]\d{9}$/,message: '手机号格式不正确' }
				],
				repairContent: [
					{ required: true, message: '请输入报修内容', trigger: 'blur' }
				]
      },
    }
  },
  created (){
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
      this.ruleForm.applicantTime = formatDate(new Date(),'yyyy-MM-dd HH:mm:ss');
  		this.$http.put('http://localhost:3000/user/repairApi', this.ruleForm).then(
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
.repair{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.repair .title{
  color: #629aa9;
  font-size: 24px;
}
.repair .ruleForm{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.repair .ruleForm .el-form-item__content{
  width: 50%
}
.repair .ruleForm .el-select{
  width: 100%
}
</style>

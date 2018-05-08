<template>
  <div class="basicInfo">
    <span class="title">基本信息</span>
    <el-form class="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
    	<el-form-item label="账号名">
        <span>{{readForm.account}}</span>
		  </el-form-item>
		  <el-form-item label="姓名" prop="userName">
        <span v-if="isread">{{readForm.userName}}</span>
		    <el-input v-else v-model="ruleForm.userName" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="身份证" prop="idCard">
        <span v-if="isread">{{readForm.idCard}}</span>
		    <el-input v-else v-model="ruleForm.idCard" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号" prop="userPhone">
        <span v-if="isread">{{readForm.userPhone}}</span>
		    <el-input v-else v-model="ruleForm.userPhone" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="邮箱">
        <span>{{readForm.userMail}}</span>
        <el-button type="text" :disabled="!isread" @click="dialogTableVisible = true">换绑邮箱</el-button>
		  </el-form-item>
		  <el-form-item label="">
        <el-button v-if="isread" size="small" type="primary" @click="isread = false">修改</el-button>
        <el-button-group v-else>
          <el-button size="small" type="primary" @click="isread = true">取消</el-button>
  		    <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-button-group>
		  </el-form-item>
		</el-form>
    <el-dialog title="换绑邮箱" :visible.sync="dialogTableVisible">
      <el-form :model="mailForm" :rules="mailRules" ref="mailForm" label-width="80px">
        <el-form-item label="新邮箱" prop="userMail">
          <el-input v-model="mailForm.userMail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verCode">
  		    <el-input style="width:calc(100% - 150px);margin-right:20px" placeholder="请输入邮箱验证码" v-model="mailForm.verCode"></el-input>
          <el-button type="primary" @click="getEmailCode(mailForm.userMail)">获取验证码</el-button>
  		  </el-form-item>
        <el-form-item label="">
  		    <el-button type="primary" @click="submitForm('mailForm')">确定</el-button>
  		  </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'basicInfo',
  data () {
    return {
      uid: localStorage.uid,
      isread:true,
      readForm:{},
      ruleForm:{},
      mailForm:{},
      rules:{
				userName: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
				idCard: [
					{ required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/, message: '身份证号码格式不正确', trigger: 'blur'}
				],
				userPhone: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ pattern: /^1[34578]\d{9}$/,message: '手机号格式不正确' }
				]
      },
      mailRules:{
				userMail: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
			    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
				],
        verCode: [
					{ required: true, message: '请输入验证码', trigger: 'blur' },
					{ validator: this.validateMailCode, trigger: 'blur' }
				]
      },
      dialogTableVisible:false
    }
  },
  created (){
    this.$http.get('http://localhost:3000/user/userBasic?uid=' + this.uid).then(
      function(data){
        this.ruleForm = data.body;
        this.readForm = JSON.parse(JSON.stringify(this.ruleForm));
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
            formName == 'ruleForm' && this.makeSure();
            formName == 'mailForm' && this.makeSureMail();
          } else {
            console.log('error submit!!');
            return false;
          }
      });
  	},
  	makeSure () {
      var para = JSON.parse(JSON.stringify(this.ruleForm));
      para.uid = this.uid;
  		this.$http.post('http://localhost:3000/user/userBasic', para).then(
  			function(data){
          Message({
            type:'success',
            message:data.body.msg
          });
          this.readForm = JSON.parse(JSON.stringify(this.ruleForm));
          this.isread = true;
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
    makeSureMail () {
      var para = JSON.parse(JSON.stringify(this.mailForm));
      para.uid = this.uid;
  		this.$http.post('http://localhost:3000/user/userBasicInfo', para).then(
  			function(data){
          Message({
            type:'success',
            message:data.body.msg
          });
          this.ruleForm.userMail = this.mailForm.userMail;
          this.dialogTableVisible = false;
          this.mailForm = {};
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
    getEmailCode (email) {
      if(typeof email == 'undefined'){
        email = '';
      }
      var email = email.trim();
      if(email.length == 0){
        return Message({type:'warning',message:'请填写获取验证码邮箱'});
      }
      this.$http.post('http://localhost:3000/mailCode', {email:email}).then(
        function(data){
          Message({
            type:'success',
            message:'请登录邮箱获取验证码'
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
    validateMailCode (rule, value, callback) {
      var mailCode = value.trim();
      this.$http.get('http://localhost:3000/mailCode?mailCode=' + mailCode).then(
        function(data){
          callback();
        },
        function(res){
          if(res.status == 401){
            callback(new Error('验证码错误'));
            return;
          }
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
.basicInfo{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.basicInfo .title{
  color: #629aa9;
  font-size: 24px;
}
.basicInfo .ruleForm{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.basicInfo .ruleForm .el-form-item__content{
  width: 50%
}
</style>

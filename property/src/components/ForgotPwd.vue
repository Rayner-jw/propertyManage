<template>
  <div class="forgotPwd">
    <el-form class="forgotPwdForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
    	<el-form-item label="账号名" prop="account">
		    <el-input placeholder="请输入要找回的账号名" v-model="ruleForm.account" auto-complete="off"></el-input>
		  </el-form-item>
      <el-form-item label="绑定邮箱" prop="email">
		    <el-input placeholder="请输入绑定账号的邮箱" v-model="ruleForm.email" auto-complete="off"></el-input>
		  </el-form-item>
      <el-form-item label="验证码" prop="verCode">
		    <el-input style="width:calc(100% - 150px);margin-right:20px" placeholder="请输入邮箱验证码" v-model="ruleForm.verCode"></el-input>
        <el-button type="primary" @click="getEmailCode(ruleForm.email)">获取验证码</el-button>
		  </el-form-item>
		  <el-form-item label="新密码" prop="pwd">
		    <el-input placeholder="请输入新的密码" type="password" v-model="ruleForm.pwd" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="surePwd">
		    <el-input placeholder="确认密码" type="password" v-model="ruleForm.surePwd" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="">
		    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'forgotPwd',
  data () {
    return {
      ruleForm: {},
      rules:{
      	account: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9_-]{3,15}$/, message: '账号必须以字母开头，由4到16位（字母，数字，下划线，减号）组成',trigger: 'blur' }
				],
				pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ pattern: /^(?=.*[0-9])((?=.*[a-zA-Z])[0-9a-zA-Z]+|(?=.*[!.#$%^&*])[0-9!.#$%^&*]+)$/, message: '密码必须6位以上且由字母/数字/符号任意两者以上组成', trigger: 'blur' },
				],
				surePwd: [
					{ required: true, message: '请确认密码', trigger: 'blur' },
					{ validator: this.validatePwd, trigger: 'blur' }
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
			    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
				],
        verCode: [
					{ required: true, message: '请输入验证码', trigger: 'blur' },
					{ validator: this.validateMailCode, trigger: 'blur' }
				],
      },
    }
  },
  methods:{
  	validatePwd (rule, value, callback) {
	    if(value == '') {
	      callback(new Error('请输入确认密码'));
	    } else if (value != this.ruleForm.pwd) {
	      callback(new Error('两次输入密码不一致!'));
	    } else {
	      callback();
	    }
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
  		this.$http.put('http://localhost:3000/lookfor', this.ruleForm).then(
  			function(data){
          if(typeof(data.body.url) == 'undefined'){
            Message({
              type:'warning',
              message:data.body.msg
            });
          }else{
            Message({
              type:'success',
              message:data.body.msg
            });
            location.href = data.body.url;
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
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.forgotPwdForm{
	width: 50%;
	max-width: 500px;
	margin: 0 auto;
	margin-top: 30px;
}
@media (max-width: 500px) {
	.forgotPwdForm {
	  width: 80%;
	}
}
</style>

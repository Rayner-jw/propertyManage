<template>
  <div class="register">
    <el-form class="registerForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
    	<el-form-item label="账号名" prop="account">
		    <el-input placeholder="pack a username" v-model="ruleForm.account" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pwd">
		    <el-input placeholder="create a password" type="password" v-model="ruleForm.pwd" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="surePwd">
		    <el-input placeholder="make sure your password" type="password" v-model="ruleForm.surePwd" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号" prop="phone">
		    <el-input placeholder="phone number" v-model="ruleForm.phone" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="邮箱" prop="email">
		    <el-input placeholder="email" v-model="ruleForm.email" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="">
		    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'register',
  data () {
    return {
      ruleForm: {},
      rules:{
      	account: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ pattern: /^(?=.*[0-9])((?=.*[a-zA-Z])[0-9a-zA-Z]+|(?=.*[!.#$%^&*])[0-9!.#$%^&*]+)$/, message: '密码必须6位以上且由字母/数字/符号任意两者以上组成', trigger: 'blur' },
				],
				surePwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ validator: this.validatePwd, trigger: 'blur' }
				],
				phone: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ pattern: /^1[34578]\d{9}$/,message: '手机号格式不正确' }
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
			    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
				]
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
  	submitForm () {
  		this.$http.post('http://localhost:3000/login', this.ruleForm).then(
  			function(data){
          if(typeof(res.body.wrongaccount) != 'undefined'){
            Message({
              type:'warning',
              message:data.body.msg
            });
          }else{
            Message({
              type:'success',
              message:data.body.msg
            });
            //location.href = data.body.url;
          }
  			},
  			function(res){
          if(typeof(res.body.msg) == 'undefined'){
            var msg = '请求失败';
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
.registerForm{
	width: 50%;
	max-width: 500px;
	margin: 0 auto;
	margin-top: 30px;
}
@media (max-width: 500px) {
	.registerForm {
	  width: 80%;
	}
}
</style>


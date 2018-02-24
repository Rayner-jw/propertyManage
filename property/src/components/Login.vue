<template>
  <div class="loginArea">
    <el-form class="loginForm" :model="ruleForm" :rules="rules" ref="ruleForm">
    	<el-form-item prop="account">
		    <el-input placeholder="账号" prefix-icon="my-icon-denglu1" v-model="ruleForm.account" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item prop="pwd">
		    <el-input placeholder="密码" prefix-icon="my-icon-denglu" type="password" v-model="ruleForm.pwd" auto-complete="off" @onkeyup.enter="submitForm('ruleForm')"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button class="loginBtn" icon="my-icon-icon-right" type="primary" @click="submitForm('ruleForm')">登录</el-button>
		    <div class="other">
		    	<span><a href="register.html">注册</a></span>
		    	<span>忘记密码</span>
		    </div>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'login',
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
				]
      },
    }
  },
  methods:{
  	submitForm () {
  		this.$http.post('http://localhost:3000/login', this.ruleForm).then(
  			function(data){
            Message({
              type:'success',
              message:data.body.msg
            });
            location.href = data.body.url;
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
.loginArea {
	position: relative;
	padding-top: 60px;
	-webkit-transition: all 550ms ease-in-out;
	-moz-transition: all 550ms ease-in-out;
	-o-transition: all 550ms ease-in-out;
	transition: all 550ms ease-in-out;
}
@media (max-width: 991px) {
	.loginArea {
	  padding-top: 30px;
	}
}
.loginArea .loginForm {
    position: relative;
    width: 280px;
    margin: 0 auto;
    text-align: center;
    padding: 20px 0;
    -webkit-transition: all 550ms ease-in-out;
    -moz-transition: all 550ms ease-in-out;
    -o-transition: all 550ms ease-in-out;
    transition: all 550ms ease-in-out;
}
@media (max-width: 350px){
	.loginArea .loginForm {
    width: 260px;
	}
}
.loginArea .el-input--prefix .el-input__inner{
	padding-left: 40px;
}
.loginArea .el-input__prefix{
	left: 15px;
}
.loginArea .loginBtn{
	 width: 100%;
}
.loginArea .el-button{
	padding-left: 40px;
}
.loginArea .el-button span{
	float: left;
}
.loginArea .my-icon-icon-right{
	float: right;
}
.loginArea .other span{
	display: block;
	float: left;
	padding-left: 10px;
	font-size: 12px;
}
.loginArea .other span:hover{
	cursor: pointer;
	color: #0086B3;
}
</style>

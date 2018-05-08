<template>
  <div class="loginArea">
    <el-form class="loginForm" :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="title">JW propertySys</div>
    	<el-form-item prop="account">
		    <el-input placeholder="账号" prefix-icon="my-icon-denglu1" v-model="ruleForm.account" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item prop="pwd">
		    <el-input placeholder="密码" prefix-icon="my-icon-denglu" type="password" v-model="ruleForm.pwd" auto-complete="off" @onkeyup="submitForm('ruleForm')"></el-input>
		  </el-form-item>
      <el-form-item prop="verCode">
		    <el-input style="width:calc(100% - 160px)" placeholder="图片验证码" v-model="ruleForm.verCode" @onkeyup.enter="submitForm('ruleForm')"></el-input>
        <div style="display:inline-block;width:150px;height:40px;vertical-align:middle;" @click="freshVerCode" v-html="getVerCode"></div>
		  </el-form-item>
		  <el-form-item>
		    <el-button class="loginBtn" icon="my-icon-icon-right" type="primary" @click="submitForm('ruleForm')">登录</el-button>
		    <div class="other">
		    	<span><a href="/user/register">用户注册</a></span>
		    	<span><a href="/user/forgotPwd">忘记密码</a></span>
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
				],
        verCode:[
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: this.validateVerCode, trigger: 'blur' }
        ]
      },
      getVerCode:null
    }
  },
  created () {
    this.freshVerCode();
  },
  methods:{
  	submitForm (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            console.log('error submit!!');
            return false;
          }
      });
  	},
    login () {
      this.$http.post('http://localhost:3000/login', this.ruleForm).then(
  			function(data){
            Message({
              type:'success',
              message:data.body.msg
            });
            localStorage.uid = data.body.id;
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
    },
    freshVerCode () {
      this.$http.get('http://localhost:3000/getVerCode').then(
        function(data){
          console.log(data);
            this.getVerCode = data.body.img;
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
    validateVerCode (rule, value, callback) {
      var verCode = value.trim();
      this.$http.post('http://localhost:3000/getVerCode',{verCode:verCode}).then(
        function(data){
          callback();
        },
        function(res){
          if(res.status == 401){
            callback(new Error('验证码密码'));
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
.loginArea .loginForm .title{
  width: 100%;
  height: 50px;
  font-size: 20px;
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
.loginArea .other a{
  color: black;
  text-decoration-line: none;
}
</style>

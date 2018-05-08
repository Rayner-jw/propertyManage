<template>
  <div class="setting">
    <span class="title">安全设置</span>
    <el-form class="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="旧密码" prop="oldPwd">
		    <el-input placeholder="your old password" type="password" v-model="ruleForm.oldPwd" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="新密码" prop="newPwd">
		    <el-input placeholder="create a new password" type="password" v-model="ruleForm.newPwd" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="surePwd">
		    <el-input placeholder="make sure your password" type="password" v-model="ruleForm.surePwd" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="">
  		    <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'setting',
  data () {
    return {
      uid: localStorage.uid,
      ruleForm:{},
      rules:{
        oldPwd: [
					{ required: true, message: '请输入旧的密码', trigger: 'blur' },
					{ pattern: /^(?=.*[0-9])((?=.*[a-zA-Z])[0-9a-zA-Z]+|(?=.*[!.#$%^&*])[0-9!.#$%^&*]+)$/, message: '密码必须6位以上且由字母/数字/符号任意两者以上组成', trigger: 'blur' },
				],
        newPwd: [
					{ required: true, message: '请输入新的密码', trigger: 'blur' },
					{ pattern: /^(?=.*[0-9])((?=.*[a-zA-Z])[0-9a-zA-Z]+|(?=.*[!.#$%^&*])[0-9!.#$%^&*]+)$/, message: '密码必须6位以上且由字母/数字/符号任意两者以上组成', trigger: 'blur' },
				],
				surePwd: [
					{ required: true, message: '请确认新的密码', trigger: 'blur' },
					{ validator: this.validatePwd, trigger: 'blur' }
				],
      },
    }
  },
  created (){

  },
  methods:{
    validatePwd (rule, value, callback) {
	    if(value == '') {
	      callback(new Error('请输入确认密码'));
	    } else if (value != this.ruleForm.newPwd) {
	      callback(new Error('两次输入密码不一致!'));
	    } else {
	      callback();
	    }
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
      this.ruleForm.uid = this.uid;
  		this.$http.post('http://localhost:3000/user/account', this.ruleForm).then(
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
            setTimeout(function(){
              location.href = data.body.url;
            },2000)
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
.setting{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.setting .title{
  color: #629aa9;
  font-size: 24px;
}
.setting .ruleForm{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
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

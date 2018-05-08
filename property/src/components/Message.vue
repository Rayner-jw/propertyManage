<template>
  <div class="message">
    <span class="title">发消息到物业处</span>
    <el-form class="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" >
      <el-alert
        title="提示"
        type="error"
        description="消息一经发送，将无法修改，请确认消息无误后再发送"
        :closable="false">
      </el-alert>
      <el-form-item label="" prop="content">
        <el-input type="textarea" :autosize="{ minRows: 8}" v-model="ruleForm.content"></el-input>
      </el-form-item>
		  <el-form-item label="">
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">发送</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'message',
  data () {
    return {
      ruleForm:{
        accountId : localStorage.uid
      },
      rules:{
				content: [
					{ required: true, message: '请输入公告内容', trigger: 'blur' },
          { pattern: /^\S+/, message: '正文前不能留空', trigger: 'blur' }
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
      this.ruleForm.createAt = formatDate(new Date(),'yyyy-MM-dd HH:mm:ss');
  		this.$http.put('http://localhost:3000/user/message', this.ruleForm).then(
  			function(data){
          this.ruleForm.content = '';
          Message({
            type:'success',
            message:data.body.msg
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
.message{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.message .title{
  color: #629aa9;
  font-size: 24px;
}
.message .ruleForm{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.message .el-form-item__content{
  text-align: right;
}
.message .el-dropdown{
  margin: 0 20px;
}
</style>

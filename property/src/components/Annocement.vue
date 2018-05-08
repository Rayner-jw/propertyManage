<template>
  <div class="annocement">
    <span class="title">发起公告</span>
    <el-form class="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" >
      <el-alert
        title="提示"
        type="error"
        description="公告一经发布，所有用户都将收到通知且无法修改内容，请核对消息内容无误后再进行发布"
        :closable="false">
      </el-alert>
      <el-form-item label="" prop="annocementContent">
        <el-input type="textarea" :autosize="{ minRows: 8}" v-model="ruleForm.annocementContent"></el-input>
      </el-form-item>
		  <el-form-item label="">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ruleForm.annocementType}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="小区">小区</el-dropdown-item>
            <el-dropdown-item command="投诉">投诉</el-dropdown-item>
            <el-dropdown-item command="其他">其他</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">发布</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'annocement',
  data () {
    return {
      ruleForm:{
        annocementType:'报修',
      },
      rules:{
				annocementContent: [
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
  		this.$http.put('http://localhost:3000/admin/annocement', this.ruleForm).then(
  			function(data){
          this.ruleForm.annocementContent = '';
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
    },
    handleCommand(command){
      this.ruleForm.annocementType = command;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.annocement{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.annocement .title{
  color: #629aa9;
  font-size: 24px;
}
.annocement .ruleForm{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.annocement .el-form-item__content{
  text-align: right;
}
.annocement .el-dropdown{
  margin: 0 20px;
}
</style>

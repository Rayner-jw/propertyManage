<template>
  <div class="basicChecking">
    <el-steps :active="checkStep" align-center>
      <el-step title="审核中" description="已提交资料审核，待JW物业处审核确认,请耐心等待"></el-step>
      <el-step title="通过"></el-step>
      <el-step title="不通过">
        <span slot="description">审核不通过，请点击此处<el-button :disabled="checkStep != 2" type="text" size="mini" @click="dialogTableVisible = true">修改资料</el-button>,重新审核</span>
      </el-step>
    </el-steps>
    <el-dialog title=修改 :visible.sync="dialogTableVisible">
      <el-form class="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
  		  <el-form-item label="姓名" prop="userName">
  		    <el-input v-model="ruleForm.userName" auto-complete="off"></el-input>
  		  </el-form-item>
  		  <el-form-item label="联系电话" prop="userPhone">
  		    <el-input v-model="ruleForm.userPhone" auto-complete="off"></el-input>
  		  </el-form-item>
        <el-form-item label="身份证" prop="idCard">
  		    <el-input v-model="ruleForm.idCard" auto-complete="off"></el-input>
  		  </el-form-item>
  		  <el-form-item label="">
          <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
  		  </el-form-item>
  		</el-form>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
export default {
  name: 'basicChecking',
  data () {
    return {
      uid: localStorage.uid,
      ruleForm:{},
      rules:{
				userName: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				],
        userPhone: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
        ],
				idCard: [
					{ required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/, message: '身份证号码格式不正确', trigger: 'blur'}
				]
      },
      checkStep:0,
      dialogTableVisible:false
    }
  },
  created (){
    this.$http.put('http://localhost:3000/user/userBasicInfo', {uid: this.uid}).then(
      function(data){
        if(data.body.userStatus == 0){
          this.checkStep = 2;
          this.ruleForm = data.body;
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
  },
  methods:{
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.basicChecking();
          } else {
            console.log('error submit!!');
            return false;
          }
      });
  	},
  	basicChecking () {
      var para = JSON.parse(JSON.stringify(this.ruleForm));
      para.uid = this.uid;
      para.userStatus = 2;
  		this.$http.post('http://localhost:3000/user/userBasic', para).then(
  			function(data){
          Message({
            type:'success',
            message:'已提交修改内容'
          });
          this.dialogTableVisible = false;
          this.checkStep = 0;
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
.basicChecking{
  width: 80%;
  height: 60%;
  margin: 0 auto;
}
.basicChecking .step{
  margin-bottom: 20px;
  padding: 10px;
  min-height: 80px;
  background: #ffffff;
  position: relative;
}
.basicChecking .step .cancel{
  position: absolute;
  top: 5px;
  right: 10px;
  font-weight: normal;
}
.basicChecking .step > span{
  font-size: small;
  font-weight: bold;
}
.basicChecking .el-steps{
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
}
.basicChecking .el-step.is-horizontal{
  color: orange;
}
.basicChecking .el-step__title.is-process{
  color: inherit;
}
.basicChecking .el-step__description.is-process{
  color: inherit;
}
.basicChecking .el-step__head.is-process {
    color: inherit;
    border-color: inherit;
}
</style>

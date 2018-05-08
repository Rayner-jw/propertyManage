<template>
  <div class="basic">
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
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { formatDate } from '../assets/js/commom.js'
export default {
  name: 'basic',
  data () {
    return {
      uid: localStorage.uid,
      buildingNames:[],
      houseLayers:[],
      houseNumbers:[],
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
    }
  },
  created (){
    
  },
  methods:{
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.basic();
          } else {
            console.log('error submit!!');
            return false;
          }
      });
  	},
  	basic () {
      var para = JSON.parse(JSON.stringify(this.ruleForm));
      para.uid = this.uid;
      //para.check_in_time = formatDate(this.ruleForm.check_in_time,'yyyy-MM-dd');
  		this.$http.put('http://localhost:3000/user/userBasic', para).then(
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
.ruleForm{
	width: 50%;
	max-width: 500px;
	margin: 0 auto;
	margin-top: 30px;
}
@media (max-width: 500px) {
	.ruleForm {
	  width: 80%;
	}
}
</style>

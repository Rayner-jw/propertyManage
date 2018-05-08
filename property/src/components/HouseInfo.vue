<template>
  <div class="houseInfo">
    <span class="title">楼房信息</span>
    <el-form class="ruleForm" :model="ruleForm" label-width="80px">
    	<el-form-item label="所在位置">
        <span>{{ruleForm.buildingName + ' - ' + ruleForm.houseLayer + ' - ' + ruleForm.houseNumber}}</span>
		  </el-form-item>
      <el-form-item label="房子结构">
        <span>{{ruleForm.buildingName}}</span>
		  </el-form-item>
      <el-form-item label="占地大小">
        <span>{{ruleForm.square}} 平米</span>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
export default {
  name: 'houseInfo',
  data () {
    return {
      uid: localStorage.uid,
      ruleForm:{},
    }
  },
  created (){
    this.$http.get('http://localhost:3000/user/userBasicInfo?uid=' + this.uid).then(
      function(data){
        this.ruleForm = data.body;
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.houseInfo{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.houseInfo .title{
  color: #629aa9;
  font-size: 24px;
}
.houseInfo .ruleForm{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>

<template>
  <div class="utilities">
    <el-date-picker
      v-model="pickYear"
      type="year"
      :clearable="false"
      :editable="false"
      placeholder="选择年度">
    </el-date-picker>
    <span class="title">年度水电费</span>
    <div class="fees">
      <el-alert
        title="缴费须知"
        type="warning"
        description="如有疑问，请致电JW物业处---电话100 1000 1100"
        :closable="false">
      </el-alert>
      <el-table :data="tableData" align="center" width="100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div style="width:500px;margin:0 auto;">
              <el-form label-position="left" class="expandForm">
                <el-form-item label="月始水量">
                  <span>{{ scope.row.w_start_nums }}</span>
                </el-form-item>
                <el-form-item label="月终水量">
                  <span>{{ scope.row.w_start_nums }}</span>
                </el-form-item>
                <el-form-item label="用水量">
                  <span>{{ scope.row.w_end_nums }}</span>
                </el-form-item>
                <el-form-item label="用水金额">
                  <span>{{ scope.row.w_nums }}</span>
                </el-form-item>
              </el-form>
              <el-form label-position="left" class="expandForm">
                <el-form-item label="月始电量">
                  <span>{{ scope.row.e_start_nums }}</span>
                </el-form-item>
                <el-form-item label="月终电量">
                  <span>{{ scope.row.e_start_nums }}</span>
                </el-form-item>
                <el-form-item label="用电量">
                  <span>{{ scope.row.e_end_nums }}</span>
                </el-form-item>
                <el-form-item label="用电金额">
                  <span>{{ scope.row.e_nums }}</span>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="date" label="月份" min-width="80"></el-table-column>
        <el-table-column align="center" prop="w_moeny" label="水费金额" min-width="80"></el-table-column>
        <el-table-column align="center" prop="e_moeny" label="电费金额" min-width="80"></el-table-column>
        <el-table-column align="center" prop="w_e_fees" label="合计" min-width="80"></el-table-column>
        <el-table-column align="center" prop="status" label="缴费状态" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.status == 'y' ? ('已缴费') : ('未交费')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="80">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.status == 'y'" @click="handleClick(scope.row)" type="primary" size="mini">缴费</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'utilities',
  data () {
    return {
      pickYear:new Date('2018'),
      tableData:[]
    }
  },
  created (){
    this.tableData = [
      {
        date:'一月',
        w_start_nums:'jw',
        w_start_nums:3000.2,
        w_end_nums:3000.2,
        w_nums:3000.2,
        w_moeny:3000.2,
        e_start_nums:3000.2,
        e_end_nums:3000.2,
        e_nums:3000.2,
        e_moeny:3000.2,
        w_e_fees:6000,
        status:'n'
      },
      {
        date:'二月',
        w_start_nums:'jw',
        w_start_nums:3000.2,
        w_end_nums:3000.2,
        w_nums:3000.2,
        w_moeny:3000.2,
        e_start_nums:3000.2,
        e_end_nums:3000.2,
        e_nums:3000.2,
        e_moeny:3000.2,
        w_e_fees:6000,
        status:'n'
      }
    ]
  },
  methods:{
    handleClick (id){

    },
    seeMore (){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.utilities{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.utilities .title{
  color: #629aa9;
  font-size: 24px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  vertical-align: bottom;
}
.utilities .fees{
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.utilities .el-date-editor.el-input {
  width: 80px;
}
.utilities .el-input--suffix .el-input__inner{
  padding-right: 0;
}
.utilities .expandForm{
  display: inline-block;
  width: 245px;
}
.utilities .expandForm label {
  width: 90px;
  color: #99a9bf;
}
.utilities .expandForm .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
</style>

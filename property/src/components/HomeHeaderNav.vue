<template>
  <div class="homeHeaderNav">
    <el-dropdown trigger="click" placement="bottom-start">
      <el-badge :value="2" class="icon">
        <i class="my-icon my-icon-3"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <div class="dropdownBox">
          <span>ss</span>
          <span>aa</span>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown trigger="click" placement="bottom-start">
      <el-badge :value="12" class="icon">
        <i class="my-icon my-icon-gonggao"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <div class="dropdownBox">
          <span>ss</span>
          <span>aa</span>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown trigger="click" placement="bottom" class="icon_me">
      <el-badge class="icon">
        <i class="my-icon my-icon-iconuser"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <div class="dropdownBox">
          <span>ss</span>
          <span>aa</span>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'homeHeaderNav',
  data () {
    return {
    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.homeHeaderNav{
	width: 100%;
	height: 50px;
  background: #FFF;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
  -webkit-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
  -moz-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
  -o-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.21);
}
.homeHeaderNav .icon{
  margin: 0 10px;
}
.homeHeaderNav .el-badge__content.is-fixed{
  top: 12px;
}
.homeHeaderNav .el-badge__content{
  border: none;
}
.homeHeaderNav .my-icon{
  font-size: 36px;
  color: #629aa9;
}
.homeHeaderNav .icon_me{
  float: right;
  margin-right: 50px;
}
.dropdownBox{
  padding: 1em;
  min-width: 280px;
}
.dropdownBox span{
  display: block;
  margin-left: 0;
  width: 100%;
  padding: 0;
  background: #fff;
}
.homeHeaderNav .el-dropdown{
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
}
</style>

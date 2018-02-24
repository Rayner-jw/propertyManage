<template>
  <div class="menuNav">
    <el-menu
      default-active="2"
      class="menu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="my-icon-iconuser"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item-group>
          <template slot="title">我的信息</template>
          <el-menu-item index="1-1">基本信息</el-menu-item>
          <el-menu-item index="1-2">安全设置</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">我的楼房</template>
          <el-menu-item index="1-1">楼房信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="my-icon-baomingjiaofei"></i>
          <span slot="title">业务缴费</span>
        </template>
        <el-menu-item index="2-1">未交费业务</el-menu-item>
        <el-menu-item index="2-2">我的业务</el-menu-item>
        <el-menu-item index="2-3">全部业务</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="my-icon-baoxiu"></i>
          <span slot="title">故障报修</span>
        </template>
        <el-menu-item index="3-1">发起报修</el-menu-item>
        <el-menu-item index="3-2">报修情况</el-menu-item>
        <el-menu-item index="3-3">报修记录</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="my-icon-tingche"></i>
          <span slot="title">我的停车</span>
        </template>
        <el-menu-item index="4-1">停车信息</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="my-icon-gonggao"></i>
          <span slot="title">消息公告</span>
        </template>
        <el-menu-item index="5-1">新的公告</el-menu-item>
        <el-menu-item index="5-2">全部公告</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="my-icon-tousuguanli"></i>
          <span slot="title">投诉意见</span>
        </template>
        <el-menu-item index="6-1">发起投诉</el-menu-item>
        <el-menu-item index="6-2">投诉情况</el-menu-item>
        <el-menu-item index="6-3">投诉记录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'menuNav',
  data () {
    return {

    }
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.menuNav{
	width: 100%;
  height: 100%;
}
.menuNav menu{
  width: 200px;
}
.menuNav .el-menu{
  border: none;
  height: 100%;
}
</style>

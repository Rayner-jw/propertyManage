<template>
  <div id="app">
    <div class="lf">
      <MenuNav></MenuNav>
    </div>
    <div class="lr">
        <AdminHomeHeaderNav></AdminHomeHeaderNav>
        <RepairLogs></RepairLogs>
    </div>
  </div>
</template>

<script>
import MenuNav from '../../components/MenuNav'
import AdminHomeHeaderNav from '../../components/AdminHomeHeaderNav'
import RepairLogs from '../../components/RepairLogs'

export default {
  name: 'App',
  components: {
    MenuNav,
    AdminHomeHeaderNav,
    RepairLogs
  }
}
</script>

<style>
html,body{
	margin: 0;
	padding: 0;
	width: 100%;
  height: 100%
}
#app{
  height: 100%;
  position: relative;
}
.lf{
  position: absolute;
  width: 200px;
  height: 100%;
  left: 0;
  top: 0;
}
.lr{
  position: absolute;
  width: calc(100% - 200px);
  height: 100%;
  right: 0;
  top: 0;
}
</style>

<template>
  <div id="app">
    <div class="lf">
      <MenuNav></MenuNav>
    </div>
    <div class="lr">
        <AdminHomeHeaderNav></AdminHomeHeaderNav>
        <ComplainLogs></ComplainLogs>
    </div>
  </div>
</template>

<script>
import MenuNav from '../../components/MenuNav'
import AdminHomeHeaderNav from '../../components/AdminHomeHeaderNav'
import ComplainLogs from '../../components/ComplainLogs'

export default {
  name: 'App',
  components: {
    MenuNav,
    AdminHomeHeaderNav,
    ComplainLogs
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

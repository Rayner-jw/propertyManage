<template>
  <div id="app">
    <div class="lf">
      <MenuNav></MenuNav>
    </div>
    <div class="lr">
        <HomeHeaderNav></HomeHeaderNav>
        <RepairLog></RepairLog>
    </div>
  </div>
</template>

<script>
import MenuNav from '../../components/MenuNav'
import HomeHeaderNav from '../../components/HomeHeaderNav'
import RepairLog from '../../components/RepairLog'

export default {
  name: 'App',
  components: {
    MenuNav,
    HomeHeaderNav,
    RepairLog
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

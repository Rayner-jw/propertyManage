<template>
  <div id="app">
    <HeaderNav>
      <span class="loginTitle" slot="navTitle">jw 物业管理系统</span>
    </HeaderNav>
    <login></login>
  </div>
</template>

<script>
import HeaderNav from '../../components/HeaderNav'
import Login from '../../components/Login'

export default {
  name: 'app',
  components: {
    HeaderNav,
    Login
  }
}
</script>

<style>
html,body{
	margin: 0;
	padding: 0;
	width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
loginTitle{
  font-family: cursive;
  font-size: x-large;
}
</style>

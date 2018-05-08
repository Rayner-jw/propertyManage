<template>
  <div id="app">
  	<HeaderNav>
      <span slot="navTitle">找回密码</span>
    </HeaderNav>
    <ForgotPwd></ForgotPwd>
  </div>
</template>

<script>
import ForgotPwd from '../../components/ForgotPwd'
import HeaderNav from '../../components/HeaderNav'

export default {
  name: 'App',
  components: {
    ForgotPwd,
    HeaderNav
  }
}
</script>

<style>
html,body{
	margin: 0;
	padding: 0;
	width: 100%;
}
</style>

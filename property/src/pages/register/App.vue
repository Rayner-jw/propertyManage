<template>
  <div id="app">
  	<HeaderNav>
      <span slot="navTitle">用户注册</span>
    </HeaderNav>
    <Register></Register>
  </div>
</template>

<script>
import Register from '../../components/Register'
import HeaderNav from '../../components/HeaderNav'

export default {
  name: 'App',
  components: {
    Register,
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

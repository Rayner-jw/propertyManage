<template>
  <div id="app">
    <HeaderNav>
      <span slot="navTitle">资料审核</span>
    </HeaderNav>
    <BasicChecking></BasicChecking>
  </div>
</template>

<script>
import HeaderNav from '../../components/HeaderNav'
import BasicChecking from '../../components/BasicChecking'

export default {
  name: 'App',
  components: {
    HeaderNav,
    BasicChecking
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

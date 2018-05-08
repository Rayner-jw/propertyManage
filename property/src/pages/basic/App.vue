<template>
  <div id="app">
    <HeaderNav>
      <span slot="navTitle">填写审核资料</span>
    </HeaderNav>
    <Basic></Basic>
  </div>
</template>

<script>
import HeaderNav from '../../components/HeaderNav'
import Basic from '../../components/Basic'

export default {
  name: 'App',
  components: {
    HeaderNav,
    Basic
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

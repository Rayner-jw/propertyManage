<template>
  <div class="headerNav">
    <slot name="navTitle"></slot>
  </div>
</template>

<script>
export default {
  name: 'headerNav',
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
.headerNav{
	width: 100%;
	height: 50px;
	background: #24292E;
}
.headerNav span{
  color: white;
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>

<template>
  <div class="notification">
    <span class="title">公告</span>
    <section class="notify">
      <h3>小区投诉</h3>
      <p><span style="color:#ffb22b">[未读] </span>These juicy, green apples make a great filling for apple pies.</p>
      <span class="info"><time>2018-02-12</time> --- JW物业处</span>
    </section>
    <section class="notify">
      <h3>小区投诉</h3>
      <p><span style="color:#ffb22b">[未读] </span>These juicy, green apples make a great filling for apple pies.</p>
      <span class="info"><time>2018-02-12</time> --- JW物业处</span>
    </section>
    <section class="notify">
      <h3>小区投诉</h3>
      <p><span style="color:#ffb22b">[未读] </span>These juicy, green apples make a great filling for apple pies.</p>
      <span class="info"><time>2018-02-12</time> --- JW物业处</span>
    </section>
    <section class="notify">
      <h3>小区投诉</h3>
      <p><span style="color:#ffb22b">[未读] </span>These juicy, green apples make a great filling for apple pies.</p>
      <span class="info"><time>2018-02-12</time> --- JW物业处</span>
    </section>
  </div>
</template>

<script>
export default {
  name: 'notification',
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
.notification{
  box-sizing: border-box;
	width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
  overflow: auto;
  background: #f1f1f1;
}
.notification .title{
  color: #629aa9;
  font-size: 24px;
}
.notification .notify{
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;
  min-height: 80px;
  background: #ffffff;
}
.notification .notify .info{
  font-size: 12px;
  color: #aaa;
}
</style>

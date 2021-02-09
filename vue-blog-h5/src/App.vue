<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    if (!this.isMobile()) {
        window.location.href = "http://www.cycblog.cn"; //web端跳转
      }
  },
  methods: {
    isMobile() {
      return /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent)
    }
  }
}
</script>
<style lang="scss"></style>

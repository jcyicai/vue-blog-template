<template>
  <div id="app">
    <router-view :key="this.$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    if (this.isMobile()) {
      window.location.href = "http://m.cycblog.cn"; //移动端域名跳转H5版本
    }
  },
  methods: {
    isMobile() {
      return /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(
        navigator.userAgent
      );
    }
  }
};
</script>

<style lang="scss">
.dialog-cancel-btn {
  &:hover {
    color: #41b883 !important;
    border-color: rgba(65, 184, 131, 0.5) !important;
    background-color: rgba(65, 184, 131, 0.1) !important;
  }
  &:active {
    border-color: #41b883 !important;
  }
}
.dialog-confirm-btn {
  color: #fff;
  background: #41b883;
  border-color: #41b883;
  &:hover {
    background: rgba(65, 184, 131, 0.8);
  }
}
.el-message-box__btns {
  .el-button--primary {
    color: #fff !important;
    background: #41b883 !important;
    border-color: #41b883 !important;
    &:hover {
      background: rgba(65, 184, 131, 0.8) !important;
    }
  }
}
</style>

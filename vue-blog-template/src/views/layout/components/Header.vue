<template>
  <div class="header-main">
    <el-header class="clearfix">
      <div class="header-title fl">
        CYC-BLOG
      </div>
      <div class="header-nav fl">
        <el-menu :default-active="1" class="el-menu" mode="horizontal">
          <el-menu-item index="1">文章</el-menu-item>
          <el-menu-item index="2">留言</el-menu-item>
          <el-menu-item index="3">关于</el-menu-item>
        </el-menu>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header-main {
  width: 100%;
}
.el-header {
  width: 1200px;
  margin: 0 auto;
  .header-title {
    line-height: 60px;
    font-size: 18px;
    font-weight: bold;
    padding: 0 20px;
  }
  .header-nav {
    padding: 0 20px;
    .el-menu {
      border-bottom: none;
      .el-menu-item {
        padding: 0 30px;
      }
    }
  }
}
</style>

<template>
  <el-container>
    <el-header class="clearfix">
      <div class="layout">
        <div class="header-title fl">
          <router-link to="/home">CYC-BLOG</router-link>
        </div>
        <div class="header-nav fr">
          <el-menu
            :default-active="activeMenu"
            class="el-menu"
            mode="horizontal"
            router
          >
            <el-menu-item index="/home" v-track-pageview="{ pageURL: '/home' }"
              >文章</el-menu-item
            >
            <el-menu-item
              index="/whisper"
              v-track-pageview="{ pageURL: '/whisper' }"
              >留言</el-menu-item
            >
            <el-menu-item
              index="/album"
              v-track-pageview="{ pageURL: '/album' }"
              >相册</el-menu-item
            >
            <el-menu-item
              index="/updateLog"
              v-track-pageview="{ pageURL: '/updateLog' }"
              >更新</el-menu-item
            >
            <el-menu-item
              index="/about"
              v-track-pageview="{ pageURL: '/about' }"
              >关于</el-menu-item
            >
          </el-menu>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="layout">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </el-main>
    <el-footer
      >Copyright @ 2019 By CYC<a
        class="filing"
        target="_bank"
        href="http://www.beian.miit.gov.cn/"
        >备案号123456</a
      ></el-footer
    >
  </el-container>
</template>

<script>
export default {
  name: "Layout",
  computed: {
    activeMenu() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
$infoWidth: 340px;
.el-container {
  height: 100vh;
  .el-header {
    .header-title {
      line-height: 60px;
      font-size: 18px;
      font-weight: bold;
      padding: 0 20px;
      color: #41b883;
    }
    .header-nav {
      padding: 0 20px;
      .el-menu {
        border-bottom: none;
        .el-menu-item {
          padding: 0 30px;
          &.is-active {
            border-color: #41b883;
            color: #41b883;
            font-weight: bold;
          }
        }
      }
    }
  }
  .el-main {
    background: #f4f5f5;
  }
  .el-footer {
    height: 40px !important;
    line-height: 40px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.35);
    text-align: center;
    background: #f4f5f5;
    .filing {
      margin-left: 10px;
      padding-left: 10px;
      position: relative;
      &:hover {
        text-decoration: underline;
      }
      &:before {
        content: "";
        width: 1px;
        height: 16px;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.35);
      }
    }
  }
}
</style>

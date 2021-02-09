<template>
  <div class="about-main">
    <el-card>
      <div class="about-title">
        <h2>关于博客</h2>
      </div>
      <div class="about-content">
        <h4>博客简介</h4>
        <ul>
          <li>博客采用服务端渲染(ssr)，基于Vue通用框架开发</li>
          <li>
            前端技术栈：Vue + Vue-Router + Vue-cli3 + Axios + Sass + Element-ui
          </li>
          <li>
            后端技术栈：Node.js + Express + MongoDB + Mongoose
          </li>
          <li>
            服务器：CentOS7.6 + 七牛云
          </li>
        </ul>
      </div>
      <div class="about-title">
        <h2>关于我</h2>
      </div>
      <div class="about-content">
        <h4>个人简介</h4>
        <ul>
          <li>姓名：Jason Chen</li>
          <li>职位：Web前端开发工程师</li>
          <li>邮箱：chenyicai622@qq.com</li>
          <li>爱好：料理、烘焙、写代码</li>
          <li>座右铭：星光不问赶路人，时光不负有心人</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "About",
  components: {}
};
</script>

<style lang="scss" scoped>
.about-main {
  background: #fff;
  .about-title {
    text-align: center;
    border-bottom: 1px dashed #e5e5e5;
  }
  .about-content {
    padding: 0 20px;
    ul {
      padding-left: 80px;
      li {
        color: #3d5064;
        line-height: 40px;
      }
    }
  }
}
</style>

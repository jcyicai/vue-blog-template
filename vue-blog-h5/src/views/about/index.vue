<template>
  <div class="container">
    <van-row class="about-box">
      <div class="about-main">
        <h2>关于博客</h2>
        <div>
          <ul>
            <li>博客基于Vue通用框架开发</li>
            <li>前端技术栈：Vue + Vue-Router + Vue-cli3 + Axios + Sass + Element-ui</li>
            <li>后端技术栈：Node.js + Express + MongoDB + Mongoose</li>
            <li>服务器：CentOS7.6 + 七牛云</li>
          </ul>
        </div>
      </div>
    </van-row>
    <van-row class="about-box">
      <div class="about-main">
        <h2>关于我</h2>
        <div>
          <ul>
            <li>姓名：Jason Chen</li>
            <li>职位：Web前端开发工程师</li>
            <li>邮箱：chenyicai622@qq.com</li>
            <li>爱好：料理、烘焙、写代码</li>
            <li>座右铭：星光不问赶路人，时光不负有心人</li>
          </ul>
        </div>
      </div>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 58px;
  .about-box {
    padding: 14px 14px;
    background: #fff;
    &:first-child {
      border-bottom: 1px dashed #e5e5e5;
    }
    .about-main {
      h2 {
        margin: 0;
        padding: 12px 0;
        text-align: center;
        &:first-child {
          padding-top: 0;
        }
      }
      ul {
        padding: 0 14px;
        li {
          list-style-type: disc;
          padding: 4px 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>

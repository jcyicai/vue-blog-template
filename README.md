<p align="center">
  <img height="150" src="http://resource.cycblog.cn/image/vue-blog-logo.png">
</p>

## 简介

[vue-blog-template](https://github.com/JasonChen1719/vue-blog-template) 是基于vue2.0，包含了vue-blog-template(PC版)、vue-blog-h5(H5版)、vue-blog-admin(blog后台管理系统)、node-server-api(blog服务端API)，用于个人博客的开发和管理。

- [在线预览](http://cycblog.cn) 
- [H5版在线预览](http://m.cycblog.cn) (浏览器访问请切换移动模式)

**该项目为本人自主设计与开发，一切以学习为主，如有改进及优化建议，请发送本人邮箱chenyicai622@qq.com**

**如果觉得不错，别忘了右上角，点个星星哟~~**

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 、[element-ui](https://github.com/ElemeFE/element)、[vant](https://vant-contrib.gitee.io/vant/#/zh-CN/)、[express](https://expressjs.com/)、[mongodb](https://www.mongodb.com/3)、[mongoose](https://mongoosejs.com/)，提前了解和学习这些知识会对使用本项目有很大的帮助。

<p align="center">
  <img src="http://resource.cycblog.cn/image/cyc-blog1.png">
</p>

<p align="center">
  <img src="http://resource.cycblog.cn/image/cyc-blog2.png">
</p>

<p align="center">
  <img src="http://resource.cycblog.cn/image/cyc-blog3.png">
</p>

<p align="center">
  <img src="http://resource.cycblog.cn/image/cyc-h5-blog1.png">
</p>

<p align="center">
  <img src="http://resource.cycblog.cn/image/cyc-h5-blog2.png">
</p>

<p align="center">
  <img  src="http://resource.cycblog.cn/image/cyc-h5-blog3.png">
</p>

<p align="center">
  <img src="http://resource.cycblog.cn/image/cyc-admin-blog1.png">
</p>

<p align="center">
  <img src="http://resource.cycblog.cn/image/cyc-admin-blog2.png">
</p>

<p align="center">
  <img src="http://resource.cycblog.cn/image/cyc-admin-blog3.png">
</p>



## 文件

```bash
# node-server-api
- api.js     API接口
- db.js      MongoDB连接配置及接口建表
- index.js   相关配置

# vue-blog-template/vue-blog-h5
- src
  - views
    - about       关于
    - album       相册
    - home        文章
    - updateLog   更新
    - whisper     留言
    
# vue-blog-admin
- src
  - views
    - basiceData
      - articleList.vue    文章
      - foodList.vue       图片
      - updateLogList.vue  更新
      - whisperList.vue    留言
```

## 开发

```bash
# 克隆项目
git clone https://github.com/JasonChen1719/vue-blog-template.git

# 进入项目目录
cd vue-blog-template

# 进入各版本目录
# PC版
cd vue-blog-template
# H5版
cd vue-blog-h5
# Admin
cd vue-blog-admin
# Server API
cd node-server-api

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
# PC版 
npm run serve
# H5版
npm run serve
# Admin
npm run dev
# Server API
node index.js
```

## 感谢

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [vue-h5-template](https://github.com/sunniejs/vue-h5-template)

## License

[MIT](https://github.com/JasonChen1719/vue-blog-template/blob/main/LICENSE)

Copyright (c) 2021 Jason Chen
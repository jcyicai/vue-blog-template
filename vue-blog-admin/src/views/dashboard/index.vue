<template>
  <div class="dashboard-container">
    <div class="header">
      <div class="avatar">
        <img
          :src="avatarImg"
          class="avatar-img"
        >
      </div>
      <div class="user-info">
        <div class="info-title">{{ info }}</div>
        <div class="info-content">Web前端开发工程师</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      username: '',
      avatarImg: 'http://resource.cycblog.cn/image/admin_logo.png',
      info: ''
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    getTimeState: function() {
      // 获取当前时间
      let timeNow = new Date() // 获取当前小时
      let hours = timeNow.getHours() // 设置默认文字
      if (hours >= 0 && hours <= 10) {
        this.info = `早上好， ${this.username}， 记得吃早餐哦！`
      } else if (hours > 10 && hours <= 14) {
        this.info = `中午好， ${this.username}， 午饭打算吃什么？`
      } else if (hours > 14 && hours <= 18) {
        this.info = `下午好， ${this.username}， 眼睛也要休息一下哦！`
      } else if (hours > 18 && hours <= 24) {
        this.info = `晚上好， ${this.username}， 晚饭吃了吗？`
      }
    }
  },
  created() {
    this.username = this.name
    this.getTimeState()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  .header {
    background: #fff;
    margin: 24px 0;
    padding: 20px 32px;
    display: flex;
    .avatar {
      margin-right: 20px;
      .avatar-img {
        border-radius: 50%;
        width: 72px;
        height: 72px;
        vertical-align: middle;
      }
    }
    .user-info {
      .info-title {
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin: 6px 0 20px 0;
      }
      .info-content {
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}
</style>

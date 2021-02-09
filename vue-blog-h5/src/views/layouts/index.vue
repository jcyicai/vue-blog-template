<template>
  <div class="app-container">
    <div class="layout-header">
      <Header :title="title"></Header>
    </div>
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabBars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import Header from '@/components/Header'
export default {
  name: 'AppLayout',
  data() {
    return {
      title: 'CYC Blog',
      titles: {
        0: 'CYC Blog',
        1: '留言',
        2: '相册',
        3: '更新',
        4: '关于'
      },
      tabBars: [
        {
          title: '首页',
          to: {
            name: 'Home'
          },
          icon: 'wap-home-o'
        },
        {
          title: '留言',
          to: {
            name: 'Whisper'
          },
          icon: 'more-o'
        },
        {
          title: '相册',
          to: {
            name: 'Album'
          },
          icon: 'photo-o'
        },
        {
          title: '更新',
          to: {
            name: 'UpdateLog'
          },
          icon: 'notes-o'
        },
        {
          title: '关于',
          to: {
            name: 'About'
          },
          icon: 'contact'
        }
      ]
    }
  },
  components: {
    TabBar,
    Header
  },
  mounted() {
    this.title = this.$route.meta.title
  },
  methods: {
    handleChange(v) {
      const title = this.titles[v]
      this.title = title
    }
  }
}
</script>

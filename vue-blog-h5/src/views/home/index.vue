<!-- home -->
<template>
  <div class="container">
    <div class="wrapper">
      <van-row>
        <van-swipe class="cyc-swiper" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <van-image :src="image" />
          </van-swipe-item>
        </van-swipe>
      </van-row>
      <van-row>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
          <van-cell v-for="item in list" :key="item._id" :title="item.title" :label="item.content" is-link
            :url="item.url" />
        </van-list>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getArticleList } from '@/api/common.js'
export default {
  name: 'Home',
  data() {
    return {
      title: 'CYC Blog',
      loading: false,
      finished: false,
      list: [],
      images: [
        'http://resource.cycblog.cn/image/sh.jpg',
        'http://resource.cycblog.cn/image/ws1.jpg',
        'http://resource.cycblog.cn/image/ws2.jpg'
      ],
      pageSize: 10,
      pageNum: 1,
      total: 0
    }
  },
  computed: {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getArticleList(params).then(res => {
        if (res.code == 200) {
          this.list.push(...res.data) // push新获取的数据
          this.total = res.total // 总条数
          this.loading = false
        }
      })
    },
    onLoad() {
      if (this.list.length >= this.total) {
        // 如果没有数据需要加载了就显示没有更多了
        this.finished = true
      } else {
        // 如果发现现有数组并没有达到总条数则加页继续发送请求
        this.pageNum++
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 47px;
  .wrapper {
    .cyc-swiper .van-swipe-item {
      /deep/ .van-image__img {
        width: 100%;
        height: 180px;
      }
    }
    i.van-icon.van-icon-arrow.van-cell__right-icon {
      display: none;
    }
  }
}
</style>

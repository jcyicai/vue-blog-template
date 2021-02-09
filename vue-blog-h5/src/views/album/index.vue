<template>
  <div class="container">
    <div class="wrapper">
      <van-row>
        <van-skeleton avatar :row="10" :loading="imgLoading">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
            :immediate-check="false">
            <van-row type="flex" justify="space-around">
              <van-col class="img-box" span="12" v-for="(item, index) in list" :key="index">
                <van-image :src="item.url" @click="handleImgPreview(item.url)" />
                <span class="img-name">{{item.name}}</span>
              </van-col>
            </van-row>
          </van-list>
        </van-skeleton>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAlbumList } from '@/api/common.js'
import { ImagePreview } from 'vant'
export default {
  name: 'Album',
  data() {
    return {
      loading: false,
      imgLoading: true,
      finished: false,
      list: [],
      imgList: [],
      pageSize: 10,
      pageNum: 1,
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getAlbumList(params).then(res => {
        if (res.code == 200) {
          this.list.push(...res.data) // push新获取的数据
          this.list.forEach(item => this.imgList.push(item.url))
          this.total = res.total // 总条数
          this.loading = false
          this.imgLoading = false
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
    },
    handleImgPreview(url) {
      this.imgList = []
      this.imgList.push(url)
      ImagePreview({
        images: this.imgList,
        showIndex: true,
        loop: false,
        showIndex: false,
        showIndicators: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 58px;
  .img-box {
    padding: 12px;
    text-align: center;
  }
}
</style>

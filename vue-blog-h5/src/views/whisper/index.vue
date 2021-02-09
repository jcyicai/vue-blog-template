<template>
  <div class="container">
    <div class="wrapper">
      <van-row>
        <van-form @submit="handleSubmit">
          <van-field v-model="desc" rows="2" autosize label="留言" type="textarea" maxlength="200"
            placeholder="如果想学什么菜，记得给我留言哟！" show-word-limit />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">发送</van-button>
          </div>
        </van-form>
      </van-row>
      <van-row>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
          <van-cell v-for="(item, index) in list" :key="index" :title="item.date" :label="item.content">
            <template slot="title">
              <div>
                <img :src="item.avatar" class="user-avatar">
                <span class="custom-text">{{item.date}}</span>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-row>
    </div>
  </div>
</template>

<script>
import { postSendWhisper, getWhisperList } from '@/api/common.js'
import { Dialog, Notify } from 'vant'
import { parseTime } from '@/utils'
export default {
  name: 'Whisper',
  data() {
    return {
      defaultAvatars: [
        'http://resource.cycblog.cn/image/default_user01.png',
        'http://resource.cycblog.cn/image/default_user02.png',
        'http://resource.cycblog.cn/image/default_user03.png',
        'http://resource.cycblog.cn/image/default_user04.png',
        'http://resource.cycblog.cn/image/default_user05.png',
        'http://resource.cycblog.cn/image/default_user06.png'
      ],
      loading: false,
      finished: false,
      list: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      desc: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSubmit() {
      const userIP = localStorage.getItem('IP')
      const userCity = localStorage.getItem('cityName')
      const avatar = this.defaultAvatars[Math.floor(Math.random() * this.defaultAvatars.length)]
      if (this.desc != '') {
        Dialog.confirm({
          title: '提示',
          message: '确认发送？',
          confirmButtonColor: '#41b883'
        }).then(() => {
          const params = {
            date: parseTime(new Date()),
            content: this.desc.trim(),
            userIP: userIP,
            userCity: userCity,
            avatar: avatar
          }
          postSendWhisper(params).then(res => {
            if (res.code === 200) {
              this.desc = ''
              this.pageNum = 1
              this.list = []
              this.getList()
            } else {
              Notify({ type: 'danger', message: res.message })
            }
          })
        })
      } else {
        Dialog.alert({ title: '提示', message: '亲，不写点什么？', confirmButtonColor: '#41b883' })
        return false
      }
    },
    getList() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getWhisperList(params).then(res => {
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
  padding-top: 58px;
  .van-button {
    background: #41b883;
    border-color: #41b883;
  }
  .user-avatar {
    width: 20px;
    height: 20px;
    vertical-align: -4px;
    margin-right: 6px;
  }
}
</style>

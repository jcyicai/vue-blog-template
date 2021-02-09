<template>
  <div class="container">
    <van-steps direction="vertical" active="-1">
      <van-step v-for="(item, index) in list" :key="index">
        <h3>{{ item.content }}</h3>
        <p>{{ item.info }}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
import { getUpdateLogList } from '@/api/common.js'
export default {
  name: 'UpdateLog',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getUpdateLogList().then(res => {
        if (res.code == 200) {
          this.list = res.data || []
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 58px;
  padding-bottom: 14px;
}
</style>

<template>
  <div class="container">
    <van-row>
      <van-nav-bar :title="title" fixed />
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 0
    },
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  /deep/ .van-nav-bar__title {
    font-weight: bold;
    color: #41b883;
  }
}
</style>

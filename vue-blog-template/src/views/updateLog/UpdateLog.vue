<template>
  <div class="update-main">
    <div class="update-title">
      <h2>更新日志</h2>
    </div>
    <div class="time-line" v-loading="loading">
      <el-timeline>
        <el-timeline-item
          v-for="list in lists"
          :key="list.logId"
          :timestamp="list.date"
          placement="top"
        >
          <el-card>
            <h4>{{ list.content }}</h4>
            <p>{{ list.info }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateLog",
  data() {
    return {
      loading: true,
      lists: []
    };
  },
  methods: {
    //获取列表数据
    getList: function() {
      this.loading = true;
      this.$axios.get("/api/blogUpdateLog/list").then(res => {
        let resData = res.data;
        if (resData.code === 200) {
          this.lists = resData.data;
          this.loading = false;
        } else {
          this.loading = false;
          this.$message({
            message: resData.message,
            type: "error"
          });
        }
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.update-main {
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  .update-title {
    text-align: center;
    margin-bottom: 40px;
  }
  /deep/ .el-loading-spinner .path {
    stroke: #41b883;
  }
  .time-line {
    padding-right: 350px;
  }
}
</style>

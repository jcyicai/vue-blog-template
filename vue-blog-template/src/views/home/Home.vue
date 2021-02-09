<template>
  <div class="home-main clearfix">
    <div class="list-box fl" v-loading="loading">
      <el-card
        shadow="hover"
        class="box-card pointer"
        v-for="list in lists"
        :key="list.listId"
      >
        <a
          target="_bank"
          :href="list.url"
          v-track-event="{
            category: 'link',
            action: 'click',
            opt_label: list.url
          }"
        >
          <h3 class="card-title">{{ list.title }}</h3>
          <p class="card-date">
            <i class="el-icon-date"></i><span>{{ list.date }}</span>
          </p>
          <p class="card-content">{{ list.content }}</p>
        </a>
      </el-card>
      <div class="page-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="info-box fr">
      <el-card class="about-card">
        <el-divider>关于我</el-divider>
        <div class="about-title">
          <img
            src="http://resource.cycblog.cn/image/admin_logo.png"
            alt="JasonChen的头像"
          />
        </div>
        <div class="about-content">
          <p>姓名：Jason Chen</p>
          <p>职位：Web前端开发工程师</p>
          <p>邮箱：chenyicai622@qq.com</p>
        </div>
      </el-card>
      <div class="carousel-box">
        <el-carousel :interval="4000" arrow="never">
          <el-carousel-item v-for="item in foods" :key="item._id">
            <img :src="item.url" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loading: true,
      currentPage: 1,
      total: 0,
      page: 1,
      pageSize: 10,
      pageNum: 1,
      lists: [],
      foods: []
    };
  },
  methods: {
    //获取美食
    getFoods: function() {
      this.loading = true;
      this.$axios.get("/api/blogFood/list").then(res => {
        let resData = res.data;
        if (resData.code === 200) {
          this.foods = this.getRandomArrayElements(resData.data, 3);
          this.loading = false;
        } else {
          this.loading = false;
          this.$message({
            message: resData.message,
            type: "error"
          });
        }
      });
    },
    //随机获取元素
    getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    //获取列表数据
    getList: function() {
      let para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.loading = true;
      this.$axios.get("/api/blogArticle/list", { params: para }).then(res => {
        let resData = res.data;
        if (resData.code === 200) {
          this.total = resData.total;
          this.currentPage = this.pageNum;
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
    },
    //改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    //条目改变时
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    }
  },
  created() {
    this.getFoods();
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.home-main {
  width: 1024px;
  margin: 0 auto;
  .list-box {
    width: calc(100% - 350px);
    padding: 0 30px 30px;
    /deep/ .el-loading-spinner .path {
      stroke: #41b883;
    }
    .page-box {
      text-align: center;
      /deep/ .el-pager {
        li {
          &:hover {
            color: #41b883;
          }
          &.active {
            background-color: #41b883;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
    .box-card {
      margin-bottom: 20px;
      /deep/ .el-card__body {
        padding: 10px 20px !important;
      }
      .card-title {
        margin: 10px 0;
        &:hover {
          color: #41b883;
        }
      }
      .card-date {
        font-size: 13px;
        color: #999;
        margin: 4px 0;
        i {
          margin-right: 6px;
        }
      }
      .card-content {
        margin: 6px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .info-box {
    padding: 0 30px 30px;
    width: 350px;
    .about-card {
      margin-bottom: 20px;
      .el-divider--horizontal {
        margin: 14px 0 !important;
        .el-divider__text {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .about-title {
        text-align: center;
        padding: 20px 0;
        img {
          height: 80px;
        }
      }
      .about-content {
        p {
          color: #555;
          padding: 2px;
          text-indent: 10px;
          background: #f6f6f6;
          border-radius: 6px;
        }
      }
    }
    .carousel-box {
      .el-carousel__item {
        img {
          height: 73%;
        }
      }
      /deep/ .el-carousel__indicators {
        top: 0;
        left: 10%;
        .el-carousel__button {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>

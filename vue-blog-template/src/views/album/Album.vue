<template>
  <div class="album-main">
    <div class="album-content">
      <div class="img-info clearfix">
        <img :src="imgUrl" />
        <div class="title">
          <p class="img-date">博主推荐</p>
          <p class="img-name">{{ imgName }}</p>
        </div>
      </div>
      <div class="img-list" v-loading="loading" id="images">
        <el-card shadow="never" v-for="list in lists" :key="list._id">
          <img :src="list.url" />
          <div class="img-item">
            <p class="img-date">{{ list.date }}</p>
            <p class="img-name">{{ list.name }}</p>
          </div>
        </el-card>
      </div>
      <div class="img-page">
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
  </div>
</template>

<script>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

export default {
  name: "Album",
  data() {
    return {
      loading: true,
      currentPage: 1,
      total: 0,
      page: 1,
      pageSize: 9,
      pageNum: 1,
      lists: [],
      imgUrl: "",
      imgName: "",
      imgList: [],
      viewer: null
    };
  },
  methods: {
    //获取所有照片
    getAllList: function() {
      this.$axios.get("/api/blogAlbum/allList").then(res => {
        let resData = res.data;
        if (resData.code === 200) {
          this.imgList = resData.data;
          let imgItem = this.imgList[
            Math.floor(Math.random() * this.imgList.length)
          ];
          this.imgUrl = imgItem.url;
          this.imgName = imgItem.name;
        } else {
          this.$message({
            message: resData.message,
            type: "error"
          });
        }
      });
    },
    //获取列表数据
    getList: function() {
      let para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.loading = true;
      this.$axios.get("/api/blogAlbum/list", { params: para }).then(res => {
        let resData = res.data;
        if (resData.code === 200) {
          this.total = resData.total;
          this.currentPage = this.pageNum;
          this.lists = resData.data;
          this.loading = false;
          this.$nextTick(function() {
            this.viewer.update();
          });
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
    this.getAllList();
    this.getList();
  },
  mounted() {
    const ViewerDom = document.getElementById("images");
    this.viewer = new Viewer(ViewerDom, {
      zoomable: false,
      transition: false,
      title: false
    });
  }
};
</script>

<style lang="scss" scoped>
.album-main {
  background: #fff;
  padding: 20px 0;
  .album-content {
    .img-info {
      padding: 30px 20px 90px 70px;
      img {
        float: left;
        width: 50%;
      }
      .title {
        float: left;
        margin-top: 124px;
        padding-left: 100px;
        p {
          margin: 10px 0;
        }
        .img-date {
          color: #ff7f21;
        }
        .img-name {
          font-size: 28px;
        }
      }
    }
    .img-list {
      display: flex;
      flex-wrap: wrap;
      img {
        cursor: pointer;
      }
      /deep/ .el-loading-spinner .path {
        stroke: #41b883;
      }
      /deep/ .el-card {
        flex: 0 0 33.3333%;
        padding: 35px 90px;
        border: none;
        .el-card__body {
          padding: 0;
          img {
            width: 100%;
          }
        }
        .img-item {
          padding: 8px 14px;
          .img-date {
            color: #999;
            font-size: 13px;
          }
          p {
            margin: 8px 0;
          }
        }
      }
    }
    .img-page {
      text-align: center;
      margin-top: 20px;
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
  }
}
</style>

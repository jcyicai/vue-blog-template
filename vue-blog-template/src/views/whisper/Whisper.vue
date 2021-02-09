<template>
  <div class="whisper-main">
    <div class="carousel-box">
      <el-carousel :interval="4000" type="card" :autoplay="autoplay">
        <el-carousel-item v-for="item in foods" :key="item._id">
          <img :src="item.url" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="whisper-content">
      <div class="whisper-form">
        <el-form ref="whisperForm" :model="whisperForm">
          <el-form-item class="item-bottom">
            <el-input
              class="textarea"
              type="textarea"
              rows="4"
              placeholder="如果想学什么菜，记得给我留言哟！！！"
              v-model="whisperForm.desc"
            ></el-input>
          </el-form-item>
          <el-form-item class="whisper-btn">
            <el-button
              type="primary"
              class="btn-green"
              @click.native.prevent="handleSubmit"
              v-track-event="{
                category: 'whisper',
                action: 'click'
              }"
              >发送</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="whisper-list">
        <div class="whisper-title">
          <p>
            全部留言<span class="total">{{ total }}</span>
          </p>
        </div>
        <div class="list-cont" v-loading="loading">
          <div class="cont-item" v-for="(list, index) in lists" :key="index">
            <img :src="list.avatar" class="avatar" />
            <p class="item-title clearfix">
              <span class="item-city">来自{{ list.userCity }}的朋友</span>
              <span class="item-date fr">{{ list.date }}</span>
            </p>
            <p class="item-cont">{{ list.content }}</p>
          </div>
        </div>
        <div class="whisper-page">
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
  </div>
</template>

<script>
import { parseTime } from "@/utils";

export default {
  name: "Whisper",
  data() {
    return {
      defaultAvatars: [
        "http://resource.cycblog.cn/image/default_user01.png",
        "http://resource.cycblog.cn/image/default_user02.png",
        "http://resource.cycblog.cn/image/default_user03.png",
        "http://resource.cycblog.cn/image/default_user04.png",
        "http://resource.cycblog.cn/image/default_user05.png",
        "http://resource.cycblog.cn/image/default_user06.png"
      ],
      whisperForm: {
        desc: ""
      },
      autoplay: true,
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
    handleSubmit() {
      let userIP = localStorage.getItem("IP");
      let userCity = localStorage.getItem("cityName");
      let avatar = this.defaultAvatars[
        Math.floor(Math.random() * this.defaultAvatars.length)
      ];
      if (this.whisperForm.desc != "") {
        this.$confirm("确认发送?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "dialog-cancel-btn",
          confirmButtonClass: "dialog-confirm-btn",
          type: "warning"
        }).then(() => {
          this.$axios
            .post("/api/blogWhisper/insert", {
              date: parseTime(new Date()),
              content: this.whisperForm.desc.trim(),
              userIP: userIP,
              userCity: userCity,
              avatar: avatar
            })
            .then(res => {
              let resData = res.data;
              if (resData.code === 200) {
                this.whisperForm.desc = "";
                this.$message({
                  message: resData.message,
                  type: "success"
                });
                this.getList();
              } else {
                this.$message({
                  message: resData.message,
                  type: "error"
                });
              }
            });
        });
      } else {
        this.$message({
          message: "亲，不写点什么？",
          type: "warning"
        });
        return false;
      }
    },
    //获取列表数据
    getList: function() {
      let para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.loading = true;
      this.$axios.get("/api/blogWhisper/list", { params: para }).then(res => {
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
    //获取美食
    getFoods: function() {
      this.$axios.get("/api/blogFood/list").then(res => {
        let resData = res.data;
        if (resData.code === 200) {
          this.foods = this.getRandomArrayElements(resData.data, 6);
        } else {
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
.whisper-main {
  padding: 20px 0 10px;
  background: #fff;
  .carousel-box {
    padding: 30px;
    .el-carousel__item {
      text-align: center;
      img {
        height: 100%;
      }
    }
  }
  .whisper-content {
    padding: 0 60px;
    .whisper-form {
      /deep/ .el-textarea__inner {
        &:focus {
          border-color: #41b883;
        }
      }
      .item-bottom {
        margin-bottom: 12px;
      }
      .whisper-btn {
        text-align: right;
        .btn-green {
          color: #fff;
          background: #41b883;
          border-color: #41b883;
          padding: 8px 18px;
          &:hover {
            background: rgba(65, 184, 131, 0.8);
          }
        }
      }
    }
    .whisper-list {
      .whisper-title {
        p {
          font-size: 14px;
          .total {
            color: red;
            padding: 0 10px;
            font-weight: bold;
          }
        }
      }
      /deep/ .el-loading-spinner .path {
        stroke: #41b883;
      }
      .list-cont {
        .cont-item {
          padding: 20px 0 20px 76px;
          border-bottom: 1px solid #e5e5e5;
          position: relative;
          .avatar {
            position: absolute;
            left: 0;
            top: 15px;
            height: 60px;
          }
          p {
            margin: 0;
            color: #333;
            font-size: 14px;
            word-wrap: break-word;
            white-space: pre-line;
          }
          .item-title {
            margin-bottom: 18px;
          }
        }
      }
    }
    .whisper-page {
      text-align: center;
      padding: 20px 0;
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

const mongoose = require("mongoose");
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect(
  "mongodb://127.0.0.1:27017/blog", //mongodb默认27017端口，自行创建数据库文件
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) {
      console.log("连接失败:" + err);
    } else {
      console.log("连接成功");
    }
  }
);

/************** 定义模式Schema **************/
//登录
const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    date: {
      type: Date,
      default: Date.now
    }
  },
  { collection: "user", versionKey: false }
);

//文章
const articleSchema = new mongoose.Schema(
  {
    date: String,
    title: String,
    content: String,
    url: String
  },
  { collection: "articles", versionKey: false }
);

//留言
const whisperSchema = new mongoose.Schema(
  {
    userIP: String,
    userCity: String,
    date: String,
    content: String,
    avatar: String
  },
  { collection: "whispers", versionKey: false }
);

//更新记录
const updateLogSchema = new mongoose.Schema(
  {
    date: String,
    info: String,
    content: String
  },
  { collection: "updateLogs", versionKey: false }
);

//美食
const foodSchema = new mongoose.Schema(
  {
    date: String,
    url: String,
    name: String
  },
  { collection: "foods", versionKey: false }
);

/************** 定义模型Model **************/
const Models = {
  Food: mongoose.model("Food", foodSchema),
  User: mongoose.model("User", userSchema),
  Article: mongoose.model("Article", articleSchema),
  Whisper: mongoose.model("Whisper", whisperSchema),
  UpdateLog: mongoose.model("UpdateLog", updateLogSchema)
};

module.exports = Models;

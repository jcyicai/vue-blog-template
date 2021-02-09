"use strict";
const db = require("./db");
const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

//博客文章列表
router.get("/api/blogArticle/list", (req, res) => {
  let limit = req.query.pageSize || 15; //分页参数
  let currentPage = req.query.pageNum || 1; //当前页码
  if (currentPage < 1) {
    currentPage = 1;
  }
  db.Article.find({}, function(err, ress) {
    if (err) return res.send({ code: -1, message: "请求失败" });
    let all = ress.length;
    db.Article.find()
      .sort({ _id: -1 })
      .skip((parseInt(currentPage) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .exec(function(err, docs) {
        if (err) {
          res.send({ code: -1, message: "请求失败" });
        }
        res.send({
          code: 200,
          message: "请求成功",
          total: all,
          data: docs
        });
      });
  });
});

//博客留言发送
router.post("/api/blogWhisper/insert", (req, res) => {
  db.Whisper.create(req.body, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "发送失败" });
    } else {
      res.send({
        code: 200,
        message: "发送成功",
        data: data
      });
    }
  });
});

//博客留言列表
router.get("/api/blogWhisper/list", (req, res) => {
  let limit = req.query.pageSize || 15; //分页参数
  let currentPage = req.query.pageNum || 1; //当前页码
  if (currentPage < 1) {
    currentPage = 1;
  }
  db.Whisper.find({}, function(err, ress) {
    if (err) return res.send({ code: -1, message: "请求失败" });
    let all = ress.length;
    db.Whisper.find()
      .sort({ date: -1 })
      .skip((parseInt(currentPage) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .exec(function(err, docs) {
        if (err) {
          res.send({ code: -1, message: "请求失败" });
        }
        res.send({
          code: 200,
          message: "请求成功",
          total: all,
          data: docs
        });
      });
  });
});

//更新记录列表
router.get("/api/blogUpdateLog/list", (req, res) => {
  db.UpdateLog.find({}, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "请求失败" });
    } else {
      res.send({
        code: 200,
        message: "请求成功",
        data: data.reverse()
      });
    }
  });
});

//美食
router.get("/api/blogFood/list", (req, res) => {
  db.Food.find({}, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "请求失败" });
    } else {
      res.send({
        code: 200,
        message: "请求成功",
        data: data
      });
    }
  });
});

//相册
router.get("/api/blogAlbum/list", (req, res) => {
  let limit = req.query.pageSize || 9; //分页参数
  let currentPage = req.query.pageNum || 1; //当前页码
  if (currentPage < 1) {
    currentPage = 1;
  }
  db.Food.find({}, function(err, ress) {
    if (err) return res.send({ code: -1, message: "请求失败" });
    let all = ress.length;
    db.Food.find()
      .sort({ _id: -1 })
      .skip((parseInt(currentPage) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .exec(function(err, docs) {
        if (err) {
          res.send({ code: -1, message: "请求失败" });
        }
        res.send({
          code: 200,
          message: "请求成功",
          total: all,
          data: docs
        });
      });
  });
});

//所有照片
router.get("/api/blogAlbum/allList", (req, res) => {
  db.Food.find({}, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "请求失败" });
    } else {
      res.send({
        code: 200,
        message: "请求成功",
        data: data
      });
    }
  });
});

//登录
router.post("/user/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.User.find({ username: username }, (err, users) => {
    if (err) {
      res.send(err);
      return;
    }
    if (users.length === 0) {
      res.send({ code: -1, message: "该用户不存在" });
    } else if (users[0].password === password) {
      let content = { username: username }; // 要生成token的主题信息
      let secretOrPrivateKey = "cyc"; // 这是加密的key（密钥）
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: "1h" // 1小时过期
      });
      res.send({
        code: 200,
        message: "登陆成功",
        data: { token: token }
      });
    } else if (users[0].password !== password) {
      res.send({ code: -1, message: "密码不正确，请重新输入" });
    }
  });
});

//用户信息
router.get("/user/info", (req, res) => {
  let token = req.query.token; // 从body中获取token
  let secretOrPrivateKey = "cyc"; // 这是加密的key（密钥）
  jwt.verify(token, secretOrPrivateKey, function(err, data) {
    if (err) {
      res.send({ code: -1, message: "登录超时" });
    } else {
      res.send({ code: 200, data: data, message: "登录成功" });
    }
  });
});

//用户退出
router.post("/user/logout", (req, res) => {
  res.send({ code: 200, message: "退出成功" });
});

//获取文章
router.get("/article/list", (req, res) => {
  let limit = req.query.pageSize || 12; //分页参数
  let currentPage = req.query.pageNum || 1; //当前页码
  if (currentPage < 1) {
    currentPage = 1;
  }
  db.Article.find({}, function(err, ress) {
    if (err) return res.send({ code: -1, msg: "请求失败" });
    let all = ress.length;
    db.Article.find()
      .sort({ _id: -1 })
      .skip((parseInt(currentPage) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .exec(function(err, docs) {
        if (err) {
          res.send({ code: -1, message: "请求失败" });
        }
        res.send({
          code: 200,
          message: "请求成功",
          total: all,
          data: docs
        });
      });
  });
});

//文章新增
router.post("/article/create", (req, res) => {
  db.Article.create(req.body, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "新增失败" });
    } else {
      res.send({
        code: 200,
        message: "新增成功",
        data: data
      });
    }
  });
});

//文章更新
router.post("/article/update", (req, res) => {
  let id = req.body._id;
  db.Article.update(
    { _id: id },
    {
      $set: {
        date: req.body.date,
        title: req.body.title,
        content: req.body.content,
        url: req.body.url
      }
    },
    (err, data) => {
      if (err) {
        res.send({ code: -1, message: "更新失败" });
      } else {
        res.send({
          code: 200,
          message: "更新成功"
        });
      }
    }
  );
});

//文章删除
router.post("/article/delete", (req, res) => {
  let id = req.body._id;
  db.Article.remove({ _id: id }, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "删除失败" });
    } else {
      res.send({
        code: 200,
        message: "删除成功"
      });
    }
  });
});

//获取留言
router.get("/whisper/list", (req, res) => {
  let limit = req.query.pageSize || 15; //分页参数
  let currentPage = req.query.pageNum || 1; //当前页码
  if (currentPage < 1) {
    currentPage = 1;
  }
  db.Whisper.find({}, function(err, ress) {
    if (err) return res.send({ code: -1, msg: "请求失败" });
    let all = ress.length;
    db.Whisper.find()
      .sort({ date: -1 })
      .skip((parseInt(currentPage) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .exec(function(err, docs) {
        if (err) {
          res.send({ code: -1, message: "请求失败" });
        }
        res.send({
          code: 200,
          message: "请求成功",
          total: all,
          data: docs
        });
      });
  });
});

//留言新增
router.post("/whisper/create", (req, res) => {
  db.Whisper.create(req.body, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "新增失败" });
    } else {
      res.send({
        code: 200,
        message: "新增成功",
        data: data
      });
    }
  });
});

//留言更新
router.post("/whisper/update", (req, res) => {
  let id = req.body._id;
  db.Whisper.update(
    { _id: id },
    {
      $set: {
        date: req.body.date,
        content: req.body.content,
        userIP: req.body.userIP,
        userCity: req.body.userCity,
        avatar: req.body.avatar
      }
    },
    (err, data) => {
      if (err) {
        res.send({ code: -1, message: "更新失败" });
      } else {
        res.send({
          code: 200,
          message: "更新成功"
        });
      }
    }
  );
});

//留言删除
router.post("/whisper/delete", (req, res) => {
  let id = req.body._id;
  db.Whisper.remove({ _id: id }, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "删除失败" });
    } else {
      res.send({
        code: 200,
        message: "删除成功"
      });
    }
  });
});

//获取更新记录
router.get("/updateLog/list", (req, res) => {
  let limit = req.query.pageSize || 15; //分页参数
  let currentPage = req.query.pageNum || 1; //当前页码
  if (currentPage < 1) {
    currentPage = 1;
  }
  db.UpdateLog.find({}, function(err, ress) {
    if (err) return res.send({ code: -1, msg: "请求失败" });
    let all = ress.length;
    db.UpdateLog.find()
      .sort({ date: -1 })
      .skip((parseInt(currentPage) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .exec(function(err, docs) {
        if (err) {
          res.send({ code: -1, message: "请求失败" });
        }
        res.send({
          code: 200,
          message: "请求成功",
          total: all,
          data: docs
        });
      });
  });
});

//更新记录新增
router.post("/updateLog/create", (req, res) => {
  db.UpdateLog.create(req.body, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "新增失败" });
    } else {
      res.send({
        code: 200,
        message: "新增成功",
        data: data
      });
    }
  });
});

//更新记录更新
router.post("/updateLog/update", (req, res) => {
  let id = req.body._id;
  db.UpdateLog.update(
    { _id: id },
    {
      $set: {
        date: req.body.date,
        info: req.body.info,
        content: req.body.content
      }
    },
    (err, data) => {
      if (err) {
        res.send({ code: -1, message: "更新失败" });
      } else {
        res.send({
          code: 200,
          message: "更新成功"
        });
      }
    }
  );
});

//更新记录删除
router.post("/updateLog/delete", (req, res) => {
  let id = req.body._id;
  db.UpdateLog.remove({ _id: id }, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "删除失败" });
    } else {
      res.send({
        code: 200,
        message: "删除成功"
      });
    }
  });
});

//获取美食
router.get("/food/list", (req, res) => {
  let limit = req.query.pageSize || 15; //分页参数
  let currentPage = req.query.pageNum || 1; //当前页码
  if (currentPage < 1) {
    currentPage = 1;
  }
  db.Food.find({}, function(err, ress) {
    if (err) return res.send({ code: -1, msg: "请求失败" });
    let all = ress.length;
    db.Food.find()
      .sort({ _id: -1 })
      .skip((parseInt(currentPage) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .exec(function(err, docs) {
        if (err) {
          res.send({ code: -1, message: "请求失败" });
        }
        res.send({
          code: 200,
          message: "请求成功",
          total: all,
          data: docs
        });
      });
  });
});

//美食新增
router.post("/food/create", (req, res) => {
  db.Food.create(req.body, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "新增失败" });
    } else {
      res.send({
        code: 200,
        message: "新增成功",
        data: data
      });
    }
  });
});

//美食更新
router.post("/food/update", (req, res) => {
  let id = req.body._id;
  db.Food.update(
    { _id: id },
    {
      $set: {
        date: req.body.date,
        url: req.body.url,
        name: req.body.name
      }
    },
    (err, data) => {
      if (err) {
        res.send({ code: -1, message: "更新失败" });
      } else {
        res.send({
          code: 200,
          message: "更新成功"
        });
      }
    }
  );
});

//美食删除
router.post("/food/delete", (req, res) => {
  let id = req.body._id;
  db.Food.remove({ _id: id }, (err, data) => {
    if (err) {
      res.send({ code: -1, message: "删除失败" });
    } else {
      res.send({
        code: 200,
        message: "删除成功"
      });
    }
  });
});

module.exports = router;

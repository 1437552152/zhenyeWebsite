/*
 * @Description:
 * @Author: yfye
 * @Date: 2021-01-24 10:50:29
 * @LastEditTime: 2021-01-31 14:33:48
 * @LastEditors: yfye
 */
const express = require("express");
const app = express();
const router = express.Router();
const db = require("../conf/conf.js");
const moment = require("moment");
const {
  EmailConfig
} = require("../exportFun/email/email");
const jwt = require("jsonwebtoken"); //用来生成token
var responseData;
router.use(function (req, res, next) {
  responseData = {
    code: 0, //为0时表示注册成功
    message: "",
  };
  next();
});
/**,
 * @swagger
 * /api/register:
 *    post:
 *      tags:
 *      - 博客用户操作
 *      summary: 注册
 *      parameters:
 *      - name: nickName
 *        in: query
 *        description: 昵称
 *        required: true
 *      - name: password
 *        in: query
 *        description: 密码
 *        required: true
 *      - name: email
 *        in: query
 *        description: 邮箱
 *        required: true
 *      - name: type
 *        in: query
 *        description: 1.表示QQ邮箱  2.表示163
 *        required: true
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
/* 注册 */
router.post("/register", function (req, res) {
  let {
    nickName,
    password,
    email,
    type
  } = req.body;
  if (!nickName || !password || !email) {
    responseData.code = 1;
    responseData.message = "填写的参数不完整";
    res.json(responseData);
  }
  /* 验证邮箱格式 */
  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!myreg.test(email)) {
    responseData.code = 1;
    responseData.message = "请填写正确的邮箱格式";
    res.json(responseData);
  } else {
    let sql = `SELECT * FROM BlogUser  where email='${email}'`;
    db.query(sql, function (err, results) {
      if (err) {
        responseData.code = 1;
        responseData.message = err;
        res.json(responseData);
      } else {
        if (!results.length) {
          var timestamp = new Date().getTime();
          let sql =
            "insert  into  registerTable(token,creatTime,nickName,password,email) values(?,?,?,?,?)";
          var param = [
            timestamp,
            moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
            nickName,
            password,
            email,
          ];
          db.query(sql, param, function (err, results) {
            if (err) {
              responseData.code = 1;
              responseData.message = err.toString();
              res.json(responseData);
            } else {
              EmailConfig(
                (type = 1),
                email,
                "pyjBlog邮箱注册",
                `请点击<a href='http://localhost:8087/api/registerCheck?time=${timestamp}' target="_blank">去申请</a>pyjBlog邮箱注册`,
                function (data) {
                  responseData.message =
                    "验证链接已发送到您的邮箱里,请前去验证";
                  res.json(responseData);
                }
              );
            }
          });
        } else {
          responseData.code = 1;
          responseData.message = "该邮箱已经注册,请换用其它邮箱";
          res.json(responseData);
        }
      }
    });
  }
});


/**,
 * @swagger
 * /api/webLogin:
 *    post:
 *      tags:
 *      - 博客用户操作
 *      summary: 登录
 *      parameters:
 *      - name: email
 *        in: query
 *        description: 邮箱
 *        required: true
 *      - name: password
 *        in: query
 *        description: 密码
 *        required: true
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
/* 登陆 */
router.post("/webLogin", function (req, res) {
  let {
    password,
    email
  } = req.body;
  let sql1 = `SELECT * from BlogUser where isShow=0 and email='${email}'`;
  db.query(sql1, (err, respon) => {
    if (err) {
      responseData.message = err;
      res.json(responseData);
    }

    if (!respon.length) {
      responseData.message = "暂无该用户";
      responseData.code = 1;
      res.json(responseData);
    } else {
      if (respon[0].password !== password) {
        responseData.message = "您输入的邮箱和密码不正确";
        responseData.code = 1;
        res.json(responseData);
      } else {
        let secretOrPrivateKey = "jwt";
        let content = {
          id: respon[0].id,
          email: respon[0].email,
          password: respon[0].password,
        };
        let token = jwt.sign(content, secretOrPrivateKey, {
          expiresIn: 60 * 60 * 12,
        });
        /*   jwt.verify(token, secretOrPrivateKey, (err, decode) => {   
            console.log(decode);
        }); */
        responseData.message = "";
        responseData.code = 0;
        responseData.data = respon[0];
        responseData.data.token = token;
        responseData.data.creatTime = moment(respon[0].time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        delete responseData.data.password;
        res.json(responseData);
      }
    }
  });
});
/**,
 * @swagger
 * /api/getCode:
 *    post:
 *      tags:
 *      - 博客用户操作
 *      summary: 找回密码(发送验证码到邮箱)
 *      parameters:
 *      - name: email
 *        in: query
 *        description: 邮箱
 *        required: true
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
/* 找回密码 */
router.post("/getCode", function (req, res) {
  let {
    email
  } = req.body;
  if (!email) {
    responseData.code = 1;
    responseData.message = "邮箱不能为空";
    res.json(responseData);
  }
  let sql = `SELECT * FROM BlogUser  where email='${email}'`;
  db.query(sql, function (err, results) {
    if (!results.length) {
      responseData.code = 1;
      responseData.message = "您未注册该邮箱账号";
      res.json(responseData);
    } else {
      var timestamp = new Date().getTime();
      let sql1 = "UPDATE BlogUser SET verfiyCode=? where email=?";
      var param = [timestamp, email];
      db.query(sql1, param, function (err, results) {
        if (err) {
          responseData.code = 1;
          responseData.message = err.toString();
          res.json(responseData);
        } else {
          EmailConfig(
            (type = 1),
            email,
            "pyjBlog密码找回",
            `验证码:${timestamp}`,
            function (data) {
              responseData.message = "验证码已发送到您的邮箱里,请前去验证";
              res.json(responseData);
            }
          );
        }
      });
    }
  });
});


/**,
 * @swagger
 * /api/findPassword:
 *    post:
 *      tags:
 *      - 博客用户操作
 *      summary: 找回密码
 *      parameters:
 *      - name: email
 *        in: query
 *        description: 邮箱
 *        required: true
 *      - name: verfiyCode
 *        in: query
 *        description: 邮箱验证码code
 *        required: true
 *      - name: newPassword
 *        in: query
 *        description: 新的密码
 *        required: true
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
router.post('/findPassword', function (req, res) {
  let {
    email,
    verfiyCode,
    newPassword
  } = req.body;
  if (!email || !verfiyCode || !newPassword) {
    responseData.code = 1;
    responseData.message = "参数不完整";
    res.json(responseData);
  }

  let sql = `SELECT * FROM BlogUser  where email='${email}'`;
  db.query(sql, function (err, results) {
    if (!results.length) {
      responseData.code = 1;
      responseData.message = "您未注册该邮箱账号";
      res.json(responseData);
    } else {
      if (results[0].verfiyCode != verfiyCode) {
        responseData.code = 1;
        responseData.message = "邮箱验证码输入错误，请确认后重新输入";
        res.json(responseData);
      } else {
        let sql1 = "UPDATE BlogUser SET password=? where email=?";
        var param = [newPassword, email];
        db.query(sql1, param, function (err, results) {
          if (err) {
            responseData.code = 1;
            responseData.message = err.toString();
            res.json(responseData);
          } else {
            responseData.code = 0;
            responseData.message = "您已成功找回密码";
            res.json(responseData);
          }
        });
      }
    }
  })
})

/**,
 * @swagger
 * /api/CommentList:
 *    post:
 *      tags:
 *      - 博客用户操作
 *      summary: 评论列表
 *      parameters:
 *      - name: BlogId
 *        in: query
 *        description: 博客id
 *        required: true
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
router.post('/CommentList', function (req, res) {
  let {
    BlogId
  } = req.body;
  let sql = `SELECT * FROM comment where BlogId='${BlogId}'  ORDER BY creatTime DESC `;
  db.query(sql, function (err, results) {
    if (!results.length) {
      responseData.code = 0;
      responseData.message = "";
      responseData.data = [];
      res.json(responseData);
    } else {
      responseData.code = 0;
      responseData.message = "";
      responseData.data = results;
      res.json(responseData);
    }
  })
})

/**,
 * @swagger
 * /api/joinComment:
 *    post:
 *      tags:
 *      - 博客用户操作
 *      summary: 加入评论
 *      parameters:
 *      - name: BlogId
 *        in: query
 *        description: 博客id
 *        required: true
 *      - name: userId
 *        in: query
 *        description: 评论人的id
 *        required: true
 *      - name: userName
 *        in: query
 *        description: 评论人的名字
 *        required: true
 *      - name: receiverId
 *        in: query
 *        description: 接收人的id
 *        required: false
 *      - name: receiverName
 *        in: query
 *        description: 接收人的名字
 *        required: false
 *      - name: content
 *        in: query
 *        description: 评论内容
 *        required: true
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
router.post('/joinComment', function (req, res) {
  let {
    userId,
    userName,
    receiverId,
    receiverName,
    content,
    BlogId
  } = req.body;
  var timestamp = new Date().getTime();
  let sql =
    "insert  into  comment(userId,userName,receiverId,receiverName,creatTime,content,BlogId) values(?,?,?,?,?,?,?)";
  var param = [
    userId,
    userName,
    receiverId,
    receiverName,
    moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
    content,
    BlogId
  ];
  db.query(sql, param, function (err, results) {
    if (err) {
      responseData.code = 1;
      responseData.message = err.toString();
      res.json(responseData);
    } else {
      responseData.code = 0;
      responseData.message = '新增成功';
      res.json(responseData);
    }
  })
});


/**,
 * @swagger
 * /api/deleteComment:
 *    post:
 *      tags:
 *      - 博客用户操作
 *      summary: 评论删除
 *      parameters:
 *      - name: id
 *        in: query
 *        description: 评论id
 *        required: true
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
router.post('/deleteComment', function (req, res) {
  let {id} = req.body;
  console.log(id);
  let sql =`delete  from  comment where id=${id}`;
  db.query(sql, function (err, results) {
    if (err) {
      responseData.code = 1;
      responseData.message = err.toString();
      res.json(responseData);
    } else {
      responseData.code = 0;
      responseData.message = '删除成功';
      res.json(responseData);
    }
  })
});

module.exports = router;

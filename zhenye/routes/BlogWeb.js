/*
 * @Description:
 * @Author: yfye
 * @Date: 2021-01-24 10:50:29
 * @LastEditTime: 2021-01-24 17:27:55
 * @LastEditors: yfye
 */
const express = require("express");
const app = express();
const router = express.Router();
const db = require("../conf/conf.js");
const moment = require("moment");
var responseData;
router.use(function (req, res, next) {
  responseData = {
    code: 0, //为0时表示注册成功
    message: "",
  };
  next();
});

router.get("/registerCheck", function (req, res) {
  if (!req.query.time) {
    responseData.code = 1;
    responseData.message = "参数不正确";
    res.render("registerCheck", { responseData });
  }
  let sql = `SELECT * FROM registerTable  where token='${req.query.time}'`;
  db.query(sql, function (err, results) {
    if (err) {
      responseData.code = 1;
      responseData.message = err;
      res.json(responseData);
    } else {
      if (!results.length) {
        responseData.code = 1;
        responseData.message = "参数不正确";
        res.render("registerCheck", { responseData });
      } else {
        /* 查看是否注册成功 */
        let sql = `SELECT * FROM BlogUser  where email='${results[0].email}'`;
        db.query(sql, function (err, results) {
          if (err) {
            responseData.code = 1;
            responseData.message = err;
            res.render("registerCheck", { responseData });
          } else {
            if (!results.length) {
              var timestamp = new Date().getTime();
              let sqlSert =
                "insert  into  BlogUser(nickName,password,email,creatTime) values(?,?,?,?)";
              var param = [
                results[0].nickName,
                results[0].password,
                results[0].email,
                moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
              ];
              db.query(sqlSert, param, function (err, results) {
                if (err) {
                  responseData.code = 1;
                  responseData.message = err.toString();
                  res.render("registerCheck", { responseData });
                } else {
                  responseData.message = "注册成功";
                  res.render("registerCheck", { responseData });
                }
              });
            } else {
              responseData.code = 1;
              responseData.message = "您已注册";
              res.render("registerCheck", { responseData });
            }
          }
        });
      }
    }
  });
});


router.get("/", function (req, res) {
   res.render('index')
});
router.get("/index.html", function (req, res) {
  res.render('index')
})

module.exports = router;

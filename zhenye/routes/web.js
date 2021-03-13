 /*
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-14 02:30:06
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require('express');
const app = express();
const db = require("../conf/conf.js");
const router = express.Router();
const {
  baseConfig,
  productList,productAll,
  newsList,newsdetail,productdetail
} = require('../exportFun/standard');

// 首页请求
router.get('/', function (req, res) {
  res.render('index', {
    data: {}
  })
});

router.get('/login', function (req, res) {
  res.render('login', {
    data: {}
  })
});

/* 职位列表 */
router.get('/jobList.html', function (req, res) {
  let sql = "SELECT * FROM Carousel where isShow=0";
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
       res.render('jobList',{
        msg: "操作成功",
        status: "200",
        data: results
      });
    }
  });
});

router.get('/jobListDetail.html', function (req, res) {
  let id=req.query.id;
  let sql = `SELECT * FROM Carousel where id=${id}`;
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
     } else {
   let sql1 = `SELECT * FROM baseConfig where user_id=${results[0].user_id}`;
   db.query(sql1, function (err1, results1) {
    if (err1) {
      res.json({
        msg: err1.toString(),
        code: 500,
      });
     } else {
      res.render('jobListDetail',{
        msg: "操作成功",
        status: "200",
        data:   Object.assign(results[0],results1[0]) 
      });
     }})
    }
  });
});

router.get('/resume.html', function (req, res) {
  let id=req.query.id;
  let sql = `SELECT * FROM pcUser where id=${id}`;
  db.query(sql, function (err1, results) {
   if (err1) {
     res.json({
       msg: err1.toString(),
       code: 500,
     });
    } else {
     console.log(results[0])

      res.render('resume', {
        data:results[0]
      })
    }})
});

router.get('/record.html', function (req, res) {
  let id=req.query.id;
  let sql = `SELECT * FROM signUp where userId=${id}`;
  db.query(sql, function (err1, results) {
   if (err1) {
     res.json({
       msg: err1.toString(),
       code: 500,
     });
    } else {
      console.log(results)
      res.render('record', {
        data:results
      })
    }})
});


module.exports = router;

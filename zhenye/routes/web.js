/*
 * @Description:
 * @version:
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yfye
 * @LastEditTime: 2021-02-23 21:54:02
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const app = express();
const router = express.Router();
const db = require("../conf/conf.js");
var moment = require("moment");
var utils = require("../utils/utlis");
var async = require("async");
var images = require("images");
let params = "";
let baseUrl = "";
var task1 = function (callback) {
  var url = baseUrl + "/download.html?id=" + params;
  utils.createQr(url, function (err, data) {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }
    callback(null, data);
  });
};

var task2 = function (waterImg, callback) {
  //原图
  var sourceImg = "public/images/font.jpg";
  utils.addWater(sourceImg, waterImg, function (data) {
    callback(null, data);
  });
};

/* 
接口拦截
*/
let requestData = {
  callback: "",
  code: "",
  msg: "",
  status: "ok",
  url: "",
};

// 首页请求
router.get("/", function (req, res) {
  res.redirect(302, "/index.html");
});
router.get("/index.html", function (req, res) {
  res.render("two");
});

function timestamptostr(timestampStr) {
  var  timestamp = parseInt(timestampStr);
  if(timestampStr.length<11){
    timestamp = parseInt(timestampStr) * 1000;
  }
       d = new Date(timestamp);
       var jstimestamp = (d.getFullYear())+"-"+(d.getMonth()+1)+"-"+(d.getDate())+" "+(d.getHours())+":"+(d.getMinutes())+":"+(d.getSeconds());
       return jstimestamp;
  }

router.get("/detail.html", function (req, res) {
    if(!req.query.id){
      res.json("暂无数据");
    }else{
      let sql = `SELECT * FROM ims_goods where is_delete=0 and id=${req.query.id}`;
      db.query(sql, function (err, results) {
        if (err) {
          res.json(err);
          throw err;
        } else {
          let params=results[0];
          params.addtime=moment(params.addtime).format("YYYY-MM-DD");
          params.birthday=  moment(params.birthday+10000000).format("YYYY-MM-DD");
          res.render("detail",params);
        }
      });
    }
});

router.get("/mobiledetail.html", function (req, res) {
  if(!req.query.id){
    res.json("暂无数据");
  }else{
    let sql = `SELECT * FROM ims_goods where is_delete=0 and id=${req.query.id}`;
    db.query(sql, function (err, results) {
      if (err) {
        res.json(err);
        throw err;
      } else {
        let params=results[0];
        params.addtime=moment(params.addtime).format("YYYY-MM-DD");
        params.birthday=moment(params.birthday+10000000).format("YYYY-MM-DD");
        res.render("mobiledetail",params);
      }
    });
  }
});



router.post("/findData", function (req, res) {
  if (!req.body.name) {
    requestData.code = 0;
    requestData.msg = "对不起，请您输入姓名";
    res.json(requestData);
  } else if (!req.body.cert && !req.body.idnumber) {
    requestData.code = 0;
    requestData.msg = "证书编号（身份证号）至少输入一个";
    res.json(requestData);
  } else {
    let sql = "";
    if (req.body.cert && !req.body.idnumber) {
       sql = `SELECT * FROM ims_goods where is_delete=0 and cert='${req.body.cert}' and name='${req.body.name}'`;
    } else if (!req.body.cert && req.body.idnumber) {
       sql = `SELECT * FROM ims_goods where is_delete=0 and idnumber='${req.body.idnumber}' and name='${req.body.name}'`;
    } else {
       sql = `SELECT * FROM ims_goods where is_delete=0 and idnumber='${req.body.idnumber}' and cert='${req.body.cert}' and name='${req.body.name}'`;
    }
    db.query(sql, function (err, results) {
      if (err) {
        requestData.code = 0;
        requestData.msg = "对不起，您输入的信息不正确";
        res.json(requestData);
        throw err;
      } else {
        if(results.length){
          requestData.code=1;
          requestData.id=results[0].id;
          res.json(requestData);
        }else{
          requestData.code = 0;
          requestData.msg = "对不起，您输入的信息不正确";
          res.json(requestData);
        }
      }
    });
  }
});
module.exports = router;

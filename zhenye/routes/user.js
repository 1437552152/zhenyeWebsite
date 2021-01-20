/*
 * @Description:
 * @version:
 * @Date: 2019-08-20 00:29:24
 * @LastEditors  : yfye
 * @LastEditTime : 2021-01-20 16:09:52
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const app = express();
const router = express.Router();
const db = require("../conf/conf.js");
const formaDate = require("../utils/date.js");
const multer = require("multer");
const logger = require("../logs/logger.js");
//var request = require('request');
//统一返回格式
var responseData;
router.use(function (req, res, next) {
  responseData = {
    code: 0,
    message: "",
  };
  next();
});
// 字段说明
//  isShow：0 表示展示      1 表示物理删除即隐藏
//首页报名数据
router.post("/baoming", function (req, res) {
  let mobile = req.body.mobile;
  let email = req.body.email;
  let name = req.body.name;
  let country = req.body.country;
  let content = req.body.content;
  let time = formatDate();
  if (
    country == "" ||
    mobile == "" ||
    email == "" ||
    name == "" ||
    content == ""
  ) {
    res.json({
      msg: "提交失败,所有输入框的值不能为空",
      status: "201",
    });
    return false;
  }
  let isShow = 0;
  let sql =
    "insert  into  MessageBoard(mobile,email,name,country,content,time,isShow) values(?,?,?,?,?,?,?)";
  var params = [mobile, email, name, country, content, time, isShow];
  db.query(sql, params, function (err, results) {
    if (err) {
      res.json({
        msg: err,
        status: "0",
      });
      throw err;
    } else {
      res.json({
        msg: "提交成功",
        status: "200",
      });
    }
  });
});





//获取当前时间
function formatDate() {
  //把时间戳转化为日期对象
  let date = new Date();
  //调用封装，参数为日期对象和时间格式
  return formaDate.formaDate(date, "yyyy-MM-dd hh:mm");
}
//------------------------------图片上传------------------------------------------
//获取时间
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate =
    date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate.toString();
}
var datatime = "public/images/" + getNowFormatDate();
//将图片放到服务器
var storage = multer.diskStorage({
  // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
  destination: datatime,
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var timestamp = (new Date()).valueOf();
    cb(null,`${timestamp}.png`);
  },
});
var upload = multer({
  storage: storage,
});
router.post("/upload", upload.single("picUrl"), function (req, res) {
  res.json({
    state: 200,
    ret_code: req.file.path.split("public/").join(""),
  });
});
module.exports = router;

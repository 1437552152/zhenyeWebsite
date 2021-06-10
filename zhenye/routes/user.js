/*
 * @Description:
 * @version:
 * @Date: 2019-08-20 00:29:24
 * @LastEditors  : yfye
 * @LastEditTime : 2021-04-10 17:21:30
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
const i18n = require("i18n");
i18n.configure({
  locales: ["en", "zh-CN"],
  cookie: "locale",
  directory: __dirname + "/locales",
  defaultLocale: "zh-CN",
});
app.use(i18n.init);
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

/****登录与注册***/
router.post("/register", (req, res) => {
  let phone = req.body.phone;
  let pwd = req.body.pwd;

  if (phone == "" || pwd == "") {
    res.json({ msg: "参数不正确", status: 0 });
    return false;
  }

  db.query(`select * from pcUser  where  phone=${phone}`, (err, results) => {
    console.log(results);
    if (results&&results[0] && results[0].phone) {
      res.json({ msg: "您已注册", status: 0 });
      return false;
    }
    db.query(
      `INSERT INTO pcUser(phone, pwd) VALUES (${phone},${pwd})`,
      (err) => {
        res.json({ msg: "注册成功", status: 1 });
      }
    );
  });
});

/****登录与注册***/
router.post("/login", (req, res) => {
  let phone = req.body.phone;
  let pwd = req.body.pwd;
  if (!phone || !pwd) {
    res.json({ msg: "参数不正确", status: 0 });
    return false;
  }

  db.query(`select * from pcUser  where  phone=${phone}`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (results[0] && results[0].pwd && results[0].pwd == pwd) {
      res.json({ msg: "", status: 1, userInfo: results[0] });
    } else {
      res.json({ msg: "密码不正确", status: 0 });
    }
  });
});

router.post("/updateResume", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let sex = req.body.sex;
  let briday = req.body.briday;
  let NativePlace = req.body.NativePlace;
  let qqNum = req.body.qqNum;
  let school = req.body.school;
  let education = req.body.education;
  let major = req.body.major;
  let email = req.body.email;

  let sql =
    "UPDATE pcUser  set name=?,sex=?,briday=?,NativePlace=?,qqNum=?,school=?,education=?,major=?,email=?  where id=?";
  let param = [
    name,
    sex,
    briday,
    NativePlace,
    qqNum,
    school,
    education,
    major,
    email,
    id,
  ];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 0,
      });
    } else {
      res.json({
        msg: "修改成功",
        status: 1,
      });
    }
  });
});

router.post("/deleteJob", (req, res) => {
  let id = req.body.id;
  db.query(`select * from demandInfo  where  id=${id}`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (results[0].status != 0) {
      res.json({
        msg: "该需求已报名，不能被删除",
        status: 0,
      });
    } else {
      db.query(`DELETE FROM demandInfo WHERE id=${id}`, (err, ress) => {
        if (err) {
          console.log(err);
          return;
        }
        res.json({
          msg: "删除成功",
          status: 1,
        });
      });
    }
  });
});

router.post("/AddDemand", (req, res) => {
  let name = req.body.name;
  let userId = req.body.userId;
  let demandType = req.body.demandType;
  let demandAble = req.body.demandAble;
  let jobXZ = req.body.jobXZ;
  let jobZZMin = req.body.jobZZMin;
  let jobZZMax = req.body.jobZZMax;
  let address = req.body.address;
  let hzjy = req.body.hzjy;
  let xlyq = req.body.xlyq;
  let xqyh = req.body.xqyh;
  let xqms = req.body.xqms;
  let hzdz = req.body.hzdz;
  let email = req.body.email;
  let userName = req.body.userName;
  let time = formatDate();
  let sql =
    "insert  into demandInfo(name,userId,demandType,demandAble,jobXZ,jobZZMin,jobZZMax,address,hzjy,xlyq,xqyh,xqms,hzdz,email,userName,time) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var param = [
    name,
    userId,
    demandType,
    demandAble,
    jobXZ,
    jobZZMin,
    jobZZMax,
    address,
    hzjy,
    xlyq,
    xqyh,
    xqms,
    hzdz,
    email,
    userName,
    time,
  ];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      res.json({
        msg: "发布成功",
        status: "200",
      });
    }
  });
});
/* 去报名需求 */
router.post("/goBaoming", (req, res) => {
  let id = req.body.id;
  let recipientUserId = req.body.recipientUserId;
  let sql =
  "UPDATE demandInfo  set recipientUserId=?,status=1  where id=?";
let param = [
  recipientUserId,
  id
];
db.query(sql, param, function (err, results) {
  if (err) {
    res.json({
      msg: err.toString(),
      code: 0,
    });
  } else {
    res.json({
      msg: "报名成功",
      status: 1,
    });
  }
});
});

// 查询用户信息
router.post("/userInfo", (req, res) => {
  let id = req.body.id;
  db.query(`select * from pcUser  where  id=${id}`, (err, results) => {
  if (err) {
    res.json({
      msg: err.toString(),
      code: 0,
    });
  } else {
    res.json({
      msg: "查询成功",
      status: 1,
      data:results[0]
    });
  }
});
})
// 修改报名状态
router.post("/checkBaoming", (req, res) => {
  let id = req.body.id;
  let status = req.body.status;
  let recipientUserId=req.body.recipientUserId;
  let updateTime = formatDate();
  let sql=
  "UPDATE demandInfo  set  status=?,updateTime=?,recipientUserId=?  where id=?"; 
let param = [
  status,
  updateTime,
  status==0?'':recipientUserId,
  id,
];
console.log(param);
db.query(sql, param, function (err, results) {
  if (err) {
    res.json({
      msg: err.toString(),
      code: 0,
    });
  } else {
    res.json({
      msg: "审核成功",
      status: 1,
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
    cb(null, file.originalname);
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

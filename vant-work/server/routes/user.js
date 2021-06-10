/*
 * @Description:
 * @version:
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yfye
 * @LastEditTime: 2021-06-10 22:50:51
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const app = express();
const router = express.Router();
const db = require("../conf/conf.js");
const formaDate = require("../utils/date.js");
const multer = require("multer");
//统一返回格式
var responseData;
router.use(function(req, res, next) {
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

    db.query(`select * from userInfo  where  phone=${phone}`, (err, results) => {
        console.log(results);
        if (results[0] && results[0].phone) {
            res.json({ msg: "您已注册", status: 0 });
            return false;
        }
        db.query(
            `INSERT INTO userInfo(phone, pwd) VALUES (${phone},${pwd})`,
            (err) => {
                res.json({ msg: "注册成功", status: 1 });
            }
        );
    });
});

// 列表
router.get('/blogList', function(req, res) {
    let sql = "SELECT * FROM blogInfo";
    if (req.query.value) {
        sql = sql + ` where name LIKE '%${req.query.value}%'`
    }

    if (req.query.id) {
        sql = sql + ` where userId = '${req.query.id}'`
    }

    console.log(sql);
    db.query(sql, function(err, results) {
        if (err) {
            res.json({
                msg: err.toString(),
                code: 500,
            });
        } else {
            res.json({
                msg: "操作成功",
                status: 1,
                data: results
            });
        }
    });
});


// 详情
router.get('/blogDetail', function(req, res) {
    let id = req.query.id;
    let sql = `SELECT * FROM blogInfo where id=${id}`;
    db.query(sql, function(err1, results) {
        if (err1) {
            res.json({
                msg: err1.toString(),
                code: 500,
            });
        } else {
            res.json({
                msg: "操作成功",
                status: 1,
                data: results[0]
            });
        }
    })
});

// 查看自身信息
router.get('/resume', function(req, res) {
    let id = req.query.id;
    let sql = `SELECT * FROM userInfo where id=${id}`;
    db.query(sql, function(err1, results) {
        if (err1) {
            res.json({
                msg: err1.toString(),
                code: 500,
            });
        } else {
            res.json({
                msg: "操作成功",
                status: 1,
                data: results[0]
            })
        }
    })
});


// 修改简历
router.post("/updateResume", (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let headpic = req.body.headpic;
    let content = req.body.content;
    let sql =
        "UPDATE userInfo  set name=?,headpic=?,content=?,email=?  where id=?";
    let param = [
        name,
        headpic,
        content,
        email,
        id,
    ];
    db.query(sql, param, function(err, results) {
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

// 删除博客
router.get('/deleteBlog', function(req, res) {
    let id = req.query.id;
    let sql = `DELETE FROM blogInfo WHERE id=${id}`;
    db.query(sql, function(err1, results) {
        if (err1) {
            res.json({
                msg: err1.toString(),
                code: 500,
            });
        } else {
            res.json({
                msg: "操作成功",
                status: 1
            })
        }
    })
});

// 新增博客
router.post("/addBlog", (req, res) => {
    let name = req.body.name;
    let userId = req.body.userId;
    let userName = req.body.userName;
    let imageUrl = req.body.imageUrl;
    let descc = req.body.descc;
    let content = req.body.content;
    let time = formatDate();
    let sql =
        "insert into blogInfo(name,userId,userName,imageUrl,descc,content,time) values(?,?,?,?,?,?,?)";
    var param = [
        name,
        userId,
        userName,
        imageUrl,
        descc,
        content,
        time,
    ];
    db.query(sql, param, function(err, results) {
        if (err) {
            res.json({
                msg: err.toString(),
                code: 500,
            });
        } else {
            res.json({
                msg: "发布成功",
                status: 1,
            });
        }
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

    db.query(`select * from userInfo  where  phone='${phone}'`, (err, results) => {
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



router.post("/deleteJob", (req, res) => {
    let id = req.body.id;
    db.query(`select * from blogInfo  where  id=${id}`, (err, results) => {
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
            db.query(`DELETE FROM blogInfo WHERE id=${id}`, (err, ress) => {
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
        "insert  into blogInfo(name,userId,demandType,demandAble,jobXZ,jobZZMin,jobZZMax,address,hzjy,xlyq,xqyh,xqms,hzdz,email,userName,time) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
    db.query(sql, param, function(err, results) {
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
        "UPDATE blogInfo  set recipientUserId=?,status=1  where id=?";
    let param = [
        recipientUserId,
        id
    ];
    db.query(sql, param, function(err, results) {
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
        db.query(`select * from userInfo  where  id=${id}`, (err, results) => {
            if (err) {
                res.json({
                    msg: err.toString(),
                    code: 0,
                });
            } else {
                res.json({
                    msg: "查询成功",
                    status: 1,
                    data: results[0]
                });
            }
        });
    })
    // 修改报名状态
router.post("/checkBaoming", (req, res) => {
    let id = req.body.id;
    let status = req.body.status;
    let recipientUserId = req.body.recipientUserId;
    let updateTime = formatDate();
    let sql =
        "UPDATE blogInfo  set  status=?,updateTime=?,recipientUserId=?  where id=?";
    let param = [
        status,
        updateTime,
        status == 0 ? '' : recipientUserId,
        id,
    ];
    console.log(param);
    db.query(sql, param, function(err, results) {
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
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({
    storage: storage,
});
router.post("/upload", upload.single("picUrl"), function(req, res) {
    res.json({
        state: 200,
        ret_code: req.file.path.split("public/").join(""),
    });
});
module.exports = router;
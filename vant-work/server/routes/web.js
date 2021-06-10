 /*
  * @Description: 
  * @version: 
  * @Date: 2019-08-20 00:29:24
  * @LastEditors: yfye
  * @LastEditTime: 2021-04-21 00:11:54
  * @Author: yeyifu
  * @LastModifiedBy: yeyifu
  */
 const express = require('express');
 const app = express();
 const db = require("../conf/conf.js");
 const router = express.Router();
 // 首页请求
 router.get('/', function(req, res) {
     let sql = "SELECT * FROM demandInfo where status=4";
     db.query(sql, function(err, results) {
         if (err) {
             res.json({
                 msg: err.toString(),
                 code: 500,
             });
         } else {
             res.render('index', {
                 msg: "操作成功",
                 status: "200",
                 data: results
             });
         }
     });
 });

 router.get('/login', function(req, res) {
     res.render('login', {
         data: {}
     })
 });

 router.get('/create.html', function(req, res) {
     res.render('create', {
         data: {}
     })
 });



 //供使用者调用  
 function trim(s) {
     return trimRight(trimLeft(s));
 }
 //去掉左边的空白  
 function trimLeft(s) {
     if (s == null) {
         return "";
     }
     var whitespace = new String(" \t\n\r");
     var str = new String(s);
     if (whitespace.indexOf(str.charAt(0)) != -1) {
         var j = 0,
             i = str.length;
         while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
             j++;
         }
         str = str.substring(j, i);
     }
     return str;
 }

 //去掉右边的空白 www.2cto.com   
 function trimRight(s) {
     if (s == null) return "";
     var whitespace = new String(" \t\n\r");
     var str = new String(s);
     if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
         var i = str.length - 1;
         while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
             i--;
         }
         str = str.substring(0, i + 1);
     }
     return str;
 }
 /* 职位列表 */
 router.get('/jobList.html', function(req, res) {
     let key = req.query.key;
     let sql1 = "SELECT * FROM demandInfo where status=0";
     if (trim(key)) {
         sql1 = `SELECT * FROM demandInfo where status=0 and name LIKE '%${key}%'`;
     }
     let sql = `${sql1};SELECT * FROM demandInfo where status=0;`

     console.log(sql);

     db.query(sql, function(err, results) {
         if (err) {
             res.json({
                 msg: err.toString(),
                 code: 500,
             });
         } else {
             let arr = [];
             results[1].map(item => {
                 arr.push(item.name)
             });
             res.render('jobList', {
                 msg: "操作成功",
                 status: "200",
                 data: results[0],
                 title: req.query.key,
                 titleArr: arr.join(',')
             });
         }
     });
 });

 router.get('/jobListDetail.html', function(req, res) {
     let id = req.query.id;
     let sql = `SELECT * FROM Carousel where id=${id}`;
     db.query(sql, function(err, results) {
         if (err) {
             res.json({
                 msg: err.toString(),
                 code: 500,
             });
         } else {
             let sql1 = `SELECT * FROM baseConfig where user_id=${results[0].user_id}`;
             db.query(sql1, function(err1, results1) {
                 if (err1) {
                     res.json({
                         msg: err1.toString(),
                         code: 500,
                     });
                 } else {
                     res.render('jobListDetail', {
                         msg: "操作成功",
                         status: "200",
                         data: Object.assign(results[0], results1[0])
                     });
                 }
             })
         }
     });
 });

 router.get('/resume.html', function(req, res) {
     let id = req.query.id;
     let sql = `SELECT * FROM pcUser where id=${id}`;
     db.query(sql, function(err1, results) {
         if (err1) {
             res.json({
                 msg: err1.toString(),
                 code: 500,
             });
         } else {
             console.log(results[0])

             res.render('resume', {
                 data: results[0]
             })
         }
     })
 });

 router.get('/haveRefuseResumes.html', function(req, res) {
     let id = req.query.id || 11;
     let sql = `SELECT * FROM demandInfo where userId=${id}`;
     db.query(sql, function(err1, results) {
         if (err1) {
             res.json({
                 msg: err1.toString(),
                 code: 500,
             });
         } else {
             res.render('haveRefuseResumes', {
                 data: results
             })
         }
     })
 });

 router.get('/autoFilterResumes.html', function(req, res) {
     let id = req.query.id;
     let sql = `SELECT * FROM demandInfo where userId=${id}`;
     db.query(sql, function(err1, results) {
         if (err1) {
             res.json({
                 msg: err1.toString(),
                 code: 500,
             });
         } else {
             console.log(results);
             res.render('autoFilterResumes', {
                 data: results.filter((item) => item.recipientUserId)
             })
         }
     })
 });


 router.get('/toudi.html', function(req, res) {
     let id = req.query.id;
     let sql = `SELECT * FROM demandInfo where id=${id}`;
     db.query(sql, function(err1, results) {
         if (err1) {
             res.json({
                 msg: err1.toString(),
                 code: 500,
             });
         } else {

             let sql1 = `SELECT * FROM pcUser where id=${results[0].userId}`;
             db.query(sql1, function(err, resu) {
                 if (err) {
                     res.json({
                         msg: err1.toString(),
                         code: 500,
                     });
                 } else {
                     let params = {};
                     params.jobInfo = results[0];
                     params.userInfo = resu[0];
                     res.render('toudi', {
                         data: params
                     })
                 }
             });
         }
     })
 });
 module.exports = router;
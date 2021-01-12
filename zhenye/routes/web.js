 /*
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-12 19:14:52
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require('express');
const app = express();
const router = express.Router();
const db = require("../conf/conf.js");
var moment = require('moment');
var utils = require('../utils/utlis');
var async = require('async');
var images = require("images");
let params='';
let baseUrl=''
var task1 = function(callback){
  var url = baseUrl+'/download.html?id='+params;
  utils.createQr(url,function(err, data){
      if(err){
          console.log(err);
          callback(err, null);
          return;
      }
      callback(null,data);
  })
};

var task2 = function(waterImg, callback){
  //原图
  var sourceImg = 'public/images/font.jpg';
  utils.addWater(sourceImg, waterImg, function(data){
      callback(null, data);
  })
};

/* 
接口拦截
*/
let requestData={
callback:'',
code:'',
msg:'',
status:'ok',
url:''
}

// 首页请求
router.get('/', function (req, res) {
  res.redirect(302, '/index.html');
});
router.get('/index.html', function (req, res) {
  res.render('index')
});


router.post('/detail', function (req, res) {
   baseUrl=req.headers.origin;
  let sql = `SELECT * FROM certificate where isShow=0 and id=${req.body.id}`;
  db.query(sql, function (err, results) {
    if (err) {
      res.json(requestData);
      throw err;
    } else {
     var data=results[0];
     data.bg='/svgfile/bg.png';
     data.sex=data.sex?'男':'女';
     data.focusPic='/images/'+ data.focusPic.split('images')[1];
     data.CertPic='/images/'+ data.CertPic.split('images')[1];
     data.DateOfIssue=moment(data.DateOfIssue).format('YYYY年MM月DD日');
     data.brithday=moment(data.brithday).format('YYYY年MM月DD日');
     data.ApprovedDate=moment(data.ApprovedDate).format('YYYY年MM月DD日');   
     params=data.id;    
     requestData.code="";
     requestData.msg=data;
     requestData.status="ok";           
     async.waterfall([task1,task2], function(err, result){
       if(err){
           console.log(err);
           return;
       }
       requestData.msg.erweima=result;
       res.json(requestData)                
   })  
    }
  });
});


router.get('/download.html', function (req, res) {
  res.render('download') 
});

router.post('/findData', function (req, res) {
  baseUrl=req.headers.origin;
   if(!req.body.name){
    requestData.code="title";
    requestData.msg="对不起，请您输入姓名";
    requestData.status="error";
    res.json(requestData)
   }else if(req.body.by==1&&!req.body.IDCard){
    requestData.code="";
    requestData.msg="号为必填项，社会保障号（身份证号）和证书编号二选一";
    requestData.status="error";
    res.json(requestData) 
   }else if(req.body.by==2&&!req.body.CertificateNo){
    requestData.code="";
    requestData.msg="号为必填项，社会保障号（身份证号）和证书编号二选一";
    requestData.status="error"; 
    res.json(requestData)
   }else{
     console.log(req.body);
      if(req.body.by==1){
        let sql = `SELECT * FROM certificate where isShow=0 and IDCard=${req.body.IDCard}`;
        db.query(sql, function (err, results) {
          if (err) {
            res.json(requestData);
            throw err;
          } else {
             if(!results.length){
              requestData.code="";
              requestData.msg="对不起，您输入的社会保障号（身份证号）和证书编号不正确";
              requestData.status="error";     
              res.json(requestData);
             }else{
               if(results[0].name!=req.body.name){
                requestData.code="";
                requestData.msg="对不起，您输入的姓名不正确";
                requestData.status="error";     
                res.json(requestData);
               }else{
                var data=results[0];
                data.bg='/svgfile/bg.png';
                data.sex=data.sex?'男':'女';
                data.focusPic='/images/'+ data.focusPic.split('images')[1];
                data.CertPic='/images/'+ data.CertPic.split('images')[1];
                data.DateOfIssue=moment(data.DateOfIssue).format('YYYY年MM月DD日');
                data.brithday=moment(data.brithday).format('YYYY年MM月DD日');
                data.ApprovedDate=moment(data.ApprovedDate).format('YYYY年MM月DD日');   
                params=data.id;    
                requestData.code="";
                requestData.msg=data;
                requestData.status="ok";  
                
                async.waterfall([task1,task2], function(err, result){
                  if(err){
                      console.log(err);
                      return;
                  }
                  requestData.msg.erweima=result;
                  res.json(requestData);                 
              })
               }
             }         
          }
        });
      }else if(req.body.by==2){
        let sql = `SELECT * FROM certificate where isShow=0 and CertificateNo=${req.body.CertificateNo}`;
        db.query(sql, function (err, results) {
          if (err) {
            res.json(requestData);
            throw err;
          } else {
             if(!results.length){
              requestData.code="";
              requestData.msg="对不起，您输入的社会保障号（身份证号）和证书编号不正确";
              requestData.status="error";     
              res.json(requestData);
             }else{
               if(results[0].name!=req.body.name){
                requestData.code="";
                requestData.msg="对不起，您输入的姓名不正确";
                requestData.status="error";     
                res.json(requestData);
               }else{
                var data=results[0];
                data.bg='/svgfile/bg.png';
                data.focusPic='/images/'+ data.focusPic.split('images')[1];
                data.CertPic='/images/'+ data.CertPic.split('images')[1];
                data.sex=data.sex?'男':'女';
                data.DateOfIssue=moment(data.DateOfIssue).format('YYYY年MM月DD日');
                data.brithday=moment(data.brithday).format('YYYY年MM月DD日');
                data.ApprovedDate=moment(data.ApprovedDate).format('YYYY年MM月DD日');
                params=data.id;
                requestData.code="";
                requestData.msg=data;
                requestData.status="ok";     
                async.waterfall([task1,task2], function(err, result){
                  if(err){
                      console.log(err);
                      return;
                  }
                  requestData.msg.erweima=result;
                  res.json(requestData);                 
              })
               }
             }         
          }
        });
      }    
   }
});











module.exports = router;

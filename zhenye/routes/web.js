 /*
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-11 00:25:59
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require('express');
const app = express();
const router = express.Router();
const db = require("../conf/conf.js");
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

router.post('/findData', function (req, res) {
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
                requestData.code="";
                requestData.msg=`<div class='p10 tc'><a title='点击打开大图' target="_blank" href=" "><img height="750" src=${results[0].CertPic} alt=""></a></div><div class="xiazaizs bka tc"><a target="_blank" href=${results[0].CertPic} download=${results[0].CertPic}>下载证书</a></div>`;
                requestData.status="ok";     
                res.json(requestData);
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
                requestData.code="";
                requestData.msg=`<div class='p10 tc'><a title='点击打开大图' target="_blank"><img height="750" src=${results[0].CertPic} alt=""></a></div><div class="xiazaizs bka tc"><a target="_blank" href=${results[0].CertPic} download=${results[0].CertPic}>下载证书</ a></div>`;
                requestData.status="ok";     
                res.json(requestData);
               }
             }         
          }
        });
      }    
   }
});











module.exports = router;

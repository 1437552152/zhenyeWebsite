/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-20 21:45:44
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const app = express();
const router = express.Router();
const db = require("../conf/conf.js");
const formaDate = require("../utils/date.js");
const multer = require("multer");
const logger=require('../logs/logger.js');
const i18n=require('i18n');
i18n.configure({
  locales:['en','zh-CN'],
  cookie:'locale',
  directory:__dirname+'/locales',
  defaultLocale:'zh-CN'
})
app.use(i18n.init);

router.get('/',function(req, res){
//   res.render('index',{
//    title:i18n.__('fail')
// })
  res.redirect(302, '/en/index.html');
});

router.get('/:lang/index.html',function(req, res){
  i18n.setLocale('en'); 
  res.render('index',{
   title:i18n.__('fail'),
   lang:req.params.lang
})
});
module.exports = router;

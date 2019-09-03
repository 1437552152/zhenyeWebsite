/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-09-03 01:30:09
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require('express');
const app = express();
const router = express.Router();
const {
  baseConfig,
  productList
} = require('../exportFun/standard');
const i18n = require('i18n');
let responseData = {};

i18n.configure({
  locales: ['en', 'cn'],
  cookie: 'locale',
  directory: __dirname + '/locales',
  defaultLocale: 'cn'
});
app.use(i18n.init);

// 模糊查询
// SELECT * FROM `magazine` WHERE CONCAT(IFNULL(`title`,''),IFNULL(`tag`,''),IFNULL(`description`,'')) LIKE ‘%关键字%’
//const setLang = (req, res, next) => {
//    res.setLocale('zh-tw');
 //    next();
 //};
//app.use(setLang);




/* 
接口拦截
*/
const setLang = function (params) {
  i18n.setLocale(params);
};

// 首页请求
router.get('/', function (req, res) {
  res.redirect(302, '/en/index.html');
});

//首页请求
router.get('/:lang/index.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
	//  title:i18n.__('fail')	
      responseData.title = "振达官网首页";
      responseData.lang = req.params.lang;
      responseData.href = 'index';
      responseData.indexData = respon;
      return productList(req.params.lang == 'en' ? 4 : 5)
    }).then(success => {
	  responseData.productList = success;
      res.render('index', {
        data: responseData
      })
    }).catch((error) => {});
});

//关于我们
router.get('/:lang/about.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
	//  title:i18n.__('fail')	
      responseData.title = "公司简介";
      responseData.lang = req.params.lang;
      responseData.href = 'about';
      responseData.indexData = respon;
      return productList(req.params.lang == 'en' ? 4 : 5)
    }).then(success => {
	  responseData.productList = success;
      res.render('about', {
        data: responseData
      })
    }).catch((error) => {});
});

//产品中心
router.get('/:lang/product.html', function (req, res) {
  setLang(req.params.lang);
  res.render('product', {
    title: '产品列表',
    lang: req.params.lang,
    href: 'product'
  });
});

//新闻中心
router.get('/:lang/news.html', function (req, res) {
  setLang(req.params.lang);
  res.render('news', {
    title: '新闻中心',
    lang: req.params.lang,
    href: 'news'
  });
});

//联系我们
router.get('/:lang/contact.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
	//  title:i18n.__('fail')	
      responseData.title = "联系我们";
      responseData.lang = req.params.lang;
      responseData.href = 'about';
      responseData.indexData = respon;
      return productList(req.params.lang == 'en' ? 4 : 5)
    }).then(success => {
	  responseData.productList = success;
      res.render('contact', {
        data: responseData
      })
    }).catch((error) => {});
});

module.exports = router;

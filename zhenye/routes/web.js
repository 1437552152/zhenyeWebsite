/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-09-03 23:23:52
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require('express');
const app = express();
const router = express.Router();
const {
  baseConfig,
  productList,
  newsList,newsdetail
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
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
      responseData.title = "产品列表";
      responseData.lang = req.params.lang;
      responseData.href = 'product';
      responseData.indexData = respon;
      return productList(req.params.lang == 'en' ? 4 : 5)
    }).then(success => {
	  responseData.productList = success;
      res.render('product', {
        data: responseData
      })
    }).catch((error) => {});
});

//新闻中心
router.get('/:lang/news.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
     responseData.title = "新闻中心";
      responseData.lang = req.params.lang;
      responseData.href = 'news';
      responseData.indexData = respon;
      return productList(req.params.lang == 'en' ? 4 : 5)
    }).then(success => {
    responseData.productList = success;   
    return newsList(req.params.lang == 'en' ? 4 : 5,req.query.page&&Number(req.query.page)>0?Number(req.query.page):1,10)  
    }).then(newlist=>{
      responseData.newCommon= newlist;
      res.render('news', {
        data: responseData
      })
    }).catch((error) => {});
});

/* 新闻详情 */
router.get('/:lang/newdetail/:id.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {  
      responseData.lang = req.params.lang;
      responseData.href = 'news';
      responseData.indexData = respon;
      return newsdetail(req.params.lang == 'en' ? 4 : 5,req.params.id)
    }).then(success => {
    responseData.newsDetail = success;   
    responseData.title =responseData.newsDetail.data.now[0].title;  
    res.render('newsdetail', {
      data: responseData
    })
    }).catch((error) => {});
});









//联系我们
router.get('/:lang/contact.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
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

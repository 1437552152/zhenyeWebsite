﻿ /*
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-16 11:05:48
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require('express');
const app = express();
const router = express.Router();
const {
  baseConfig,
  productList,productAll,
  newsList,newsdetail,productdetail
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

/* 
接口拦截
*/
const setLang = function (params) {
  i18n.setLocale(params);
};

// 首页请求
router.get('/', function (req, res) {
  setLang('en');
  baseConfig(4)
    .then((respon) => {
	    responseData.lang ='en';
      responseData.href = 'index';
      responseData.language=i18n;
      responseData.indexData = respon;
      return productList(4)
    }).then(success => {
	  responseData.productList = success;
      res.render('index', {
        data: responseData
      })
    }).catch((error) => {});
});
//后台页
// 首页请求

/* router.get('/zhenda/*', function (req, res) {
  res.render("dist/index.html");
}); */

//首页请求
router.get('/:lang/index.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
	    responseData.lang = req.params.lang;
      responseData.href = 'index';
      responseData.language=i18n;
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
      responseData.lang = req.params.lang;
      responseData.href = 'about';
      responseData.language=i18n;
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
  const id=req.query.id;
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
       responseData.lang = req.params.lang;
      responseData.href = 'product';
      responseData.id = req.query.id;
      responseData.language=i18n;
      responseData.indexData = respon;
      return productList(req.params.lang == 'en' ? 4 : 5)
    }).then(success => {
    responseData.productList = success;
      return  productAll(req.params.lang == 'en' ? 4 : 5,id,req.query.page&&Number(req.query.page)>0?Number(req.query.page):1,9)
    }).then(xxx=>{
      responseData.productAll=xxx;   
      res.render('product', {
        data: responseData
      })
    }).catch((error) => {});
});

/* 产品详情 */
router.get('/:lang/productdetail/:id.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {  
      responseData.lang = req.params.lang;
      responseData.href = 'product';
      responseData.language=i18n;
      responseData.indexData = respon;
      return productdetail(req.params.lang == 'en' ? 4 : 5,req.params.id)
    }).then(success => {
    responseData.productdetail = success;   
    responseData.title =responseData.productdetail.data.now[0].title;  
    res.render('productdetail', {
      data: responseData
    })
    }).catch((error) => {});
});

//新闻中心
router.get('/:lang/news.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
      responseData.language=i18n;
      responseData.lang = req.params.lang;
      responseData.href = 'news';
      responseData.newStatus = -1;
      responseData.indexData = respon;
      return productList(req.params.lang == 'en' ? 4 : 5)
    }).then(success => {
    responseData.productList = success;   
    return newsList(req.params.lang == 'en' ? 4 : 5,req.query.page&&Number(req.query.page)>0?Number(req.query.page):1,8)  
    }).then(newlist=>{
      responseData.newCommon= newlist;
      res.render('news', {
        data: responseData
      })
    }).catch((error) => {});
});

/* 新闻分类 */
//新闻中心
router.get('/:lang/:newStatus/news.html', function (req, res) {
  setLang(req.params.lang);
  baseConfig(req.params.lang == 'en' ? 4 : 5)
    .then((respon) => {
      responseData.language=i18n;
      responseData.lang = req.params.lang;
      responseData.href = 'news';
      responseData.newStatus =req.params.newStatus;
      responseData.indexData = respon;
      return productList(req.params.lang == 'en' ? 4 : 5)
    }).then(success => {
    responseData.productList = success;   
    return newsList(req.params.lang == 'en' ? 4 : 5,req.query.page&&Number(req.query.page)>0?Number(req.query.page):1,8,req.params.newStatus)  
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
      responseData.language=i18n;
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
     responseData.language=i18n;
      responseData.lang = req.params.lang;
      responseData.href = 'contact';
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

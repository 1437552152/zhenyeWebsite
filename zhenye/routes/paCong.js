/*
 * @Description:
 * @version:
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-31 21:11:59
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const app = express();
const db = require("../conf/conf.js");
const router = express.Router();
var fs = require("fs");
const https = require("https");
const cheerio = require("cheerio");
var request = require("request");
var moment = require('moment');
let responseData = {};

var downloadPic = function (src, dest) {
  request(src)
    .pipe(fs.createWriteStream(dest))
    .on("close", function () {
      console.log("pic saved!");
    });
};
// 首页请求
router.get("/", function (req, res) {
  var requestData = {
    articleTypeId: "4a3194d9a0244cf324a77c27f7c5109c",
    pages: 0,
  };
  request({
      url: "https://www.wujiabk.com/api/qd/getArticle",
      method: "POST",
      /*   json: true, */
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(requestData),
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body).data.articleData;
        var arr = [];
        if (data.length) {
          data.map((item) => {
            arr.push({
              type: 13,
              classify: 3,
              creatTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
              title: item.title,
              content: item.articleContent,
              author: "pyj",
              view: item.seeNumber,
              Likes: item.praiseNumber,
              thumbnail: item.abbreviatedPicture,
              describee: item.articleDesc
            });
          });
          arr.map((item) => {
            var timestamp = new Date().valueOf();
            downloadPic(
              "http:" + item.thumbnail,
              "public/upload/" + timestamp + ".png"
            );
            item.thumbnail = "upload/" + timestamp + ".png";
          });
          var getData1 = Promise.all(
            arr.map((item) => {
              let sql =
                "insert  into BlogList(type,classify,creatTime,title,content,author,view,Likes,thumbnail,describee) values(?,?,?,?,?,?,?,?,?,?)";
              var param = [
                item.type,
                item.classify,
                item.creatTime,
                item.title,
                item.content,
                item.author,
                item.view,
                item.Likes,
                item.thumbnail,
                item.describee
              ];
              return new Promise((resolve, reject) =>
                db.query(sql, param, (err, respon) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(respon);
                  }
                })
              );
            })
          );

          getData1
            .then(function (respon) {
              console.log(1212121);
              res.json("新建成功");
            })
            .catch((err) =>
              res.json({
                msg: "失败",
                code: 1,
                msg: err,
              })
            );
        } else {
          res.json("新建失败");
        }
      }
    }
  );
});

/**,
 * @swagger
 * /paCong/newslist:
 *    post:
 *      tags:
 *      - 博客前台
 *      summary: 博客列表
 *      parameters:
 *      - name: classify
 *        in: query
 *        description: 分类
 *        required: false
 *      - name: type
 *        in: query
 *        description: 博客小类型
 *        required: false
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
/**,
 * @swagger
 * /paCong/newslist:
 *    get:
 *      tags:
 *      - 博客前台
 *      summary: 博客列表
 *      parameters:
 *      - name: classify
 *        in: query
 *        description: 分类
 *        required: false
 *      - name: type
 *        in: query
 *        description: 博客小类型
 *        required: false
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
router.get("/newslist", function (req, res) {
  var sql1 = `SELECT * FROM  BlogList where isShow=1`;
  let sql = `${sql1}`;
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err,
        status: "0",
      });
      throw err;
    } else {
      responseData.newsList = results;
      res.json({
        msg: "操作成功",
        status: "200",
        data: responseData,
      });
    }
  });
});

router.get("/new", function (req, res) {
      request('https://blog.yzmcms.com/js/list_2.html', function (err, response, body) {
          if (!err && response.statusCode == 200) {
           /*  var respon = JSON.parse(body);
            res.json(respon); */
         //   console.log(body);
           var getList= doSomeThing(body);
           console.log(getList)
           var getData1 = Promise.all(
            getList.map((item) => {
              let sql =
                "insert  into BlogList(type,classify,creatTime,title,content,author,view,Likes,thumbnail,describee) values(?,?,?,?,?,?,?,?,?,?)";
              var param = [
                item.type,
                item.classify,
                item.creatTime,
                item.title,
                item.content,
                item.author,
                item.view,
                item.Likes,
                item.thumbnail,
                item.describee
              ];
              return new Promise((resolve, reject) =>
                db.query(sql, param, (err, respon) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(respon);
                  }
                })
              );
            })
          );

          getData1
            .then(function (respon) {
              res.json("新建成功");
            })
            .catch((err) =>
              res.json({
                msg: "失败",
                code: 1,
                msg: err,
              })
            );
        //   res.json(getList);
          }
        })
      })


    function doSomeThing(html) {
      // 使用cheerio模块装载我们得到的页面源代码,返回的是一个类似于jquery中的$对象
      var $ = cheerio.load(html);
      //使用这个$对象就像操作jquery对象一般去操作我们获取得到的页面的源代码
      var $menu_box = $(".content-wrap .content .excerpt");
      // 将我们需要的文字信息存储在一个数组中
      var result = [];
      $menu_box.each(function (i, item) {
        var obj = {};
        var href = $(item).find(".thumbnail").attr('href').trim();
        var thumbnail=$(item).find(".thumbnail img").attr('src');
        var title=$(item).find("header a").text();
        var describee=$(item).find(".note").text();
        obj.href=href;
        obj.thumbnail=thumbnail;
        obj.title=title;
        obj.describee=describee;
        obj.type=5;
        obj.classify=1;
        obj.creatTime=moment().format('YYYY-MM-DD HH:mm:ss');
        obj.Likes=0;
        obj.content='';
        obj.author='';
        result.push(obj);
      });

      console.log(result);
      //最后我们输出这个结果
      result.map((item) => {
        var timestamp = new Date().valueOf();
        downloadPic(
          "https://blog.yzmcms.com/" + item.thumbnail,
          "public/upload/" + timestamp + ".jpg"
        );
        item.thumbnail = "upload/" + timestamp + ".jpg";
      });
      return result
    }
    module.exports = router;
    /* post请求json */
    /* var requestData = {key: 'value'}
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(requestData)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
        }
    }); */

    /* request.post({url:'', form:{key:'value'}}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
           console.log(body) // 请求成功的处理逻辑  
        }
    }) */

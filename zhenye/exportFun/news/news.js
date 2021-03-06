/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-10-07 22:35:23
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
const {
  formatDate
} = require('../exportFun');
const newslist = (req, res) => {
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);

  let lang = req.body.lang;
  let newStatus = req.body.newStatus;
  let newstype = req.body.newstype;
  let title = req.body.title;

  let sqlA = "";
  if (lang == 0 || lang == "" || lang == null||lang == undefined) {
    sqlA = sqlA + "";
  } else {
    sqlA = sqlA + ` and lang=${lang}`;
  }
  if (newStatus == -1||newStatus == undefined||newStatus == ""|| newStatus == null) {
    sqlA = sqlA + "";
  } else {
    sqlA = sqlA + ` and newStatus=${newStatus}`;
  }
  if (newstype == -1||newstype == undefined||newstype == ""|| newstype == null) {
    sqlA = sqlA + "";
  } else {
    sqlA = sqlA + ` and newstype=${newstype}`;
  }
  if (title == "" || title == null||title == undefined) {
    sqlA = sqlA + "";
  } else {
    sqlA = sqlA + ` and title LIKE "%${title}%"`;
  }

  let sql = `SELECT COUNT(*) FROM news where isShow=0 ${sqlA}`;
  let sql2 =
    `SELECT*FROM news where isShow=0 ${sqlA} limit ${(pageNo - 1)*pageSize} ,${pageNo * pageSize}`;
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      allCount = results[0]["COUNT(*)"];
      back(allCount);
    }
  });

  function back(allCount) {
    db.query(sql2, function (err, results) {
      if (err) {
        res.json({
          msg: err.toString(),
          code: 500,
        });
      } else {
        var allPage = allCount / pageSize;
        var pageStr = allPage.toString();
        // 不能整除
        if (pageStr.indexOf(".") > 0) {
          allPage = parseInt(pageStr.split(".")[0]) + 1;
        }
        res.json({
          msg: "操作成功",
          status: "200",
          totalPages: allPage,
          data: results,
          total: allCount,
          currentPage: parseInt(pageNo)
        });
      }
    });
  }
}

const newsdetail = (req, res) => {
  let id = req.body.id;
  let sql = "SELECT * FROM news where newsId=" + id;
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      res.json({
        msg: "操作成功",
        status: "200",
        data: results
      });
    }
  });
}

const newsadd = (req, res) => {
  let title = req.body.title;
  let author = req.body.author;
  let des = req.body.des;
  let keyword = req.body.keyword;
  let newstype = req.body.newstype;
  let focusPic = req.body.pic;
  let content = req.body.content;
  let lang = req.body.lang;
  let newStatus = req.body.newStatus;
  let isShow = 0;
  let time = formatDate();
  let sql =
    "insert  into  news(title,author,des,keyword,newstype,focusPic,content,lang,newStatus,isShow,time) values(?,?,?,?,?,?,?,?,?,?,?)";
  var param = [
    title,
    author,
    des,
    keyword,
    newstype,
    focusPic,
    content,
    lang,
    newStatus,
    isShow,
    time
  ];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
}

const newsdelete = (req, res) => {
  let id = req.body.Id;
  let sql = "UPDATE news  set isShow=? where newsId=?";
  let param = ["1", id];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
}

const newsupdate = (req, res) => {
  let title = req.body.title;
  let author = req.body.author;
  let des = req.body.des;
  let keyword = req.body.keyword;
  let newstype = req.body.newstype;
  let focusPic = req.body.pic;
  let content = req.body.content;
  let lang = req.body.lang;
  let newStatus = req.body.newStatus;
  let Id = req.body.Id;
  let sql =
    "UPDATE news SET title=?,author=?,lang=?,newStatus=?,des=?,keyword=?,focusPic=?,newstype=?,content=?  where newsId=?";
  var param = [
    title,
    author,
    lang,
    newStatus,
    des,
    keyword,
    focusPic,
    newstype,
    content,
    Id
  ];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
}
module.exports = {
  newslist: newslist,
  newsdetail: newsdetail,
  newsadd: newsadd,
  newsdelete: newsdelete,
  newsupdate: newsupdate
}

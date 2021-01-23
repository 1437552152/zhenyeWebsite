/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-24 00:00:10
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
var moment=require('moment');
const {
  formatDate
} = require('../exportFun');
const BlogNewslist = (req, res) => {
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);
  let type = req.body.type;
  let classify = req.body.classify;
  let title = req.body.title;

  let sqlA = "";
  if (type == -1||type == undefined||type == ""|| type == null) {
    sqlA = sqlA + "";
  } else {
    sqlA = sqlA + ` and type=${type}`;
  }
  if (classify == -1||classify == undefined||classify == ""|| classify == null) {
    sqlA = sqlA + "";
  } else {
    sqlA = sqlA + ` and classify=${classify}`;
  }
  if (title == "" || title == null||title == undefined) {
    sqlA = sqlA + "";
  } else {
    sqlA = sqlA + ` and title LIKE "%${title}%"`;
  }

  let sql = `SELECT COUNT(*) FROM BlogList where isShow=0 ${sqlA}`;
  let sql2 =
    `SELECT*FROM BlogList where isShow=0 ${sqlA} limit ${(pageNo - 1)*pageSize} ,${pageNo * pageSize}`;
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

const BlogNewsdetail = (req, res) => {
  let id = req.body.id;
  let sql = "SELECT * FROM BlogList where id=" + id;
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

const BlogNewsadd = (req, res) => {
  let title = req.body.title;
  let author = req.body.author;
  let describee=req.body.describee;
  let classify = req.body.classify;
  let thumbnail = req.body.thumbnail;
  let content = req.body.content;
  let type = req.body.type;
  let isShow = 0;
  let creatTime = moment(formatDate()).format('YYYY-MM-DD HH:mm:ss');
console.log(creatTime);

  let sql =
    "insert  into  BlogList(title,author,describee,classify,thumbnail,content,type,isShow,creatTime) values(?,?,?,?,?,?,?,?,?)";
  var param = [
    title,
    author,
    describee,
    classify,
    thumbnail,
    content,
    type,
    isShow,
    creatTime
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

const BlogNewsdelete = (req, res) => {
  let id = req.body.id;
  let sql = "UPDATE BlogList  set isShow=? where id=?";
  let param = [1, id];
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

const BlogNewsupdate = (req, res) => {
  let title = req.body.title;
  let author = req.body.author;
  let describee = req.body.describee;
  let classify = req.body.classify;
  let thumbnail = req.body.thumbnail;
  let content = req.body.content;
  let type = req.body.type;
  let id = req.body.id;
  let sql =
    "UPDATE BlogList SET title=?,author=?,type=?,describee=?,thumbnail=?,classify=?,content=?  where id=?";
  var param = [
    title,
    author,
    type,
    describee,
    thumbnail,
    classify,
    content,
    id
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
    BlogNewslist,
 BlogNewsdetail,
  BlogNewsadd,
  BlogNewsdelete,
 BlogNewsupdate
}

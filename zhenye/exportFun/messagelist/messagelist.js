/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-09-25 21:42:02
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
const messagelist = (req, res) => {
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);
  let sql = "SELECT COUNT(*) FROM MessageBoard where isShow=0";
  let sql2 =
    "SELECT * FROM MessageBoard where isShow=0 limit" +
    " " +
    (pageNo - 1) * pageSize +
    "," +
    pageNo * pageSize;
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg:  err.toString(),
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
          msg:  err.toString(),
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

const messagedetail = (req, res) => {
  let Id = req.body.Id;
  let sql = "SELECT * FROM MessageBoard where Id=" + Id;
  db.query(sql, function (err, results) {
    if (err) {
      res.json({
        msg:  err.toString(),
        code: 500,
      })
    } else {
      res.json({
        msg: "操作成功",
        status: "200",
        data: results
      });
    }
  });
}

const messagedelete = (req, res) => { 
  let id = req.body.Id;
  let sql = "UPDATE MessageBoard  set isShow=? where Id=?";
  let param = ["1", id];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg:  err.toString(),
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

const messageupdate = (req, res) => {  
  let replyContent = req.body.replyContent;
  let Id = req.body.Id;
  let sql = "UPDATE MessageBoard SET replyContent=?  where Id=?";
  var param = [replyContent, Id];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg:  err.toString(),
        code: 500,
      })
    } else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
  }
module.exports = {
  messagelist: messagelist,
  messagedelete: messagedelete,
  messageupdate: messageupdate,
  messagedetail: messagedetail
}

/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yfye
 * @LastEditTime: 2021-04-11 14:59:20
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
const jwt = require("jsonwebtoken");
const messagelist = (req, res) => {
  let user_id = "";
  jwt.verify(req.headers.token, "jwt", (error, decoded) => {
    if (error) {
      console.log(error.message);
    }
    if (decoded.roleId == "75") {
      console.log(decoded);
      user_id = decoded.user_id;
    }
  });
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);

  if (user_id) {
    sql = `SELECT COUNT(*) FROM signUp where  companyId=${user_id}`;
    sql2=`SELECT * FROM signUp where  companyId=${user_id} limit  ${
      (pageNo - 1) * pageSize
    },${pageNo * pageSize}`;
  } else {
    sql = `SELECT COUNT(*) FROM signUp`;
    sql2=`SELECT * FROM signUp  limit  ${
      (pageNo - 1) * pageSize
    },${pageNo * pageSize}`;
  }

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
  console.log(req.body)
  let Id = req.body.userId;
  let sql = "SELECT * FROM pcUser where id=" + Id;
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
        data: results[0]
      });
    }
  });
}

const messagedelete = (req, res) => { 
  let id = req.body.id;
  let status = req.body.status;
  let sql = "UPDATE signUp  set status=? where id=?";
  let param = [status, id];
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

module.exports = {
  messagelist: messagelist,
  messagedelete: messagedelete,
  messagedetail: messagedetail
}

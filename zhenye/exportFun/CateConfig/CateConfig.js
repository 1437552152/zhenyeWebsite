/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yfye
 * @LastEditTime: 2021-04-25 23:36:08
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
const {formatDate} = require('../exportFun');
const jwt = require("jsonwebtoken");
const CateConfig = (req, res) => {
    let allCount;
    let pageNo = parseInt(req.body.pageNo);
    let pageSize = parseInt(req.body.pageSize);
    let sql, sql2;
      sql = `SELECT COUNT(*) FROM classification where isShow=0`;
      sql2=`SELECT * FROM classification where isShow=0 limit  ${
        (pageNo - 1) * pageSize
      },${pageNo * pageSize}`;
    db.query(sql, function (err, results) {
      if (err) {
        res.json({
          msg:  err.toString(),
          code: 500,
        })
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
          })
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

const CateConfigdetail = (req, res) => {
    let id = req.body.id;
    let sql = "SELECT * FROM classification where id=" + id;
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

const CateConfigadd = (req, res) => {
  
  let title = req.body.title; 
  let isShow = 0;
  if(!title){
    res.json({
      msg: '请填写名称',
      code: 500,
    });return;
  }
  let sql =
    "insert  into classification(title,isShow) values(?,?)";
  var param = [title,isShow];
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

const CateConfigdelete = (req, res) => { 
  let id = req.body.id;
  let sql = "UPDATE classification  set isShow=? where id=?";
  let param = ["1", id];
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

const CateConfigupdate = (req, res) => {
  let title = req.body.title;
  let id = req.body.id;
  if(!title){
    res.json({
      msg: '请填写名称',
      code: 500,
    });return;
  }
    let sql =
      "UPDATE classification set title=? where id=?";
    var param = [title,id];
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
  CateConfig: CateConfig,
  CateConfigdetail:CateConfigdetail,
  CateConfigadd:CateConfigadd,
  CateConfigdelete:CateConfigdelete,
  CateConfigupdate:CateConfigupdate
}

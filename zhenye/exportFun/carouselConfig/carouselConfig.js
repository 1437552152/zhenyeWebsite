/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-13 22:46:55
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
const {formatDate} = require('../exportFun');
const jwt = require("jsonwebtoken");
const carouselConfig = (req, res) => {
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
    let sql, sql2;
    if (user_id) {
      sql = `SELECT COUNT(*) FROM Carousel where isShow=0 and user_id=${user_id}`;
      sql2=`SELECT * FROM Carousel where isShow=0 and user_id=${user_id} limit  ${
        (pageNo - 1) * pageSize
      },${pageNo * pageSize}`;
    } else {
      sql = `SELECT COUNT(*) FROM Carousel where isShow=0`;
      sql2=`SELECT * FROM Carousel where isShow=0 limit  ${
        (pageNo - 1) * pageSize
      },${pageNo * pageSize}`;
    }
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

const carouselConfigdetail = (req, res) => {
    let id = req.body.id;
    let sql = "SELECT * FROM Carousel where id=" + id;
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

const carouselConfigadd = (req, res) => {
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

  let title = req.body.title;
  let rangee = req.body.rangee;
  let EduRequir = req.body.EduRequir;
  let workingYears = req.body.workingYears;
  let workingArea = req.body.workingArea;
  let content = req.body.content;
  let isShow = 0;
  let time = formatDate();
  let jobDuty=req.body.jobDuty;
  let sql =
    "insert  into Carousel(title,rangee,EduRequir,workingYears,workingArea,content,isShow,time,user_id,jobDuty) values(?,?,?,?,?,?,?,?,?,?)";
  var param = [title,rangee,EduRequir,workingYears,workingArea,content,isShow,time,user_id,jobDuty];
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

const carouselConfigdelete = (req, res) => { 
  let id = req.body.id;
  let sql = "UPDATE Carousel  set isShow=? where id=?";
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

const carouselConfigupdate = (req, res) => {

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

  let title = req.body.title;
  let rangee = req.body.rangee;
  let EduRequir = req.body.EduRequir;
  let workingYears = req.body.workingYears;
  let workingArea = req.body.workingArea;
  let content = req.body.content;
  let id = req.body.id;
  let jobDuty=req.body.jobDuty;
    let sql =
      "UPDATE Carousel set title=?,rangee=?,EduRequir=?,workingYears=?,workingArea=?,content=?,jobDuty=? where id=?";
    var param = [title,rangee,EduRequir,workingYears,workingArea,content,jobDuty,id];
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
    carouselConfig: carouselConfig,
    carouselConfigdetail: carouselConfigdetail,
    carouselConfigadd: carouselConfigadd,
    carouselConfigdelete: carouselConfigdelete,
  carouselConfigupdate: carouselConfigupdate
}

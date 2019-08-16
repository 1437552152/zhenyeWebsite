/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-16 07:50:51
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
const {formatDate} = require('../exportFun');
// 用户信息,个人中心
const langConfig = (req, res) => {
    let allCount;
    let pageNo = parseInt(req.body.pageNo);
    let pageSize = parseInt(req.body.pageSize);
    let sql = "SELECT COUNT(*) FROM langConfig where isShow=0";
    let sql2 =
      "SELECT*FROM langConfig where isShow=0 limit" +
      " " +
      (pageNo - 1) * pageSize +
      "," +
      pageNo * pageSize;
    db.query(sql, function (err, results) {
      if (err) {} else {
        allCount = results[0]["COUNT(*)"];
        back(allCount);
      }
    });
  
    function back(allCount) {
      db.query(sql2, function (err, results) {
        if (err) {} else {
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

const langConfigdetail = (req, res) => {
    let id = req.body.id;
    let sql = "SELECT * FROM langConfig where id=" + id;
    db.query(sql, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          msg: "操作成功",
          status: "200",
          data: results
        });
      }
    });
}

const langConfigadd = (req, res) => {
    let img = req.body.img;
    let title = req.body.title;
    let orderBy = req.body.orderBy;
    let langFlag = req.body.langFlag;
    let isShow = 0;
    let time = formatDate();
    let sql =
      "insert  into langConfig(img,title,orderBy,isShow,time,langFlag) values(?,?,?,?,?,?)";
    var param = [img,title,orderBy,isShow,time,langFlag];
    db.query(sql, param, function (err, results) {
      if (err) {} else {
        res.json({
          msg: "操作成功",
          status: "200"
        });
      }
    });
}

const langConfigdelete = (req, res) => {
    let id = req.body.id;
    let sql = "UPDATE langConfig  set isShow=? where id=?";
    let param = ["1", id];
    db.query(sql, param, function (err, results) {
      if (err) {} else {
        res.json({
          msg: "操作成功",
          status: "200"
        });
      }
    });
}

const langConfigupdate = (req, res) => {
   let img = req.body.img;
    let title = req.body.title;
    let orderBy = req.body.orderBy;
    let id = req.body.id;
    let langFlag = req.body.langFlag;
    let sql =
      "UPDATE langConfig set img=?,title=?,orderBy=?,langFlag=? where id=?";
    var param = [img, title, orderBy,langFlag,id];
    db.query(sql, param, function (err, results) {
      if (err) {} else {
        res.json({
          msg: "操作成功",
          status: "200"
        });
      }
    });
  }
module.exports = {
    langConfig: langConfig,
  langConfigdetail: langConfigdetail,
  langConfigadd: langConfigadd,
  langConfigdelete: langConfigdelete,
  langConfigupdate: langConfigupdate
}

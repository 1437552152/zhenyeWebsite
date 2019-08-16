/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-16 07:51:09
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
const {formatDate} = require('../exportFun');
// 用户信息,个人中心
const productConfig = (req, res) => {

  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);
  let sql = "SELECT COUNT(*) FROM productConfig where isShow=0";
  let sql2 =
    "SELECT*FROM productConfig where isShow=0 limit" +
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

const productConfigdetail = (req, res) => {
  let id = req.body.id;
  let sql = "SELECT * FROM productConfig where id=" + id;
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

const productConfigadd = (req, res) => {
  let img = req.body.img;
  let title = req.body.title;
  let orderBy = req.body.orderBy;
  let isShow = 0;
  let time = formatDate();
  let sql =
    "insert  into productConfig(img,title,orderBy,isShow,time) values(?,?,?,?,?)";
  var param = [img, title, orderBy, isShow, time];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
}


function asyncAwaitFn(id) {
  return new Promise((resolve, reject) => {
    let sql = `select * from  products  where type=${id} and isShow=0`;
    db.query(sql, function (err, results) {
      if (err) {
        reject()
      } else {
        resolve(results);
      }
    });
  })
};

const productConfigdelete = (req, res) => {
  let id = req.body.id;
  asyncAwaitFn(id).then(res1 => {
    if (res1.length > 0) {
      res.json({
        msg: "请删除该分类的产品",
        status: 1
      });
    } else {
      let sql = "UPDATE productConfig  set isShow=? where id=?";
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
  })
}


const productConfigupdate = (req, res) => {
    let img = req.body.img;
    let title = req.body.title;
    let orderBy = req.body.orderBy;
    let id = req.body.id;
    let sql =
      "UPDATE productConfig set img=?,title=?,orderBy=?  where id=?";
    var param = [img, title, orderBy,id];
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
  productConfig: productConfig,
  productConfigdetail: productConfigdetail,
  productConfigadd: productConfigadd,
  productConfigdelete: productConfigdelete,
  productConfigupdate: productConfigupdate
}

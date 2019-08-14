/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-14 23:26:05
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
// 用户信息,个人中心
const teamlist = (req, res) => {
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);
  let sql = "SELECT COUNT(*) FROM products where isShow=0";
  let sql2 =
    "SELECT*FROM products where isShow=0 limit" +
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

const teamdetail = (req, res) => {
  let id = req.body.id;
  let sql = "SELECT * FROM products where productId=" + id;
  db.query(sql, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200",
        data: results
      });
    }
  });
}

const teamupdate = (req, res) => {
  let pic = req.body.pic;
  let title = req.body.title;
  let keyword = req.body.keyword;
  let type = req.body.type;
  let content = req.body.content;
  let des = req.body.des;
  let productId = req.body.Id;
  let typeTitle = req.body.typeTitle;
  let sql =
    "UPDATE products set pic=?,title=?,keyword=?,type=?,content=?,des=?,typeTitle=?  where productId=?";
  var param = [
    pic,
    title,
    keyword,
    type,
    content,
    des,
    typeTitle,
    productId
  ];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "修改成功",
        status: "200"
      });
    }
  });
}

const teamadd = (req, res) => {
  let pic = req.body.pic;
  let title = req.body.title;
  let keyword = req.body.keyword;
  let type = req.body.type;
  let content = req.body.content;
  let des = req.body.des
  let isShow = 0;
  let time = formatDate();
  let typeTitle = req.body.typeTitle;
  let sql =
    "insert  into products(title,pic,keyword,type,content,des,isShow,time,typeTitle) values(?,?,?,?,?,?,?,?,?)";
  var param = [
    title, pic, keyword, type, content, des, isShow, time, typeTitle
  ];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
}

const teamdelete = (req, res) => {
  let id = req.body.productId;
  let sql = "UPDATE products  set isShow=? where productId=?";
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

module.exports = {
  teamlist: teamlist,
  teamdetail: teamdetail,
  teamupdate: teamupdate,
  teamadd: teamadd,
  teamdelete: teamdelete

}

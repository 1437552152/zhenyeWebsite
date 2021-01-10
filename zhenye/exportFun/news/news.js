/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-10 23:08:37
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

  let sql = `SELECT COUNT(*) FROM certificate where isShow=0 and isShow=0`;
  let sql2 =
    `SELECT*FROM certificate where isShow=0 and isShow=0 limit ${(pageNo - 1)*pageSize} ,${pageNo * pageSize}`;
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
  let sql = "SELECT * FROM certificate where id=" + id;
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
  let focusPic = req.body.focusPic;
  let CertPic = req.body.CertPic;
  let des = req.body.des||'';
  let name = req.body.name;
  let sex = req.body.sex;
  let brithday = req.body.brithday;
  let qualificationsName = req.body.qualificationsName;
  let major = req.body.major;
  let ApprovedDate = req.body.ApprovedDate;
  let unit = req.body.unit;
  let IDCard = req.body.IDCard;
  let CertificateNo = req.body.CertificateNo;
  let PublicationNumber = req.body.PublicationNumber;
  let websiteUrl = req.body.websiteUrl;
  let OnVerCode = req.body.OnVerCode;
  let DateOfIssue = req.body.DateOfIssue;
  let QualificationLevel = req.body.QualificationLevel;
  
  let isShow = 0;
  let time = formatDate();
  let sql =
    "insert  into  certificate(title,focusPic,CertPic,des,name,sex,brithday,qualificationsName,major,ApprovedDate,unit,IDCard,CertificateNo,PublicationNumber,websiteUrl,OnVerCode,DateOfIssue,QualificationLevel,isShow,time) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var param = [
    title,focusPic,CertPic,des,name,sex,brithday,qualificationsName,major,ApprovedDate,unit,IDCard,CertificateNo,PublicationNumber,websiteUrl,OnVerCode,DateOfIssue,QualificationLevel,isShow,time
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
  let sql = "UPDATE certificate set isShow=? where id=?";
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
  let focusPic = req.body.focusPic;
  let CertPic = req.body.CertPic;
  let des = req.body.des||'';
  let name = req.body.name;
  let sex = req.body.sex;
  let brithday = req.body.brithday;
  let qualificationsName = req.body.qualificationsName;
  let major = req.body.major;
  let ApprovedDate = req.body.ApprovedDate;
  let unit = req.body.unit;
  let IDCard = req.body.IDCard;
  let CertificateNo = req.body.CertificateNo;
  let PublicationNumber = req.body.PublicationNumber;
  let websiteUrl = req.body.websiteUrl;
  let OnVerCode = req.body.OnVerCode;
  let DateOfIssue = req.body.DateOfIssue;
  let QualificationLevel = req.body.QualificationLevel;
  let id = req.body.Id;
  let sql =
    "UPDATE certificate SET title=?,focusPic=?,CertPic=?,des=?,name=?,sex=?,brithday=?,qualificationsName=?,major=?,ApprovedDate=?,unit=?,IDCard=?,CertificateNo=?,PublicationNumber=?,websiteUrl=?,OnVerCode=?,DateOfIssue=?,QualificationLevel=? where id=?";
  var param = [
    title,focusPic,CertPic,des,name,sex,brithday,qualificationsName,major,ApprovedDate,unit,IDCard,
    CertificateNo,PublicationNumber,websiteUrl,OnVerCode,DateOfIssue,QualificationLevel,id
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

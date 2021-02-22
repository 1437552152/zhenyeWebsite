/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yfye
 * @LastEditTime: 2021-02-06 21:01:29
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
  let name= req.body.name;
  let idnumber= req.body.idnumber;
  let cert= req.body.cert;
  let is_delete= Number(req.body.is_delete);
  let sqlA = "";
  is_delete==0?sqlA=sqlA+`is_delete=0`:is_delete==1?sqlA=sqlA+`is_delete=1`:sqlA="";
  if (name == undefined||name == ""|| name == null) {
    sqlA = sqlA + "";
  } else {
    sqlA =sqlA? sqlA + ` and name LIKE "%${name}%"`:`name LIKE "%${name}%"`;
  }

  if (idnumber == undefined||idnumber == ""|| idnumber == null) {
    sqlA = sqlA + "";
  } else {
    sqlA = sqlA?sqlA + ` and idnumber LIKE "%${idnumber}%"`:`idnumber LIKE "%${idnumber}%"`;
  }
  
  if (cert == "" || cert == null||cert == undefined) {
    sqlA = sqlA + "";
  } else {
    sqlA = sqlA?sqlA + ` and cert LIKE "%${cert}%"`:`cert LIKE "%${cert}%"`;
  }

  if(!sqlA){
    sqlA="1=1" 
  }

  let sql = `SELECT COUNT(*) FROM ims_goods where ${sqlA}`;
  let sql2 =
    `SELECT*FROM ims_goods where ${sqlA} order by addtime desc limit ${(pageNo - 1)*pageSize} ,${pageNo * pageSize}`;
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
  let sql = "SELECT * FROM ims_goods where id=" + id;
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
  let image = req.body.image;
  let name = req.body.name;
  let sex = req.body.sex;
  let birthday = req.body.birthday;
  let education = req.body.education;
  let major = req.body.major;
  let issued = req.body.issued;
  let idnumber = req.body.idnumber;
  let cert = req.body.cert;
  let addtime = req.body.addtime;
  let level = req.body.level;
  let is_delete = 0;
  let sql =
    "insert  into  ims_goods(image,name,sex,birthday,education,major,issued,idnumber,cert,addtime,level,is_delete) values(?,?,?,?,?,?,?,?,?,?,?,?)";
  var param = [
    image,name,sex,birthday,education,major,issued,idnumber,cert,addtime,level,is_delete
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
  let is_delete = Number(req.body.is_delete);
  let sql = "UPDATE ims_goods set is_delete=? where id=?";
  let param = [!is_delete, id];
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


const newsRealdelete = (req, res) => {
  let id = req.body.Id;
  let sql = "delete from ims_goods where id=?";
  let param = [id];
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
  let image = req.body.image;
  let name = req.body.name;
  let sex = req.body.sex;
  let birthday = req.body.birthday;
  let education = req.body.education;
  let major = req.body.major;
  let issued = req.body.issued;
  let idnumber = req.body.idnumber;
  let cert = req.body.cert;
  let addtime = req.body.addtime;
  let level = req.body.level;
  let id = req.body.Id;

  console.log(addtime);


  let sql =
    "UPDATE ims_goods SET image=?,name=?,sex=?,birthday=?,education=?,major=?,issued=?,idnumber=?,cert=?,addtime=?,level=? where id=?";
  var param = [
    image,name,sex,birthday,education,major,issued,idnumber,cert,addtime,level,id
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
  newsupdate: newsupdate,
  newsRealdelete:newsRealdelete
}

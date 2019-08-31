/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-17 17:40:23
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
const Joi = require('joi');
const {formatDate} = require('../exportFun');

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
const  teamlistSchema = {
  body: {
    pageNo: Joi.string().min(1).trim().required(),
    pageSize:Joi.string().min(1).trim().required()
  }
};



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

const  teamdetailSchema = {
  body: {
    id: Joi.string().min(1).trim().required()
  }
};

const teamupdate = (req, res) => {
  let pic = req.body.pic;
  let title = req.body.title;
  let keyword = req.body.keyword;
  let type = req.body.type;
  let content = req.body.content;
  let des = req.body.des;
  let productId = req.body.Id;
  let typeTitle = req.body.typeTitle;
  let category = req.body.category;
  let lang = req.body.lang;
  let sql =
    "UPDATE products set pic=?,title=?,keyword=?,type=?,content=?,des=?,typeTitle=?,category=?,lang=?  where productId=?";
  var param = [
    pic,
    title,
    keyword,
    type,
    content,
    des,
    typeTitle,
    category,
    lang,
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

const teamupdateSchema = {
  body: {
    pic: Joi.string().min(1).trim().required(),
    title: Joi.string().min(1).trim().required(),
    keyword: Joi.string().min(1).trim().required(),
    type: Joi.string().min(1).trim().required(),
    des: Joi.string().min(1).trim().required(),
    typeTitle: Joi.string().min(1).trim().required(),
    category: Joi.string().required(),
    lang: Joi.string().required(),
    Id:Joi.string().min(1).trim().required(),
    content:Joi.string().trim().allow('')
  }
};
function catched(reject) {
  res.json({
    validData: false,
    errors: reject
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
  let category = req.body.category;
  let lang = req.body.lang;
  
  let sql =
    "insert  into products(title,pic,keyword,type,content,des,isShow,time,typeTitle,category,lang) values(?,?,?,?,?,?,?,?,?,?,?)";
  var param = [
    title, pic, keyword, type, content, des, isShow, time, typeTitle,category,lang
  ];
  db.query(sql, param, function (err, results) {
    if (err) {
        
    } else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
}
const  teamaddSchema = {
  body: {
    pic: Joi.string().min(1).max(100).trim().required().error(err => {
      err.forEach(error => {
        switch(error.type){
          case "string.max":
            error.message = "请上传图片";
            break;
        }
      });
      return err;
    }),
    title: Joi.string().min(1).trim().required(),
    keyword: Joi.string().min(1).trim().required(),
    type: Joi.string().min(1).trim().required(),
    des: Joi.string().min(1).trim().required(),
    content:Joi.string().trim().allow(''),
    typeTitle: Joi.string().min(1).trim().required(),
    Id: Joi.string().min(1).trim().allow(''),
    category: Joi.string().required(),
    lang: Joi.string().required()
  }
};

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

const  teamdeleteSchema = {
  body: {
    productId: Joi.string().min(1).trim().required()
  }
};


module.exports = {
  teamlist: teamlist,
  teamlistSchema:teamlistSchema,
  teamdetail: teamdetail,
  teamdetailSchema:teamdetailSchema,
  teamupdate: teamupdate,
  teamupdateSchema:teamupdateSchema,
  teamadd: teamadd,
  teamaddSchema:teamaddSchema,
  teamdelete: teamdelete,
  teamdeleteSchema:teamdeleteSchema
}

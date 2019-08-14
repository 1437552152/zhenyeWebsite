/*
 * @Description: 
 * @version: 
 * @Date: 2019-07-31 19:46:39
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-14 23:39:28
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const router = express.Router();
const db = require("../conf/conf.js");
const {intercept,formatDate,upload} = require('../exportFun/exportFun');
/* 登录模块 */
const {login} = require('../exportFun/login/login');
/* 系统用户模块 */
const {systemDetail,systemUpdatepassword,getUserList,employeedeletes,useRolelist,roledelete} = require('../exportFun/user/user');
/* 产品模块 */
const {teamlist,teamdetail,teamupdate,teamadd,teamdelete} = require('../exportFun/product/product');
/* 产品配置模块 */
const {productConfig,productConfigdetail,productConfigadd,productConfigdelete,productConfigupdate} = require('../exportFun/productConfig/productConfig');




/* 
接口拦截
*/
router.use(function (req, res, next) {
   intercept(req, res, next)
});

 /* 登录接口
  */
router.post("/login", function (req, res) {
  login(req,res);
});


/* ======================用户模块========================= */
/*  用户信息,个人中心 */
router.post("/system/employee/detail", function (req, res) {
  systemDetail(req,res);
});
/* 修改密码 */
router.post("/system/employee/update-password", function (req, res) {
  systemUpdatepassword(req,res);
});

/* 获取用户列表 */
router.post('/getUserList', function (req, res) {
  getUserList(req,res);
});

 /*删除用户  */
  router.post("/employee/deletes", function (req, res) {
    employeedeletes(req,res);
  });

/* 获取角色列表 */
router.post('/useRolelist', function (req, res) {
  useRolelist(req,res);
});
 /* 删除角色 */
  router.post("/role/delete", function (req, res) {
    roledelete(req,res);
  });
/* ======================用户模块结束========================= */




//----------------------------------------产品开始------------------

/* 产品列表 */
router.post("/team", function (req, res) {
   teamlist(req,res);
});

/* 产品详情 */
router.post("/team/detail", function (req, res) {
  teamdetail(req,res);
});

/* 产品详情修改 */
router.post("/team/update", function (req, res) {
  teamupdate(req,res);
});

/*  产品详情增加 */
router.post("/team/add", function (req, res) {
  teamadd(req,res);
});

 /* 物理删除一条 */
router.post("/team/delete", function (req, res) {
  teamdelete(req,res);   
});

//----------------------------------------产品结束------------------


//----------------------------------------产品类型配置开始------------------
/* 产品类型分类 */
router.post("/productConfig", function (req, res) {
  productConfig(req,res);
});

/* 产品类型详情 */
router.post("/productConfig/detail", function (req, res) {
  productConfigdetail(req,res);
});

/*  产品类型增加 */
router.post("/productConfig/add", function (req, res) {
  productConfigadd(req,res);
});

/*  物理删除一条产品类型 */
router.post("/productConfig/delete", function (req, res) {
  productConfigdelete(req,res)
});

/*  修改一条产品类型 */
router.post("/productConfig/update", function (req, res) {
  productConfigupdate(req,res)
});
//----------------------------------------产品类型配置------------------







//----------------------------------------轮播图开始------------------
router.post("/carouselConfig", function (req, res) {
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);
  let sql = "SELECT COUNT(*) FROM Carousel where isShow=0";
  let sql2 =
    "SELECT*FROM Carousel where isShow=0 limit" +
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
});

//Carouselconfig详情
router.post("/carouselConfig/detail", function (req, res) {
  let id = req.body.id;
  let sql = "SELECT * FROM Carousel where id=" + id;
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
});
//Carouselconfig增加
router.post("/carouselConfig/add", function (req, res) {
  let img = req.body.img;
  let title = req.body.title;
  let href = req.body.href;
  let orderBy = req.body.orderBy;
  let isShow = 0;
  let time = formatDate();
  let sql =
    "insert  into Carousel(img,title,href,orderBy,isShow,time) values(?,?,?,?,?,?)";
  var param = [img,title,href,orderBy,isShow,time];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
});
// 物理删除一条Carouselconfig
router.post("/carouselConfig/delete", function (req, res) {
  let id = req.body.id;
  let sql = "UPDATE Carousel  set isShow=? where id=?";
  let param = ["1", id];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
});
// 修改一条Carouselconfig
router.post("/carouselConfig/update", function (req, res) {
  let img = req.body.img;
  let title = req.body.title;
  let href = req.body.href;
  let orderBy = req.body.orderBy;
  let id = req.body.id;
  let sql =
    "UPDATE Carousel set img=?,title=?,href=?,orderBy=?  where id=?";
  var param = [img, title, href, orderBy,id];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
});
//----------------------------------------轮播图结束------------------

// ------------------------文章开始-------------------------------------
// 文章列表
router.post("/news", function (req, res) {
  let allCount;
  let pageNo = parseInt(req.body.pageNo);
  let pageSize = parseInt(req.body.pageSize);
  let sql = "SELECT COUNT(*) FROM news where isShow=0";
  let sql2 =
    "SELECT*FROM news where isShow=0 limit" +
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
});
//文章详情
router.post("/news/detail", function (req, res) {
  let id = req.body.id;
  let sql = "SELECT * FROM news where newsId=" + id;
  db.query(sql, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200",
        data: results
      });
    }
  });
});

// 文章修改
router.post("/news/update", function (req, res) {
  let title = req.body.title;
  let author = req.body.author;
  let des = req.body.des;
  let keyword = req.body.keyword;
  let newstype = req.body.newstype;
  let focusPic = req.body.pic;
  let content = req.body.content;
  let Id = req.body.Id;
  let sql =
    "UPDATE news SET title=?,author=?,des=?,keyword=?,focusPic=?,newstype=?,content=?  where newsId=?";
  var param = [
    title,
    author,
    des,
    keyword,
    focusPic,
    newstype,
    content,
    Id
  ];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
});
//文章增加
router.post("/news/add", function (req, res) {
  let title = req.body.title;
  let author = req.body.author;
  let des = req.body.des;
  let keyword = req.body.keyword;
  let newstype = req.body.newstype;
  let focusPic = req.body.pic;
  let content = req.body.content;
  let isShow = 0;
  let time = formatDate();
  let sql =
    "insert  into  news(title,author,des,keyword,newstype,focusPic,content,isShow,time) values(?,?,?,?,?,?,?,?,?)";
  var param = [
    title,
    author,
    des,
    keyword,
    newstype,
    focusPic,
    content,
    isShow,
    time
  ];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
});
// 物理删除一条
router.post("/news/delete", function (req, res) {
  let id = req.body.Id;
  let sql = "UPDATE news  set isShow=? where newsId=?";
  let param = ["1", id];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
});
//----------------------------------------文章结束------------------
//----------------------------------------文章结束------------------

//---------------------------------------------报名列表
router.post("/reportlist/reportlist", function (req, res) {
    let allCount;
    let pageNo = parseInt(req.body.pageNo);
    let pageSize = parseInt(req.body.pageSize);
    let sql =
      "SELECT COUNT(*) FROM reportList where isShow=0 orderBy by reportTime desc";
    let sql2 =
      "SELECT * FROM reportList where isShow=0 limit" +
      " " +
      (pageNo - 1) * pageSize +
      "," +
      pageNo * pageSize;
    db.query(sql, function (err, results) {
      if (err) {
        console.log(err);
      } else {
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
  }),
  //删除一个报名记录
  router.post("/reportlist/delete", function (req, res) {
    let id = req.body.Id;
    let sql = "UPDATE MessageBoard  set isShow=? where Id=?";
    let param = ["1", id];
    db.query(sql, param, function (err, results) {
      if (err) {} else {
        res.json({
          msg: "操作成功",
          status: "200"
        });
      }
    });
  });
  
//留言列表
router.post("/submit/messagelist", function (req, res) {
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
        console.log(err);
      } else {
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
  }),
  //删除一个留言
  router.post("/submit/messagedelete", function (req, res) {
    let id = req.body.Id;
    let sql = "UPDATE MessageBoard  set isShow=? where Id=?";
    let param = ["1", id];
    db.query(sql, param, function (err, results) {
      if (err) {} else {
        res.json({
          msg: "操作成功",
          status: "200"
        });
      }
    });
  });
//留言回复
router.post("/submit/messageupdate", function (req, res) {
  let replyContent = req.body.replyContent;
  let Id = req.body.Id;
  let sql = "UPDATE MessageBoard SET replyContent=?  where Id=?";
  var param = [replyContent, Id];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
});

//留言详情
router.post("/submit/messagedetail", function (req, res) {
  let Id = req.body.Id;
  let sql = "SELECT * FROM MessageBoard where Id=" + Id;
  db.query(sql, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200",
        data: results
      });
    }
  });
});
//------------------------------- 该国留学的优势--------------------------------------

//------------------------------- 网站的基础配置开始-------------------------------------
// 得到网站配置
router.post("/getWebsiteConfig", function (req, res) {
  let sql = "SELECT * FROM baseConfig";
  db.query(sql, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200",
        data: results[0]
      });
    }
  });
});
// 修改网站配置
router.post("/WebsiteConfigUpdate", function (req, res) {
  let longitude=req.body.longitude;
  let latitude=req.body.latitude;
  let logoPic=req.body.logoPic;
  let weChatPic=req.body.weChatPic;
  let qqeweimaPic=req.body.qqeweimaPic;
  let weiboPic=req.body.weiboPic;
  let publicPic=req.body.publicPic;
  let webname=req.body.webname;
  let website=req.body.website;
  let address=req.body.address;
  let email=req.body.email;
  let mobile=req.body.mobile;
  let qqCode=req.body.qqCode;
  let content=req.body.content;
  let param = [latitude,longitude,logoPic,weChatPic,qqeweimaPic,weiboPic,publicPic,webname,website,address,email,mobile,qqCode,content];
  let sql = `update  baseConfig set latitude=?,longitude=?,logoPic=?,weChatPic=?,qqeweimaPic=?,weiboPic=?,publicPic=?,webname=?,website=?,address=?,email=?,mobile=?,qqCode=?,content=?`;
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg: "修改失败",
        status: "0"
      });
    } else {
      res.json({
        msg: "修改成功",
        status: "200"
      });
    }
  });
});
//------------------------------- 网站的基础配置结束--------------------------------------

//获取访问地址以及ip
router.post('/getLookRecord', function (req, res) {
  let sql = `SELECT COUNT(*) as num,address  FROM  BrowseRecords GROUP BY address`;
  db.query(sql,function (err, results) {
  if (err) {
    console.log(err)
  } else {    
    res.json({
      msg: "操作成功",
      status: "200",
      data:results
    });
  }
});
})
//留言列表模块
router.post('/getbaomingList', function (req, res) {
  let sql = `SELECT * FROM  reportlist where isShow=0`;
  db.query(sql,function (err, results) {
  if (err) {
    console.log(err)
  } else {    
    res.json({
      msg: "操作成功",
      status: "200",
      data:results
    });
  }
});
})

//----------------------------------------语言类型配置开始------------------
router.post("/langConfig", function (req, res) {
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
});

//Carouselconfig详情
router.post("/langConfig/detail", function (req, res) {
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
});
//Carouselconfig增加
router.post("/langConfig/add", function (req, res) {
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
});

// 物理删除一条Carouselconfig
router.post("/langConfig/delete", function (req, res) {
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
    });
// 修改一条Carouselconfig
router.post("/langConfig/update", function (req, res) {
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
});

//------------------------------图片上传------------------------------------------
router.post("/upload", upload.single("picUrl"), function (req, res) {
  res.json({
    state: 200,
    ret_code: req.file.path.split("public/").join("")
  });
});
module.exports = router;

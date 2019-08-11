var express = require("express");
var router = express.Router();
var db = require("../conf/conf.js");
var formaDate = require("../utils/date.js");
var multer = require("multer");
const jwt = require('jsonwebtoken');  //用来生成token
var logger=require('../logs/logger.js');

router.use(function (req, res, next) {
  if(req.originalUrl!='/admin/login'&&req.originalUrl!='/admin/upload'){
   let token =req.headers.token;
    let secretOrPrivateKey="jwt";
    jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
      if (err) {  //  时间失效的时候 || 伪造的token
        res.json({
          msg: "token失效",
          code:3000,
        });
      }else{
        next();
      }
  })
  }else{
    next();
  }
});
//统一返回格式
function getdata(params) {
  return new Promise((resolve, reject) => db.query(params, (err, respon) => {
    if (err) {
      reject(err);
      throw err;
    } else {
      resolve(respon);
    }
  }));
}
router.post("/login", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let content ={name:req.body.username}; 
  let secretOrPrivateKey="jwt";
  let token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: 60*60*12 
  });
  var responseData = {
    code: 0,
    data: {
      admin: null,
      permissions: null
    },
    type: 0,
    msg: "success"
  };
  let sql1 = `SELECT  * from sys_user where isShow=0 and username='${username}'`;
  let sql2 = `SELECT * FROM  sys_menu WHERE  parentId = 0`
  getdata(sql1).then(function (respon) {
    responseData.data.admin = respon[0];
    if (respon[0].password != password) {
      res.json({
        msg: "账号密码错误",
        code: 1,
      });
    } else {
      return getdata(sql2);
    }
  }).then(function (respon1) {
    var getData1 = Promise.all(respon1.map(item => {
      let sql = `select * from  sys_menu  where  parentid='${
        item.menuId
      }'`;
      return new Promise((resolve, reject) => db.query(sql, (err, respon) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            icon: item.icon,
            name: item.name,
            menuId: item.menuId,
            orderNum: item.orderNum,
            parentId: item.parentId,
            submenus: respon
          });
        }
      }));
    }));
    getData1.then(function (respon) {
      responseData.data.permissions = respon;
      responseData.data.token=token,
      res.json(responseData);
    }).catch(err => res.json({
      msg: "失败",
      code: 1,
      msg: err
    }));
  })
});
// 用户信息,个人中心
router.post("/system/employee/detail", function (req, res) {
  let id = req.body.id;
  let sql = "SELECT * FROM sys_user  where user_id=" + id;
  db.query(sql, function (err, results) {
    if (err) {
      throw err;
    } else {
      res.json({
        msg: "操作成功",
        status: "200",
        data: results[0]
      });
    }
  });
});
// 修改密码
router.post("/system/employee/update-password", function (req, res) {
  let lastPassword = req.body.lastPassword;
  let newPassword = req.body.newPassword;
  let id = req.body.id;
  let sql = `SELECT * FROM sys_user  where user_id=${id}`;
  db.query(sql, function (err, results) {
    if (err) {
      throw err;
    } else {
      if (lastPassword != results[0].password) {
        res.json({
          message: "您输入的旧密码不正确",
          code: 1
        });
      } else {
        let sql = `update  sys_user set  password=${newPassword} where  user_id=${id}`;
        db.query(sql, function (err, results) {
          if (err) {
            throw err;
          } else {
            res.json({
              message: "密码修改成功",
              code: 0
            });
          }
        })
      }
    }
  });
});

// 字段说明
//  isShow：0 表示展示      1 表示物理删除即隐藏
//----------------------------------------案例开始------------------
// 获得案例
router.post("/team", function (req, res) {
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
});
// 案例详情
router.post("/team/detail", function (req, res) {
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
});

// 案例详情修改
router.post("/team/update", function (req, res) {
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
});
// 案例详情增加
router.post("/team/add", function (req, res) {
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
    title, pic, keyword, type, content, des, isShow,time,typeTitle
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
router.post("/team/delete", function (req, res) {
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
});
//----------------------------------------案例结束------------------

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




//----------------------------------------产品类型配置开始------------------
router.post("/productConfig", function (req, res) {
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
});

//Carouselconfig详情
router.post("/productConfig/detail", function (req, res) {
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
});
//Carouselconfig增加
router.post("/productConfig/add", function (req, res) {
  let img = req.body.img;
  let title = req.body.title;
  let orderBy = req.body.orderBy;
  let isShow = 0;
  let time = formatDate();
  let sql =
    "insert  into productConfig(img,title,orderBy,isShow,time) values(?,?,?,?,?)";
  var param = [img,title,orderBy,isShow,time];
  db.query(sql, param, function (err, results) {
    if (err) {} else {
      res.json({
        msg: "操作成功",
        status: "200"
      });
    }
  });
});


 function asyncAwaitFn(id) {
  return  new Promise((resolve, reject) => {
      // setTimeout(() => {
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
// 物理删除一条Carouselconfig
router.post("/productConfig/delete", function (req, res) {
  let id = req.body.id;
    asyncAwaitFn(id).then(res1=>{
         if(res1.length>0){
            res.json({
              msg:"请删除该分类的产品",
              status:0
            });
         }else{
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
});
// 修改一条Carouselconfig
router.post("/productConfig/update", function (req, res) {
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
});
//----------------------------------------产品类型配置------------------

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


//================================用户模块=======================================
//获取用户列表
router.post('/getUserList', function (req, res) {
  let allCount;
  let pageNo =  parseInt(req.body.pageNo)||1;
  let pageSize = parseInt(req.body.pageSize)||10;
  let sql = `SELECT COUNT(*) FROM  sys_user where isShow=0`;
  let sql2 =
    `SELECT user_id,mobile,email,sex,username FROM  sys_user  where isShow=0  limit` +
    " " +(pageNo - 1) * pageSize +"," + pageNo * pageSize;
  function getpage(params) {
    return new Promise((resolve, reject) => db.query(params, (err, respon) => {
      if (err) {
        throw err;
        reject(err);
      } else {
        resolve(respon);
      }
    }));
  }
  getpage(sql).then(function (res) {
    allCount = res[0]["COUNT(*)"];
  return  getpage(sql2);
  }).then(function (responseData) {
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
      data: responseData,
      total: allCount,
      currentPage: parseInt(pageNo)
    });

  })
});
//删除用户
  router.post("/employee/deletes", function (req, res) {
    logger.info(req)
    let user_id = req.body.user_id;
    let sql = "UPDATE sys_user  set isShow=? where user_id=?";
    let param = ["1", user_id];
    db.query(sql, param, function (err, results) {
      if (err) {} else {
        res.json({
          msg: "操作成功",
          status: "200"
        });
      }
    });
  });




//获取角色列表
router.post('/useRolelist', function (req, res) {
  let allCount;
  let pageNo =  parseInt(req.body.pageNo)||1;
  let pageSize = parseInt(req.body.pageSize)||10;
  let sql = `SELECT COUNT(*) FROM  useRole where isShow=0`;
  let sql2 =
    `SELECT roleName,roleId,remark,rolePermissions FROM  useRole  where isShow=0  limit` +
    " " +(pageNo - 1) * pageSize +"," + pageNo * pageSize;
  function getpage(params) {
    return new Promise((resolve, reject) => db.query(params, (err, respon) => {
      if (err) {
        throw err;
        reject(err);
      } else {
        resolve(respon);
      }
    }));
  }
  getpage(sql).then(function (res) {
    allCount = res[0]["COUNT(*)"];
  return  getpage(sql2);
  }).then(function (responseData) {
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
      data: responseData,
      total: allCount,
      currentPage: parseInt(pageNo)
    });

  })
});
  //删除角色
  router.post("/role/delete", function (req, res) {
    let roleId = req.body.roleId;
    let sql = "UPDATE useRole  set isShow=? where roleId=?";
    let param = ["1", roleId];
    db.query(sql, param, function (err, results) {
      if (err) {} else {
        res.json({
          msg: "操作成功",
          status: "200"
        });
      }
    });
  });

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
//----------------------------------------语言类型配置------------------

//获取当前时间
function formatDate() {
  //把时间戳转化为日期对象
  let date = new Date();
  //调用封装，参数为日期对象和时间格式
  return formaDate.formaDate(date, "yyyy-MM-dd hh:mm");
}
//------------------------------图片上传------------------------------------------
//获取时间
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate =
    date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate.toString();
}
var datatime = "public/images/" + getNowFormatDate();
//将图片放到服务器
var storage = multer.diskStorage({
  // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
  destination: datatime,
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
});
router.post("/upload", upload.single("picUrl"), function (req, res) {
  res.json({
    state: 200,
    ret_code: req.file.path.split("public/").join("")
  });
});
module.exports = router;

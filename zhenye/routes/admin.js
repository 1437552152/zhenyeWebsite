/*
 * @Description: 
 * @version: 
 * @Date: 2019-07-31 19:46:39
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-18 22:40:59
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const logger=require('../logs/logger.js');
const router = express.Router();
const expressJoi = require('express-joi-validator');
const {
  intercept,
  upload
} = require('../exportFun/exportFun');
/* 登录模块 */
const {
  login,loginSchema
} = require('../exportFun/login/login');
/* 系统用户模块 */
const {
  systemDetail,
  systemUpdatepassword,
  getUserList,
  getUserListSchema,
  employeedeletes,
  employeedeletesSchema,
  useRolelist,
  roledelete,
  roledeleteSchema,
  getUseradd,
  getUseraddSchema, 
  getUserUpdate,
  useRoleadd,
  getAllPessions
} = require('../exportFun/user/user');
/* 产品模块 */
const {
  teamlist,
  teamlistSchema,
  teamdetail,
  teamdetailSchema,
  teamupdate,
  teamupdateSchema,
  teamadd,
  teamaddSchema,
  teamdelete,
  teamdeleteSchema
} = require('../exportFun/product/product');
/* 产品配置模块 */
const {
  productConfig,
  productConfigdetail,
  productConfigadd,
  productConfigdelete,
  productConfigupdate
} = require('../exportFun/productConfig/productConfig');
/* 语言配置 */
const {
  langConfig,
  langConfigdetail,
  langConfigadd,
  langConfigdelete,
  langConfigupdate
} = require('../exportFun/lang/lang');

/* 轮播图配置 */
const {
  carouselConfig,
  carouselConfigdetail,
  carouselConfigadd,
  carouselConfigdelete,
  carouselConfigupdate
} = require('../exportFun/carouselConfig/carouselConfig');

/* 新闻配置 */
const {
  newslist,
  newsdetail,
  newsadd,
  newsdelete,
  newsupdate
} = require('../exportFun/news/news');

/* 报名配置 */
const {
  messagelist,
  messagedelete,
  messageupdate,
  messagedetail
} = require('../exportFun/messagelist/messagelist');

/* 网站基础配置 */
const {
  getWebsiteConfig,
  WebsiteConfigUpdate,
  getLookRecord
} = require('../exportFun/WebsiteConfig/WebsiteConfig');

/* 
接口拦截
*/
router.use(function (req, res, next) {
   intercept(req, res, next)
});

/* 登录接口
 */
 
router.post("/login",expressJoi(loginSchema), function (req, res) {
  login(req, res);
});


/* ======================用户模块========================= */
/*  用户信息,个人中心 */
router.post("/system/employee/detail", function (req, res) {
  systemDetail(req, res);
});
/* 修改密码 */
router.post("/system/employee/update-password", function (req, res) {
  systemUpdatepassword(req, res);
});

/* 获取用户列表 */
router.post('/getUserList',expressJoi(getUserListSchema), function (req, res) {
  getUserList(req, res);
});

/* 新增用户 */
router.post('/getUseradd',expressJoi(getUseraddSchema), function (req, res) {
  getUseradd(req, res);
});

/*删除用户  */
router.post("/employee/deletes",expressJoi(employeedeletesSchema), function (req, res) {
  employeedeletes(req, res);
});

/* 修改用户 */
router.post('/getUserUpdate', function (req, res) {
  getUserUpdate(req, res);
});


/* 获取角色列表 */
router.post('/useRolelist', function (req, res) {
  useRolelist(req, res);
});


/* 删除角色 */
router.post("/role/delete",expressJoi(roledeleteSchema), function (req, res) {
  roledelete(req, res);
});

/* 增加角色 */
router.post('/useRoleadd', function (req, res) {
  useRoleadd(req, res);
});


/* 获取所有权限 */
router.post('/getAllPessions', function (req, res) {
  getAllPessions(req, res);
});




/* ======================用户模块结束========================= */






//----------------------------------------产品开始------------------

/* 产品列表 */
router.post("/team",expressJoi(teamlistSchema), function (req, res) {
  teamlist(req, res);
});

/* 产品详情 */
router.post("/team/detail",expressJoi(teamdetailSchema),  function (req, res) {
  teamdetail(req, res);
});

/* 产品详情修改 */
router.post("/team/update", expressJoi(teamupdateSchema),function (req, res) {
  teamupdate(req, res);
});

/*  产品详情增加 */
router.post("/team/add",expressJoi(teamaddSchema),function(error,req, res) {
  teamadd(req, res);
});

/* 物理删除一条 */
router.post("/team/delete",expressJoi(teamdeleteSchema), function (req, res) {
  teamdelete(req, res);
});

//----------------------------------------产品结束------------------






//----------------------------------------产品类型配置开始------------------
/* 产品类型分类 */
router.post("/productConfig", function (req, res) {
  productConfig(req, res);
});

/* 产品类型详情 */
router.post("/productConfig/detail", function (req, res) {
  productConfigdetail(req, res);
});

/*  产品类型增加 */
router.post("/productConfig/add", function (req, res) {
  productConfigadd(req, res);
});

/*  物理删除一条产品类型 */
router.post("/productConfig/delete", function (req, res) {
  productConfigdelete(req, res)
});

/*  修改一条产品类型 */
router.post("/productConfig/update", function (req, res) {
  productConfigupdate(req, res)
});
//----------------------------------------产品类型配置------------------






//----------------------------------------轮播图开始------------------
/* 轮播图列表 */
router.post("/carouselConfig", function (req, res) {
  carouselConfig(req, res)
});

/* 轮播图详情 */
router.post("/carouselConfig/detail", function (req, res) {
  carouselConfigdetail(req, res)
});

/* 轮播图增加 */
router.post("/carouselConfig/add", function (req, res) {
  carouselConfigadd(req, res);
});

/* 物理删除一条轮播图 */
router.post("/carouselConfig/delete", function (req, res) {
  carouselConfigdelete(req, res);
});

/* 修改一条轮播图 */
router.post("/carouselConfig/update", function (req, res) {
  carouselConfigupdate(req, res);
});
//----------------------------------------轮播图结束------------------







// ------------------------文章开始-------------------------------------
/* 文章列表 */
router.post("/news", function (req, res) {
  newslist(req, res);
});

/* 文章详情 */
router.post("/news/detail", function (req, res) {
  newsdetail(req, res);
});

/* 文章修改 */
router.post("/news/update", function (req, res) {
  newsupdate(req, res);
});

/* 文章增加 */
router.post("/news/add", function (req, res) {
  newsadd(req, res);
});

/* 物理删除 */
router.post("/news/delete", function (req, res) {
  newsdelete(req, res);
});

/* 留言列表 */
router.post("/submit/messagelist", function (req, res) {
  messagelist(req, res);
})

/* 删除留言 */
router.post("/submit/messagedelete", function (req, res) {
  messagedelete(req, res);
});

/* 留言回复 */
router.post("/submit/messageupdate", function (req, res) {
  messageupdate(req, res);
});

/* 留言详情 */
router.post("/submit/messagedetail", function (req, res) {
  messagedetail(req, res);
});





//------------------------------- 网站的基础配置开始-------------------------------------
/* 得到网站配置 */
router.post("/getWebsiteConfig", function (req, res) {
  getWebsiteConfig(req, res);
});

/* 修改网站配置 */
router.post("/WebsiteConfigUpdate", function (req, res) {
  WebsiteConfigUpdate(req, res);
});

/* 获取访问地址以及ip */
router.post('/getLookRecord', function(req, res) {
  getLookRecord(req, res);
});

/* 语言配置 */
router.post("/langConfig", function(req, res) {
  logger.info(req)
  langConfig(req, res)
});

/* 语言配置详情 */
router.post("/langConfig/detail", function (req, res) {
  langConfigdetail(req, res);
});
/* 语言增加 */
router.post("/langConfig/add", function (req, res) {
  langConfigadd(req, res)
});

/* 物理删除一条语言配置 */
router.post("/langConfig/delete", function (req, res) {
  langConfigdelete(req, res);
});

/* 修改一条语言配置 */
router.post("/langConfig/update", function (req, res) {
  langConfigupdate(req, res)
});

//------------------------------图片上传------------------------------------------
router.post("/upload", upload.single("picUrl"), function (req, res) {
  res.json({
    state: 200,
    ret_code: req.file.path.split("public/").join("")
  });
});
module.exports = router;

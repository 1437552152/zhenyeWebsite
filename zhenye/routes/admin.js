/*
 * @Description: 
 * @version: 
 * @Date: 2019-07-31 19:46:39
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-22 19:41:33
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const logger=require('../logs/logger.js');
const router = express.Router();
const expressJoi = require('express-joi-validator');
const {uploadConfig} = require('../uploadConfig/uploadConfig.js');

const {
  intercept,
  upload
} = require('../exportFun/exportFun');
/* 登录模块 */
const {
  login,loginSchema,registrtUser
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
  getAllPessions,
  useRoleUpdate
} = require('../exportFun/user/user');


const {
  carouselConfig,
  carouselConfigdetail,
  carouselConfigadd,
  carouselConfigdelete,
  carouselConfigupdate
} = require('../exportFun/carouselConfig/carouselConfig');
/* 分类模块 */
const {
  CateConfig,
  CateConfigdetail,
  CateConfigadd,
  CateConfigdelete,
  CateConfigupdate
} = require('../exportFun/CateConfig/CateConfig');

const {
  messagelist,
  messagedelete,
  messageupdate,
  messagedetail
} = require('../exportFun/messagelist/messagelist');

/* 网站基础配置 */
const {
  getWebsiteConfig,
  lookWebsiteConfig,
  WebsiteConfigUpdate,
  deleteWebsiteConfig,
  addWebsiteConfig,
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

/* registrtUser */
router.post("/registrtUser",function (req, res) {
  registrtUser(req, res);
});


router.get('/config', function (req, res) {
   res.json(uploadConfig);
})
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

/* 修改权限 */
router.post('/useRoleUpdate', function (req, res) {
  useRoleUpdate(req, res);
});



//----------------------------------------轮开始------------------
router.post("/carouselConfig", function (req, res) {
  carouselConfig(req, res)
});

router.post("/carouselConfig/detail", function (req, res) {
  carouselConfigdetail(req, res)
});

router.post("/carouselConfig/add", function (req, res) {
  carouselConfigadd(req, res);
});

router.post("/carouselConfig/delete", function (req, res) {
  carouselConfigdelete(req, res);
});
router.post("/carouselConfig/update", function (req, res) {
  carouselConfigupdate(req, res);
});
//----------------------------------------结束------------------
router.post("/CateConfig", function (req, res) {
  CateConfig(req, res)
});

router.post("/CateConfig/detail", function (req, res) {
  CateConfigdetail(req, res)
});

router.post("/CateConfig/add", function (req, res) {
  CateConfigadd(req, res);
});

router.post("/CateConfig/delete", function (req, res) {
  CateConfigdelete(req, res);
});
router.post("/CateConfig/update", function (req, res) {
  CateConfigupdate(req, res);
});


router.post("/submit/messagelist", function (req, res) {
  messagelist(req, res);
})
router.post("/submit/messagedelete", function (req, res) {
  messagedelete(req, res);
});

router.post("/submit/messageupdate", function (req, res) {
  messageupdate(req, res);
});
router.post("/submit/messagedetail", function (req, res) {
  messagedetail(req, res);
});


router.post("/getWebsiteConfig", function (req, res) {
  getWebsiteConfig(req, res);
});
router.post("/WebsiteConfigUpdate", function (req, res) {
  WebsiteConfigUpdate(req, res);
});
router.post("/addWebsiteConfig", function (req, res) {
  addWebsiteConfig(req, res);
});
router.post("/deleteWebsiteConfig", function (req, res) {
   deleteWebsiteConfig(req, res);
});
router.post("/lookWebsiteConfig", function (req, res) {
  lookWebsiteConfig(req, res);
});
router.post('/getLookRecord', function(req, res) {
  getLookRecord(req, res);
});
//------------------------------图片上传------------------------------------------
router.post("/upload", upload.single("picUrl"), function (req, res) {
  console.log(req.file.path)

  res.json({
    state: 200,
    ret_code: "http://localhost:8082"+req.file.path.split("public")[1]
  });
});
module.exports = router;

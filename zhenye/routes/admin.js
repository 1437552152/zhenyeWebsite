/*
 * @Description: 
 * @version: 
 * @Date: 2019-07-31 19:46:39
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-12 19:45:17
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
  getAllPessions,
  useRoleUpdate
} = require('../exportFun/user/user');

/* 人员信息配置 */
const {
  newslist,
  newsdetail,
  newsadd,
  newsdelete,
  newsupdate
} = require('../exportFun/news/news');
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




/* ======================用户模块结束========================= */
// ------------------------人员信息开始-------------------------------------
/* 人员列表 */
router.post("/news", function (req, res) {
  newslist(req, res);
});

/* 人员详情 */
router.post("/news/detail", function (req, res) {
  newsdetail(req, res);
});

/* 人员修改 */
router.post("/news/update", function (req, res) {
  newsupdate(req, res);
});

/* 人员增加 */
router.post("/news/add", function (req, res) {
  newsadd(req, res);
});

/* 人员删除 */
router.post("/news/delete", function (req, res) {
  newsdelete(req, res);
});
//------------------------------图片上传------------------------------------------
router.post("/upload", upload.single("picUrl"), function (req, res) {
  console.log(req.file.path);

  res.json({
    state: 200,
    ret_code: req.file.path.replace('public','')
  });
});
module.exports = router;

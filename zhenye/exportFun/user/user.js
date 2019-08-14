/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-14 23:09:40
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
// 用户信息,个人中心
const  systemDetail=(req, res)=>{
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
  }

  // 修改密码
  const  systemUpdatepassword=(req, res)=>{
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
  }

 //获取用户列表
 const  getUserList=(req, res)=>{
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
 }
  // 用户删除
  const  employeedeletes=(req, res)=>{
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
  }

//获取角色列表
const  useRolelist=(req, res)=>{
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
  }
 //删除角色
 const  roledelete=(req, res)=>{
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
 }

  module.exports = {
    systemDetail: systemDetail,
    systemUpdatepassword:systemUpdatepassword,
    getUserList:getUserList,
    employeedeletes:employeedeletes,
    useRolelist:useRolelist,
    roledelete:roledelete
  }
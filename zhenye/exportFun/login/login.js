/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-09-25 21:58:24
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const jwt = require('jsonwebtoken'); //用来生成token
const {
  getdata
} = require('../exportFun');
var db = require('../../conf/conf');
const Joi = require('joi');


// 接口请求拦截
const login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let content = {
    name: req.body.username
  };
  let secretOrPrivateKey = "jwt";
  let token = jwt.sign(content, secretOrPrivateKey, {
    expiresIn: 60 * 60 * 12
  });
  let responseData = {
    code: 0,
    data: {
      admin: null,
      permissions: null
    },
    type: 0,
    msg: "success"
  };
  let rolePermissions;
  let roleId;
  let sql1 = `SELECT  * from sys_user where isShow=0 and username='${username}'`;
  let sql2 = `SELECT * FROM  sys_menu WHERE  parentId = 0`
  getdata(sql1).then(function (respon) {
    responseData.data.admin = respon[0];
    if (respon[0] === undefined || respon[0].password != password) {
      res.json({
        msg: "账号密码错误",
        code: 1,
      });
      return false;
    } 
    let sql = `select rolePermissions from  useRole  where  roleId=${respon[0].roleId}`;  
      return  getdata(sql)
  }).then(res => {
    rolePermissions = JSON.parse(res[0].rolePermissions);   
    return getdata(sql2);
     
  }).then(respon1=> {   
    let getData1 = Promise.all(respon1.map(item => {
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
    getData1.then(respon=> {          
      if (rolePermissions.length == 0) {
        responseData.data.permissions = [];
      } else {           
        let arr = JSON.parse(JSON.stringify(respon));
        arr.map((item, index) => {
          item.submenus = []
        });
       rolePermissions.map((item, index) => {
          respon.map((list, index1) => {
            if (list.submenus.length > 0) {
              list.submenus.map((lis, index2) => {
                if (lis.menuId == item) {
                  arr[index1].submenus.push(lis)
                }
              })
            }
          })
        })       
        responseData.data.permissions = arr;
        responseData.data.token = token;
        res.json(responseData);     
      } 
    })
  }).catch(err => res.json({
    msg: "失败",
    code: 1,
    msg: err
  }));
}
  









const loginSchema = {
  body: {
    username: Joi.string().trim().required(),
    password: Joi.string().min(6).max(20).required(),
  }
};



module.exports = {
  login: login,
  loginSchema: loginSchema
}

/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-21 22:38:13
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
  var responseData = {
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
    } else {
      let sql = `select rolePermissions from  useRole  where  roleId=${respon[0].roleId}`;
      getdata(sql).then(res => {
        console.log("0000",res)
        rolePermissions = JSON.parse(res[0].rolePermissions);       
      })
    }
  }).then(() => {
    console.log("-1-1---1-1")
    return getdata(sql2);
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
      if (JSON.parse(rolePermissions).length == 0) {
        responseData.data.permissions = [];
      } else {
       
        let arr = JSON.parse(JSON.stringify(respon));
        arr.map((item, index) => {
          item.submenus = []
        });
        console.log("111",typeof rolePermissions)
        console.log("222",arr)
        console.log("333",respon)
        JSON.parse(rolePermissions).map((item, index) => {
         console.log("444",item)
          respon.map((list, index1) => {
            console.log("555",list)
            if (list.submenus.length > 0) {
              list.submenus.map((lis, index2) => {
                if (lis.menuId == item) {
                  arr[index1].submenus.push(lis)
                }
              })
            }
          })
        })
        console.log("qqqq",arr)
        responseData.data.permissions = arr;
      }
      responseData.data.token = token;
      res.json(responseData);
    }).catch(err => res.json({
      msg: "失败",
      code: 1,
      msg: err
    }));
  })
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

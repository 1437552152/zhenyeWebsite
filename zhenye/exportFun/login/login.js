/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-14 00:35:37
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
        });
        let secretOrPrivateKey = "jwt";
        content.roleId=responseData.data.admin.roleId;
        content.user_id=responseData.data.admin.user_id;
        let token = jwt.sign(content, secretOrPrivateKey, {
          expiresIn: 60 * 60 * 12
        });       
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

const registrtUser = (req, res) => {
  let mobile = req.body.username;
  let password = req.body.password;
  let webname = req.body.webname;
  let legalPerson = req.body.legalPerson;

  let isShow=0;

  let sql =
    "insert  into  baseConfig(mobile,password,webname,legalPerson,isShow) values(?,?,?,?,?)";
  var param = [
    mobile,
    password,
    webname,
    legalPerson,
    isShow
  ];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      res.json({
        msg: "已提交注册申请,等待管理员审核",
        status: "200"
      });
    }
  });

/*   let sql =
    "insert  into  sys_user(username,password,isShow,roleId) values(?,?,?,?)";
  var param = [
    username,
    password,
    isShow,
    roleId
  ];
  db.query(sql, param, function (err, results) {
    if (err) {
      res.json({
        msg: err.toString(),
        code: 500,
      });
    } else {
      res.json({
        msg: "注册成功",
        status: "200"
      });
    }
  }); */
}


module.exports = {
  login: login,
  loginSchema: loginSchema,
  registrtUser
}




/* const jwt = require('jsonwebtoken');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia29uZ3poaSIsImlhdCI6MTU0Mzc2MjYzOSwiZXhwIjoxNTQzNzY2MjM5fQ.6idR7HPpjZIfZ_7j3B3eOnGzbvWouifvvJfeW46zuCw';
const secret = 'jwt';
jwt.verify(token, secret, (error, decoded) => {
  if (error) {
    console.log(error.message);
  }
  console.log(decoded);
}); */
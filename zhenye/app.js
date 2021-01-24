/*
 * @Description: 
 * @Author: yfye
 * @Date: 2021-01-10 15:50:47
 * @LastEditTime: 2021-01-24 17:26:43
 * @LastEditors: yfye
 */
const express = require("express");
const swig = require("swig");
const bodyParser = require("body-parser");
const app = express();
const logger=require('./logs/logger.js');
const myfilter=require('./exportFun/filter/myfilter.js');
const path = require('path');
var swaggerInstall = require('./utils/swagger')
swaggerInstall(app);
app.use(express.static(path.join(__dirname, 'public')));
swig.setDefaults({
  cache: false
});
app.set('view cache', false);
app.set("views", './views/pages/');
app.set("view engine", "html");
app.engine('html', swig.renderFile);
/* swig.init({ filters: myfilter }); */
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//设置跨域访问
//设置允许跨域访问该服务.
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  // res.header("Access-Control-Allow-Headers", "Content-Type");
 /*  res.setHeader('Access-Control-Allow-Headers',"token",'Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With'), */
  res.header("Access-Control-Allow-Methods", "*");
 // res.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

 if (req.method.toLowerCase() == 'options')
 res.send(200); //让options尝试请求快速结束
 else
 next();
});

app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user"));
app.use("/api", require("./routes/api"));
app.use("/paCong", require("./routes/paCong"));
app.use("/", require("./routes/BlogWeb"));
/* app.use("/", require("./routes/web")); */
app.use(function (err, req, res, next) {
  if (err.isBoom) {
       return res.status(err.output.statusCode).json(err.output.payload);
  }
});

var server= app.listen(8087);
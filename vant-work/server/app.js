/*
 * @Description: 
 * @version: 
 * @Date: 2019-07-31 20:27:54
 * @LastEditors: yfye
 * @LastEditTime: 2021-06-11 00:42:00
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const swig = require("swig");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
swig.setDefaults({
  cache: false
});
app.set('view cache', false);
app.set("views", './views/pages/');
app.set("view engine", "html");
app.engine('html', swig.renderFile);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
   res.header("Access-Control-Allow-Methods", "*");
 if (req.method.toLowerCase() == 'options')
 res.send(200); 
 else
 next();
});

app.use("/user", require("./routes/user"));
app.use(function (err, req, res, next) {
  if (err.isBoom) {
       return res.status(err.output.statusCode).json(err.output.payload);
  }
});

var server= app.listen(9999);
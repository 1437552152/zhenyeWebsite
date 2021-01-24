/*
 * @Description:
 * @Author: yfye
 * @Date: 2021-01-24 10:41:06
 * @LastEditTime: 2021-01-24 11:57:46
 * @LastEditors: yfye
 */
var nodemailer = require("nodemailer");
const EmailConfig = (type = 1, reciveEmail, subject, text, callBack) => {

console.log(121212);

  var config = {
    host: type == 1 ? "smtp.qq.com" : "smtp.163.com", //网易163邮箱
    port: type == 1 ? 465 : 25, //网易邮箱端口 25
    auth: {
      user: type == 1 ? "1437552152@qq.com" : "16378922@163.com", //邮箱账号
      pass: type == 1 ? "qbfcctlgiebvgghd" : "qbfcctlgiebvgghd", //邮箱的授权码
    },
  };
  // 创建一个SMTP客户端对象
  var transporter = nodemailer.createTransport(config);

  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: "1437552152@qq.com",
    // 主题
    subject: subject,
    // 收件人
    to: reciveEmail,
    // 邮件内容，HTML格式
   // text: text, //可以是链接，也可以是验证码
   html:text
  };

  // 发送邮件
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      callBack(2, error);
    }
    callBack(1);
  });
};

module.exports = {
  EmailConfig,
};

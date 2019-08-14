/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-14 21:29:11
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-15 00:59:05
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
var db = require('../../conf/conf');
const getWebsiteConfig = (req, res) => {
    let sql = "SELECT * FROM baseConfig";
    db.query(sql, function (err, results) {
      if (err) {} else {
        res.json({
          msg: "操作成功",
          status: "200",
          data: results[0]
        });
      }
    });
}

const getLookRecord = (req, res) => {
    let sql = `SELECT COUNT(*) as num,address  FROM  BrowseRecords GROUP BY address`;
    db.query(sql, function (err, results) {
      if (err) {
        console.log(err)
      } else {
        res.json({
          msg: "操作成功",
          status: "200",
          data: results
        });
      }
    });
}

const WebsiteConfigUpdate = (req, res) => {  
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let logoPic = req.body.logoPic;
    let weChatPic = req.body.weChatPic;
    let qqeweimaPic = req.body.qqeweimaPic;
    let weiboPic = req.body.weiboPic;
    let publicPic = req.body.publicPic;
    let webname = req.body.webname;
    let website = req.body.website;
    let address = req.body.address;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let qqCode = req.body.qqCode;
    let content = req.body.content;
    let param = [latitude, longitude, logoPic, weChatPic, qqeweimaPic, weiboPic, publicPic, webname, website, address, email, mobile, qqCode, content];
    let sql = `update  baseConfig set latitude=?,longitude=?,logoPic=?,weChatPic=?,qqeweimaPic=?,weiboPic=?,publicPic=?,webname=?,website=?,address=?,email=?,mobile=?,qqCode=?,content=?`;
    db.query(sql, param, function (err, results) {
      if (err) {
        res.json({
          msg: "修改失败",
          status: "0"
        });
      } else {
        res.json({
          msg: "修改成功",
          status: "200"
        });
      }
    });
  }
module.exports = {
    getWebsiteConfig: getWebsiteConfig,
    WebsiteConfigUpdate: WebsiteConfigUpdate,
    getLookRecord:getLookRecord
}

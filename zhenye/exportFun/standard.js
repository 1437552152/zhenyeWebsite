/*
 * @Description: 
 * @version: 
 * @Date: 2019-09-02 23:50:13
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-09-03 01:04:27
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
let db = require('../conf/conf');
// 获取基础配置,轮播图
const baseConfig=(lang)=>{
    let sql1 = `SELECT * FROM baseConfig  where lang=${lang} and isShow=0`;
    let sql2 = `SELECT * FROM Carousel  where lang=${lang} and isShow=0`;
    let sql3 = `SELECT * FROM news  where lang=${lang} and  newstype=1 and isShow=0 limit 3`;
    let sql4 = `SELECT * FROM products  where lang=${lang} and category=1 and isShow=0 limit 8`;
    let sql = `${sql1};${sql2};${sql3};${sql4}`
    return new Promise((resolve, reject)=>{
    db.query(sql, function (err, results) {
        if (err) {
            reject(err)
          throw err;
        } else {
            let indexData={};
            indexData.baseConfig=results[0][0];
            indexData.CarouselConfig=results[1]
            indexData.hotNews=results[2]
            indexData.hotproducts=results[3]
            resolve(indexData)
      }  });

 })  
}

//获取产品图
const  productList=(lang)=>{
    let sql = `SELECT * FROM  productConfig   where isShow=0  group by  id`;
    return new Promise((resolve,reject)=>{
        db.query(sql, (err, results) => {
            if (err) {
             throw err
            } else {
              let getData1 = Promise.all(results.map(item => {
                let sql = `SELECT * FROM products  where isShow=0  and lang=${lang} and  type=${item.id}`;
                return new Promise((resolve1, reject1) => db.query(sql, (err, respon) => {
                  if (err) {
                    reject1(err);
                  } else {
                    resolve1({
                       productArr: respon,
                       productConfig:item
                    });
                  }
                }));
              }));
              getData1.then(function (success) {
                resolve(success)
              }).catch(error=>{
                reject()  
              })
            }
          });
    })
 
 } 

module.exports = {
    baseConfig: baseConfig,
    productList:productList
}
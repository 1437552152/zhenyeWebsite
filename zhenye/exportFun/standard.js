let db = require('../conf/conf');
// 获取基础配置,轮播图
const baseConfig=(lang)=>{
    let sql1 = `SELECT * FROM baseConfig  where lang=${lang} and isShow=0`;
    let sql2 = `SELECT * FROM Carousel  where lang=${lang} and isShow=0`;
    let sql3 = `SELECT * FROM news  where lang=${lang} and  newstype=1 and isShow=0 limit 3`;
    let sql4 = `SELECT * FROM products  where lang=${lang} and type=1 and isShow=0 limit 8`;
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

module.exports = {
    baseConfig: baseConfig
}
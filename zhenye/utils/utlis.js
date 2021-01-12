var utils = {};
var fs = require('fs');
var qr = require('qr-image');
var images = require("images");
/**
 * 根据地址生成二维码
 * 参数 url(string) 地址
 * 参数 callback(Function)
 */
utils.createQr = function(url, callback){
 
    var qr_png = qr.image(url, { type: 'png',size :6,margin:1 });
    var imgName = +(new Date())+''+Math.ceil(Math.random()*89+10);
    imgName = `${imgName}.png`;
    var qr_pipe = qr_png.pipe(fs.createWriteStream(imgName));
    qr_pipe.on('error', function(err){
        console.log(err);
        callback(err,null);
        return;
    })
    qr_pipe.on('finish', function(){
        callback(null,imgName);
    })
};
 
/**
 * 给图片添加水印
 * 参数 sourceImg(string) 原图片路径
 * 参数 waterImg(string) 水印图片路径
 * 参数 callback(Function)
 */
utils.addWater = function(sourceImg, waterImg, callback){
    var timestamp = Date.parse(new Date());
    var lastput =`public/erweima/${timestamp}.png`;
    images(waterImg)                     //Load image from file 
                                            //加载图像文件
        .size(100,100)                          //Geometric scaling the image to 400 pixels width
                                            //等比缩放图像到400像素宽
        .draw(images(sourceImg),120,120)   //Drawn logo at coordinates (70,260)//为了遮住不该看的东西..
                                            //在(10,10)处绘制Logo
        .save(lastput);
    callback(lastput);
};
 
module.exports = utils;
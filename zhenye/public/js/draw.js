/*
 * @Author       : yfye
 * @Date         : 2021-01-10 14:08:31
 * @LastEditors  : yfye
 * @LastEditTime : 2021-01-10 14:29:03
 * @FilePath     : \zhenyeWebsite-500Money_xianyu_infoWrite\zhenye\public\js\draw.js
 */
 // 验证码生成
 function code_draw() {
    var canvas_width = $('#canvas').width(); var canvas_height = $('#canvas').height(); var canvas = document.getElementById("canvas"); var context = canvas.getContext("2d"); canvas.width = canvas_width; canvas.height = canvas_height; var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0"; var aCode = sCode.split(","); var aLength = aCode.length; var value = []; for (var i = 0; i <= 3; i++) { var j = Math.floor(Math.random() * aLength); var deg = Math.random() * 30 * Math.PI / 180; var txt = aCode[j]; value[i] = txt.toLowerCase(); var x = 10 + i * 20; var y = 20 + Math.random() * 8; context.font = "bold 23px 微软雅黑"; context.translate(x, y); context.rotate(deg); context.fillStyle = code_randomColor(); context.fillText(txt, 0, 0); context.rotate(-deg); context.translate(-x, -y); }
    value = value.join(""); $('#canvas').attr('data-code', value)
    for (var i = 0; i <= 5; i++) { context.strokeStyle = code_randomColor(); context.beginPath(); context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height); context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height); context.stroke(); }
    for (var i = 0; i <= 30; i++) { context.strokeStyle = code_randomColor(); context.beginPath(); var x = Math.random() * canvas_width; var y = Math.random() * canvas_height; context.moveTo(x, y); context.lineTo(x + 1, y + 1); context.stroke(); }
  }
  function code_randomColor() { var r = Math.floor(Math.random() * 256); var g = Math.floor(Math.random() * 256); var b = Math.floor(Math.random() * 256); return "rgb(" + r + "," + g + "," + b + ")"; }

/*
 * @Author       : yfye
 * @Date         : 2021-01-20 14:11:06
 * @LastEditors  : yfye
 * @LastEditTime : 2021-01-20 15:01:13
 * @FilePath     : \zhenye\utils\swagger\index.js
 */
const path = require('path')
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('swagger-jsdoc')
//配置swagger-jsdoc
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'api',
        version: '1.0.0',
        description: `博客前台+管理后台共用接口api`
      }
    },
    // 去哪个路由下收集 swagger 注释
    apis: [path.join(__dirname,'../../routes/*.js')]
  }

  var swaggerJson = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  }
  const swaggerSpec = swaggerDoc(options)
  
  var swaggerInstall = function(app) {
    if (!app){
      app = express()
    }
    // 开放相关接口，
    app.get('/swagger.json', swaggerJson);
    // 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由
    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  }
  module.exports = swaggerInstall
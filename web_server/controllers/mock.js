const fs = require('fs');
const path = require('path');
// http://thx.github.io/RAP/index_zh.html; http://thx.github.io/RAP/study.html#
var Mock = require('mockjs'); 
const resourcePath = path.join(__dirname, '..', 'resources/mock');

let queryUser = async (ctx, next) => {
  console.log(ctx.request.body);
  let filePath = path.join(resourcePath, 'queryUser.js');
  let strContent = require(filePath);
  ctx.response.body =  strContent;
};

let getVer = async (ctx, next) => {
  console.log(ctx.request.body);
  let filePath = path.join(resourcePath, 'getVer.js');
  let strContent = require(filePath);
  ctx.response.body = strContent
}

let login = async (ctx, next) => {
  let name = ctx.request.body.username || '';
  let password = ctx.request.body.password || '';  
  console.log(ctx.request.body);
  if (name === 'hely' && password === '88888888') {
    let filePath = path.join(resourcePath, 'login.js');
    let strContent = require(filePath);
    ctx.response.body = strContent;
  } else {
    ctx.response.body = {
      'status': 0,
      'text': `<h1>登录失败!</h1><p>请核对帐户和密码信息。<a href='./index.html'>请点击重试</a></p>`
    }
  }
}

module.exports = {
  'POST /api/query-user': queryUser,
  'GET /api/get-ver': getVer,
  'POST /api/login': login
}

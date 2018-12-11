const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
// post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，
// 还是koa提供的request对象，都不提供解析request的body的功能！
const bodyParser = require('koa-bodyparser');
const app = new Koa(); // 创建一个Koa对象表示web app本身:
// 配置文件
const config = require('./config/index.js')
// 导入controller middleware:
const controller = require('./controller');
// 打印日志
let log4js = require('./utils/loggers/log4js').log4js;
let logger = require('./utils/loggers/log4js').logger('default');


app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET')
  ctx.set('Access-Control-Allow-Header', 'X-Requested-With')
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  console.log(ctx.request.header.origin)
  await next();
});

/*
app.use(async (ctx, next) => {
  if (ctx.request.header.origin !== ctx.origin && whiteList.includes(ctx.request.header.origin)) {
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
    ctx.set('Access-Control-Allow-Credentials', true);
  }
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Max-Age', 3600 * 24);
    ctx.body = '';
  }
  await next();
}); */

// x-response-time 响应时间
app.use(async (ctx, next) => {
  const start = Date.now();
  await next(); // 为什么要调用await next()？
  // 原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，
  // 然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，
  // 这些 middleware 可以组合起来，完成很多有用的功能。
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// middleware 的顺序很重要，也就是调用 app.use()的顺序决定了 middleware 的顺序。
// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  // GET /picture-manage.html - 0
  logger.info(`${ctx.method} ${ctx.url} - ${ms}`);
  // console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// 解析 request 的 body 数据
app.use(bodyParser());

// 添加 url-route -- controller.js
app.use(controller());

// 添加 router 中间件
app.use(router.routes());

app.listen(config.port);
console.log(`app started at port ${config.port}...`);
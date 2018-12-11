/**
 * @file log4js.js 打印日志
 * @author
 * @par Copyright (c): issac
 */
let log4js = require('log4js');
log4js.configure(require('./log4js_config'));

module.exports = {
  log4js: log4js,
  logger: function(name){
    let logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
  }
};
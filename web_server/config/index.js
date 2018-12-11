'use strict'

const path = require('path')

module.exports = {
	port: 3000, // 启动端口
	database: { // 数据库配置
		HOST: 'localhost',
    PORT: '3306',
    DATABASE: 'my_datas',
    USERNAME: 'root',
    PASSWORD: 'qwe@513325'
  },
	log4js: 'utils/loggers/log4js_config.js'
}

const fs = require('fs');

// 添加映射 -- Koa router.get()
function addMapping(router, mapping) {
    for (let url in mapping) {
    	// 以 GET 开头
        if (url.startsWith('GET ')) {
            let path = url.substring(4); // 截断前4个字符
            router.get(path, mapping[url]); // Koa router.get()
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

// 添加 路由控制器 -- 读取 controllers 目录下的js文件
function addControllers(router, dir) {
	// 读取该路径下的 js 文件 -- 读取不了子目录下的js文件
    let files = fs.readdirSync(__dirname + '/' + dir);
    let js_files = files.filter((f) => {
    	// console.log(f); // 如果需要读取子目录下的js，可在此处处理
        return f.endsWith('.js');
    });
    // console.log(js_files);
    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        // console.log(mapping);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
	// 如果不传参数，扫描目录默认为'controllers'
    let controllers_dir = dir || 'controllers';
    let router = require('koa-router')();
    // 添加控制器路由
    addControllers(router, controllers_dir);
    // 返回的是一个函数
    return router.routes();
};
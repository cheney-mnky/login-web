# login-web
实现功能： 后台生成随机验证码图片并获取；用户需要输入正确的密码验证码才能登录；并且能记住密码，自动登录等功能；见文件夹中的"效果图.png"。

打开方法：
第一步  搭建，模拟后台服务器
（1）打开命令提示符 cmd, cd进入web-server文件;
（2）安装依赖 npm install或cnpm install;
（3）在localhost:3000端口运行本地服务器 npm run dev ；

第二步  打开文件 ./index.html 即可；

第三步  输入用户名，密码，验证码；选择是否记住密码，是否自动登录；最后点击登录

技术方法：
（1）cdn引入vue框架构建，弹性布局， 构建网页
（2）利用mock.js模拟本地的后台服务器，生成返回数据（状态码，随机验证码图片，图片链接；登录反馈数据）
（3）cdn引入axios,qs，利用axios发送http get请求；axios拦截，发送post请求；并接收服务器返回的数据

获取验证码："http://localhost:3000/api/get-ver" （GET请求）
返回示例：
     {   
         url: "test.iwoyi.cn:8899/uploads/201811/28/p497_idencode.png", 
         status: 1,
         data: Array(50)
     }
------------------------------------------

登录： "http://localhost:3000/api/login"  （POST请求）
请求参数(JSON)：
	"username":"hely",	用户名
	"password":"88888888", 密码
返回示例：
    {
    "msg":"登录成功!",
    "status":1,  
    "token":    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mjk2ODE4NzY1MDMzNjc2ODEsIm5hbWUiOiJcdTRmNTVcdTgyNmZcdTdmMThcdTRlMTNcdTc1MjgiLCJsZXZlbCI6MSwibGFzdF91cGRhdGV0aW1lIjoxNTQzMzg3MjM2fQ.lXv5pJznss-VVJjpZ3ex1kXOri5GzGLr95X0-aYbjFM"
    }

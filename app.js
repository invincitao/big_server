// 三行代码
const express = require('express');
const server = express();
// 跨域
const cors = require('cors');
server.use(cors());
// 设为静态托管
server.use('/uploads', express.static('uploads'));

// 4.0 设置jwt
/*  
 请使用  npm i express-jwt --save 安装express-jwt包
*/
const jwt = require('express-jwt');
// app.use(jwt().unless());
// jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless() 约定某个接口不需要身份认证
server.use(jwt({
    secret: 'gz61', // 生成token时的 钥匙，必须统一
    algorithms: ['HS256'] // 必填，加密算法，无需了解
}).unless({
    path: ['/api/login', '/api/register', /^\/uploads\/.*/] // 除了这两个接口，其他都需要认证
}));

// 写路由
const userRouter = require('./router/user_router');
const accountRouter = require('./router/account_router');
const cateRouter = require('./router/cate_router');
server.use('/api', userRouter);
server.use('/my', accountRouter);
server.use('/my/article', cateRouter);


server.listen(3000, () => {
    console.log('3000端口准备就绪');
})
// 三行代码
const express = require('express');
const server = express();
// 跨域
const cors = require('cors');
server.use(cors());

server.listen(3000, () => {
    console.log('3000端口准备就绪');
})
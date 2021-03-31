// 三行代码
const express = require('express');
const server = express();
// 跨域
const cors = require('cors');
server.use(cors());
// 设为静态托管
server.use('/uploads', express.static('uploads'));
server.listen(3000, () => {
    console.log('3000端口准备就绪');
})
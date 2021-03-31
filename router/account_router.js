const express = require('express');
const router = express.Router();
const conn = require('../util/sql.js');
const cors = require('cors');
router.use(cors());

// 个人中心
router.get('/userinfo', (req, res) => {
    res.send('个人中心');
})

// 更新个人中心
router.post('/userinfo', (req, res) => {
    res.send('更新个人中心');
})

// 上传用户头像
router.post('/uploadPic', (req, res) => {
    res.send('上传用户头像');
})

// 重置密码
router.post('/updatepwd', (req, res) => {
    res.send('上传用户头像');
})

module.exports = router;
const express = require('express');
const router = express.Router();
const conn = require('../util/sql.js');
const cors = require('cors');
router.use(cors());


// 注册接口
router.post('/reguser', (req, res) => {
    res.send('注册');
})

// 登录接口
router.post('/login', (req, res) => {
    res.send('登录');
})

module.exports = router;
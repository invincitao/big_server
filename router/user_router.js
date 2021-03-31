const express = require('express');
const router = express.Router();
const conn = require('../util/sql.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
router.use(cors());
// 解析响应头的键值对格式的参数
router.use(express.urlencoded());
// 注册接口
router.post('/register', (req, res) => {
    const { userName, userPwd } = req.body;
    const sqlSelect = `select * from users where username="${userName}"`;
    conn.query(sqlSelect, (err, result) => {
        // 存在就注册失败;
        if (err) return res.json({ "status": 1, "message": "参数错误" });
        if (result.length > 0) return res.json({ "status": 1, "message": "注册失败,用户名已经存在" });
        // 如果不存在就注册新用户
        const sqlReg = `insert into users(username,password) values("${userName}","${userPwd}")`;
        conn.query(sqlReg, (err, result) => {
            if (err) return res.json({ "status": 1, "message": "注册失败！" });
            return res.json({ "status": 0, "message": "注册成功！" });
        })
    })

})

// 登录接口
router.post('/login', (req, res) => {
    const { userName, userPwd } = req.body;
    const sqlLogin = `select * from users where username="${userName}" and password="${userPwd}"`;
    conn.query(sqlLogin, (err, result) => {
        if (err) return res.json({ "status": 1, "message": "服务器错误" });
        if (result.length > 0) {
            // 登陆成功带token
            const tokenStr = jwt.sign({ name: userName }, 'gz61', { expiresIn: 7200 });
            const token = 'Bearer ' + tokenStr
            return res.json({ "status": 0, "message": "登录成功", token });
        } else {
            return res.json({ "status": 1, "message": "登录失败,登陆失败，用户名密码不对" });
        }
    })
})

module.exports = router;
const express = require('express');
const router = express.Router();
const conn = require('../util/sql.js');
const cors = require('cors');
router.use(cors());
router.use(express.urlencoded());

// 获取个人信息
router.get('/userinfo', (req, res) => {
    const { userName } = req.query;
    const sqlSel = `select id,username,nickname,email,userPic from users where username="${userName}" `;
    conn.query(sqlSel, (err, result) => {
        if (err) return res.json({ "status": 1, "message": "参数错误" });
        console.log(result[0]);
        res.json({ "status": 0, "message": "获取成功！", data: result[0] });
    })
})

// 更新个人中心
router.post('/userinfo', (req, res) => {
    const { id, nickname, email, userPic } = req.body;
    // 不用全部修改
    const userArr = [];
    if (nickname) userArr.push(`nickname="${nickname}"`);
    if (email) userArr.push(`email="${email}"`);
    if (userPic) userArr.push(`userPic="${userPic}"`);
    const userStr = userArr.join();
    // console.log(userStr);
    const sqlUpdate = `update users set ${userStr} where id="${id}"`;
    // const sqlUpdate = `update users set nickname="${nickname}",email="${email}",userPic="${userPic}" where id="${id}"`;
    conn.query(sqlUpdate, (err, result) => {
        if (err) return res.json({ "status": 1, "message": "参数错误" });
        res.json({ "status": 0, "message": "修改用户信息成功" });
    })
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
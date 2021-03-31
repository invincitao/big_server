const express = require('express');
const router = express.Router();
const conn = require('../util/sql.js');
const multer = require('multer');
const cors = require('cors');
router.use(cors());
router.use(express.urlencoded());

// 精细化去设置，如何去保存文件
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function (req, file, cb) {
        console.log('file', file)
        // 目标： 新名字是时间戳+后缀名
        const filenameArr = file.originalname.split('.');
        // filenameArr.length-1是找到最后一个元素的下标
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName) //
    }
})

const upload = multer({ storage });
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
router.post('/uploadPic', upload.single('file_data'), (req, res) => {
    // res.send(req.file);
    res.json({
        "status": 0,
        "src": "http://127.0.0.1:3000/uploads/" + req.file.filename
    })
})

// 重置密码
router.post('/updatepwd', (req, res) => {
    const { id, oldPwd, newPwd } = req.body;
    // 先要判断输入的旧密码
    const sqlOld = `select password from users where id=${id}`;
    conn.query(sqlOld, (err, results) => {
        if (err) return res.json({ "status": 500, "message": "服务器错误" });
        if (results[0].password != oldPwd) return res.json({ "status": 1, "message": "旧密码错误" });
        // console.log(result[0]);
        const sqlNew = `update users set password="${newPwd}" where id=${id}`;
        conn.query(sqlNew, (err, result) => {
            // console.log(results[0].password);
            if (err) return res.json({ "status": 500, "message": "服务器错误" });
            if (results[0].password == newPwd) return res.json({ "status": 1, "message": "输入的密码与旧密码一样" });
            res.json({ "status": 0, "message": "修改密码成功" });
        })
    })
})

module.exports = router;
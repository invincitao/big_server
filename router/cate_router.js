const express = require('express');
const router = express.Router();
const conn = require('../util/sql.js');
const cors = require('cors');
router.use(cors());
router.use(express.urlencoded());

// 获取文章分类列表
router.get('/cates', (req, res) => {
    const sqlSelect = `select * from categories`
    conn.query(sqlSelect, (err, result) => {
        if (err) return res.json({ "status": 500, "message": "服务器错误" });
        return res.json({ "status": 0, "message": "获取文章分类列表成功!", "data": result });
    })
})

// 新增文章分类
router.post('/addcates', (req, res) => {
    const { name, slug } = req.body;
    const sqlAdd = `insert into categories(name,slug) values("${name}","${slug}")`;
    conn.query(sqlAdd, (err, result) => {
        if (err) return res.json({ "status": 500, "message": "服务器错误" });
        return res.json({ "status": 0, "message": "新增文章分类成功！" });
    })
})

// 根据 Id 删除文章分类
router.get('/deletecate', (req, res) => {
    const { id } = req.query;
    const sqlDel = `delete from categories where id=${id}`;
    conn.query(sqlDel, (err, result) => {
        if (err) return res.json({ "status": 500, "message": "服务器错误" });
        return res.json({ "status": 0, "message": "删除文章分类成功！" });
    })
})

// 根据 Id 获取文章分类数据
router.get('/getCatesById', (req, res) => {
    const { id } = req.query;
    const sqlSelect = `select * from categories where id=${id}`;
    conn.query(sqlSelect, (err, result) => {
        if (err) return res.json({ "status": 500, "message": "服务器错误" });
        return res.json({ "status": 0, "message": "获取文章分类数据成功!", "data": result });
    })
})

// 根据 Id 更新文章分类数据
router.post('/updatecate', (req, res) => {
    const { id, name, slug } = req.body;
    const sqlAdd = `update categories set name="${name}",slug="${slug}" where id=${id}`;
    conn.query(sqlAdd, (err, result) => {
        if (err) return res.json({ "status": 500, "message": "服务器错误" });
        return res.json({ "status": 0, "message": "更新分类信息成功!" });
    })
})

module.exports = router;
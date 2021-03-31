const express = require('express');
const router = express.Router();
const conn = require('../util/sql.js');
const cors = require('cors');
router.use(cors());

// 获取文章分类列表
router.get('/cates', (req, res) => {
    res.send('获取文章分类列表');
})

// 新增文章分类
router.post('/addcates', (req, res) => {
    res.send('新增文章分类');
})

// 根据 Id 删除文章分类
router.get('/deletecate', (req, res) => {
    res.send('删除文章分类');
})

// 根据 Id 获取文章分类数据
router.get('/getCatesById', (req, res) => {
    res.send('获取文章分类数据');
})

// 根据 Id 更新文章分类数据
router.post('/updatecate', (req, res) => {
    res.send('更新文章分类数据');
})
module.exports = router;
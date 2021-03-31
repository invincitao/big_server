const mysql = require('mysql');

const connection = mysql.createConnection({
    // 对象的属性名字不能改变
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bignews1'
});

connection.connect((err) => {
    if (err) return console.log('数据库连接失败');
    console.log('数据库连接成功');
})

// 导出
module.exports = connection;
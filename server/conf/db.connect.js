var mysql=require('mysql');
var conf=require('../conf/db.conf.js');
//创建连接池
var pool  = mysql.createPool(conf.mysql);

module.exports = pool;

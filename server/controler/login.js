var express = require('express');
var api = express.Router();
var pool = require('../conf/db.connect.js');

api.post('/login', function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var sql = 'SELECT * FROM register where account="' + req.body.account +'"and pwd="' + req.body.pwd + '"';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					if(results.length == 0){
						res.status(401).send({msg:'账号密码错误'});
						return;
					}
					res.send({
						msg:'登录成功',
						url:'/home'
					});
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});
module.exports = api;

var pool = require('../conf/db.connect.js');
var express = require('express');
var api = express.Router();

api.post('/regiter', function(req, res, next) {
		pool.getConnection(function(err, connection) {
			var sql = 'SELECT * FROM login where user="' + req.body.user +'"and pass="' + req.body.pass + '"';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					res.status(500).send(error);
					console.log(error);
				} else {
					if(results == '[]'){
						//res.status(400).send({	msg:'账号密码错误'});
						res.send({
							wrongUser:1,
							msg:'账号密码错误'
						});
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

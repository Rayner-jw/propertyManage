var express = require('express');
var api = express.Router();
var pool = require('../conf/db.connect.js');
//找回密码
api.put('/lookfor', function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			console.log(req.session);
			var account = req.body.account,
			 		pwd = req.body.pwd,
					email = req.body.email ;
			var sql = 'UPDATE register SET pwd="' + pwd + '" WHERE account="' + account + '" AND userMail="' + email + '"';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					res.send({msg:'已提交成功',url:'/user/login'})
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});
module.exports = api;

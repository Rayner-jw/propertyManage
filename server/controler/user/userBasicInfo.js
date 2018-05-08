var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//获取用户资料和状态
api.route('/userBasicInfo').put(function(req, res, next){
	pool.getConnection(function(err, connection) {
		if(err){console.log('连接池连接错误');}
		var sql = 'SELECT * FROM userinfo where id="' + req.body.uid +'" LIMIT 1';
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error){
				console.log(error);
				res.status(500).send(error);
			} else {
				console.log();
				res.send(results[0]);
			}
		});
	});
	pool.on('error', function(err) {
		console.log("[mysql error]",err);
	});
//换绑邮箱
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var userMail = req.body.userMail;
			var uid = req.body.uid;
			var sql = 'UPDATE register AS a SET a.userMail="' + userMail + '" WHERE a.id="' + uid + '"';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					res.send({msg:'换绑邮箱成功'});
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
//获取用户楼房信息
}).get(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var uid = req.query.uid;
			var sql = 'SELECT b.* FROM userinfo a,houseinfo b WHERE a.houseId=b.id AND a.id="' + uid + '"';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					res.send(results[0]);
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});

module.exports = api;

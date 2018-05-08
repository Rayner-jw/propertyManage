var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//验证是否已被注册
api.route('/account').get(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var sql = 'SELECT account FROM register WHERE account = "' + req.query.account + '"limit 1'
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					if(results.length == 0){
						res.end();
					}else{
						res.status(401).end();
					}
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
//注册
}).put(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			//插入数据
			var sql = 'INSERT INTO register (account, pwd, userMail) VALUES ("' + req.body.account + '","' + req.body.pwd + '","' + req.body.email + '")';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					req.session.account = req.body.account;
					req.session.userStatus == 1
					res.send({msg:'注册成功',url:'/user/basic',id:results.insertId});
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
//修改密码
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var oldPwd = req.body.oldPwd;
			var newPwd = req.body.newPwd;
			var uid = req.body.uid;
			//匹配id与密码，正确则更新密码
			//mysql不能在更新表的时候查询这个表，会报错You can't specify target table 'register' for update in FROM clause
			//解决：把需要要的数据查询出来做一个第三方表b，然后把b作为查询表查询。
			var sql = 'UPDATE register AS a SET a.pwd="' + newPwd + '" WHERE a.id="' + uid + '" AND a.pwd="' + oldPwd + '"';
			//var sql = 'UPDATE register AS a SET a.pwd="' + newPwd + '" WHERE a.id=(SELECT b.id FROM (SELECT id,pwd FROM register) AS b WHERE b.id="' + uid + '"AND b.pwd="' + oldPwd + '"LIMIT 1)';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					if(results.affectedRows == 0){
						res.send({msg:'旧密码不正确，若忘记，请点击忘记密码'});
					}else{
						res.send({msg:'修改成功，请重新登录',url:'/user'});
					}
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});

module.exports = api;

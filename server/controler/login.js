var express = require('express');
var api = express.Router();
var pool = require('../conf/db.connect.js');
//登录
api.post('/login', function(req, res, next) {
	console.log(pool);
		pool.getConnection(function(err, connection) {
			console.log(connection);
			if(err){console.log('连接池连接错误');}
			console.log(req.session);
			var sql = 'SELECT a.id, a.account, a.pwd, a.role,b.userStatus FROM register a LEFT JOIN ' +
								'userinfo b on a.id=b.id WHERE a.account="' + req.body.account +'"';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					//查无数据，未注册
					if(results.length == 0){
						res.status(401).send({msg:'该账号还未注册,请先注册'});
					//查有数据，匹配密码
					}else{
						//密码匹配不正确
						if(results[0].pwd != req.body.pwd){

							res.status(401).send({msg:'账号密码错误'});
						//密码正确
						}else{
							req.session.account = req.body.account;
							req.session.role = 0;
							var data = {
								msg:'登录成功',
								url:'/user/home',
								id: results[0].id
							}
							//管理员
							if(results[0].role == 0){
								data.url = '/admin/home';
								res.send(data);
								return;
							}
							//用户
							var userStatus = results[0].userStatus;
							if(userStatus == null){
								userStatus = 1;
							}
							req.session.role = 1;
							req.session.userStatus = userStatus;
							//审核不通过
							if(userStatus == 0){data.url = '/user/basicChecking'}
							//未提交资料
							if(userStatus == 1){data.url = '/user/basic'}
							//审核中
							if(userStatus == 2){data.url = '/user/basicChecking'}
							//通过
							res.send(data);
						}
					}
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});
module.exports = api;

var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//填写基本信息
api.route('/userBasic').put(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var id = req.body.uid,
					userName = req.body.userName,
			 		idCard = req.body.idCard,
					userPhone = req.body.userPhone;
			var sql = 'INSERT INTO userInfo(id, userName, idCard, userPhone) VALUES (' + id + ',"' + userName + '","' + idCard + '","' + userPhone + '")';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					if(error.code == "ER_DUP_ENTRY"){
						res.status(500).send({msg:'您已经提交填写内容,如需修改请前往个人中心'});
					}
					res.status(500).send(error);
				} else {
					if(results.affectedRows == 1){
						req.session.userStatus = 2;
						res.status(200).send({msg:'填写基本资料成功',url:'/user/home',id: id});
					}
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
//获取基本信息
}).get(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			//联表查询业主信息
			var sql = 'SELECT a.account, a.userMail, b.userName,b.userPhone, b.idCard FROM register AS a, userInfo AS b ' +
								'where a.id = b.id AND a.id ="' + req.query.uid + '"';
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
//修改基本信息
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var id = req.body.uid,
					userName = req.body.userName,
			 		idCard = req.body.idCard,
					userPhone = req.body.userPhone,
					userStatus = req.body.userStatus;
			if(typeof(userStatus) == 'undefined'){
				userStatus = '';
			}
			var sql = 'UPDATE userinfo SET userName="' + userName +'", idCard="' + idCard +'", userPhone="' + userPhone + '", userStatus=' +
								'(CASE WHEN ' + String(userStatus).length + '=0 THEN userStatus ELSE "' + userStatus + '" END) ' +
			    			'WHERE id="' + id + '"';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					if(results.affectedRows == 1){
						res.send({msg:'修改成功'});
						return;
					}
					res.send(results);
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});

module.exports = api;

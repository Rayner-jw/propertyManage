var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//更新消息为 已读
api.route('/message').put(function(req, res, next){
	pool.getConnection(function(err, connection) {
		if(err){console.log('连接池连接错误');}
		var messageId = req.body.messageId;
		var sql = 'update message set isread=1 WHERE messageId="' + messageId + '"';
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error){
				console.log(error);
				res.status(500).send(error);
			} else {
				res.send(results);
			}
		});
	});
	pool.on('error', function(err) {
		console.log("[mysql error]",err);
	});
//发缴费通知消息
}).get(function(req, res, next){
	pool.getConnection(function(err, connection) {
		if(err){console.log('连接池连接错误');}
		var sendTo = req.query.sendTo,
				createAt = req.query.createAt,
				content = '请尽快缴纳年度管理费';
		var sql = 'INSERT INTO message(content,createAt,sendTo) VALUE("' + content + '","' + createAt + '","' + sendTo + '")';
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error){
				console.log(error);
				res.status(500).send(error);
			} else {
				res.end();
			}
		});
	});
	pool.on('error', function(err) {
		console.log("[mysql error]",err);
	});
//查看消息
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var searchs = req.body.searchs;
			var pageSize = req.body.pageSize;
			var pageStart = req.body.pageSize * (req.body.currentPage - 1);
			if(typeof(searchs.isread) == 'undefined'){
				searchs.isread = '';
			}
			//分页查询 已发送的消息
			if(typeof(req.body.sent) != 'undefined'){
				var sql = 'select * from message WHERE sendFrom=0 ' +
										'AND isread =(CASE WHEN ' + String(searchs.isread).length + '=0 THEN isread ELSE "' + searchs.isread + '" END) ' +
									'order by cast(createAt as datetime) desc ' +
									'limit ' + pageStart + ',' + pageSize;
			}
			//分页查询 已收到的消息
			if(typeof(req.body.receive) != 'undefined'){
				var sql = 'select * from message WHERE sendTo=0 ' +
										'AND isread =(CASE WHEN ' + String(searchs.isread).length + '=0 THEN isread ELSE "' + searchs.isread + '" END) ' +
									'order by cast(createAt as datetime) desc ' +
									'limit ' + pageStart + ',' + pageSize;
			}
			connection.query(sql, function (error, results, fields) {
				if (error){
					connection.release();
					console.log(error);
					res.status(500).send(error);
				} else {
					if(results.length == 0){
						connection.release();
						res.send({results:results});
					}else{
						//已发送的消息总数
						if(typeof(req.body.sent) != 'undefined'){
							var sql2 = 'select count(messageId) total from message WHERE sendFrom=0';
						}
						//已收到的消息总数
						if(typeof(req.body.receive) != 'undefined'){
							var sql2 = 'select count(messageId) total from message WHERE sendTo=0';
						}
						connection.query(sql2, function (error2, results2, fields2) {
							connection.release();
							if (error2){
								console.log(error2);
								res.status(500).send(error2);
							} else {
								res.send({total:results2[0].total,results:results});
							}
						});
					}
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
//.........
}).delete(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var sql = 'DELETE FROM message WHERE messageId="' + req.query.messageId + '"';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					res.send(results);
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
})

module.exports = api;

var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//最新公告
api.route('/annocement').get(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var accountId = req.query.uid;
			var sql = 'select * from ' +
									'(SELECT a.*,1 as isread FROM annocement a WHERE annocementId in (SELECT annocementId FROM readAnnocement WHERE accountId="' + accountId + '") ' +
									'UNION ' +
									'SELECT a.*,0 as isread FROM annocement a WHERE annocementId not in (SELECT annocementId FROM readAnnocement WHERE accountId="' + accountId + '") ' +
									'order by annocementId) b ' +
								'order by cast(b.createAt as datetime) desc limit 0,5';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					if(results.length == 0){
						res.send({'results':[]});
						return;
					}
					res.send({'results':results});
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
//业主 查看公告
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var accountId = req.body.accountId;
			var searchs = req.body.searchs;
			var pageSize = req.body.pageSize;
			var pageStart = req.body.pageSize * (req.body.currentPage - 1);
			if(typeof(searchs.annocementType) == 'undefined'){
				searchs.annocementType = '';
			}
			if(typeof(searchs.isread) == 'undefined'){
				searchs.isread = '';
			}
			//分页查询需要的数据
			var sql = 'select * from ' +
									'(SELECT a.*,1 as isread FROM annocement a WHERE annocementId in (SELECT annocementId FROM readAnnocement WHERE accountId="' + accountId + '") ' +
									'UNION ' +
									'SELECT a.*,0 as isread FROM annocement a WHERE annocementId not in (SELECT annocementId FROM readAnnocement WHERE accountId="' + accountId + '") ' +
									'order by annocementId) b ' +
								'WHERE ' +
									'b.annocementType =(CASE WHEN ' + String(searchs.annocementType).length + '=0 THEN b.annocementType ELSE "' + searchs.annocementType + '" END) ' +
									'AND b.isread =(CASE WHEN ' + String(searchs.isread).length + '=0 THEN b.isread ELSE "' + searchs.isread + '" END) ' +
								'order by cast(b.createAt as datetime) desc ' +
								'limit ' + pageStart + ',' + pageSize;
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
						//查询公告记录总数
						var sql2 = 'select count(annocementId) total from (select annocementId from annocement) a';
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
//阅读 则添加入已读表
}).put(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var accountId = req.body.accountId,
					annocementId = req.body.annocementId;
			var sql = 'INSERT INTO readAnnocement(accountId,annocementId) VALUE("' + accountId + '","' + annocementId + '")';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					res.send({results});
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});
module.exports = api;

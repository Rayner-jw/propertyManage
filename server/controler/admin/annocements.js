var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//发布公告
api.route('/annocement').put(function(req, res, next){
	pool.getConnection(function(err, connection) {
		if(err){console.log('连接池连接错误');}
		var annocementType = req.body.annocementType,
				annocementContent = req.body.annocementContent,
				createAt = req.body.createAt;
		var sql = 'INSERT INTO annocement(annocementType,annocementContent,createAt) VALUE("' + annocementType + '","' + annocementContent + '","' + createAt + '")';
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error){
				console.log(error);
				res.status(500).send(error);
			} else {
				res.send({msg:'成功发布一条公告'});
			}
		});
	});
	pool.on('error', function(err) {
		console.log("[mysql error]",err);
	});
//查看公告记录
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var searchs = req.body.searchs;
			var pageSize = req.body.pageSize;
			var pageStart = req.body.pageSize * (req.body.currentPage - 1);
			if(typeof(searchs.annocementType) == 'undefined'){
				searchs.annocementType = '';
			}
			//分页查询需要的数据
			var sql = 'select * from annocement WHERE ' +
									'annocementType =(CASE WHEN ' + String(searchs.annocementType).length + '=0 THEN annocementType ELSE "' + searchs.annocementType + '" END) ' +
								'order by cast(createAt as datetime) desc ' +
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
//删除公告
}).delete(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var sql = 'DELETE FROM annocement WHERE annocementId="' + req.query.annocementId + '"';
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

var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//处理投诉，更新处理状态 处理结果
api.route('/complains').put(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var complainId = req.body.complainId,
					statusResult = req.body.statusResult;
			var sql = 'UPDATE complain SET statusResult=' + statusResult +',status=1  where complainId ="' + complainId + '" LIMIT 1';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					if(results.affectedRows == 1){
						res.status(200).send({msg:'处理成功'});
					}
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
//分页投诉记录
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var searchs = req.body.searchs;
			var pageSize = req.body.pageSize;
			var pageStart = req.body.pageSize * (req.body.currentPage - 1);
			if(typeof(searchs.complainBy) == 'undefined'){
				searchs.complainBy = '';
			}
			if(typeof(searchs.adminIsRead) == 'undefined'){
				searchs.adminIsRead = '';
			}
			if(typeof(searchs.status) == 'undefined'){
				searchs.status = '';
			}
			if(typeof(searchs.complainType) == 'undefined'){
				searchs.complainType = '';
			}
			//分页查询需要的数据
			var sql = 'select * from complain WHERE ' +
									'adminIsRead =(CASE WHEN ' + String(searchs.adminIsRead).length + '=0 THEN adminIsRead ELSE "' + searchs.adminIsRead + '" END) ' +
									'AND status =(CASE WHEN ' + String(searchs.status).length + '=0 THEN status ELSE "' + searchs.status + '" END) ' +
									'AND complainType =(CASE WHEN ' + String(searchs.complainType).length + '=0 THEN complainType ELSE "' + searchs.complainType + '" END) ' +
								'order by cast(complainTime as datetime) desc ' +
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
						//查询报修记录总数
						var sql2 = 'select count(complainId) total from (select complainId from complain) a';
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
			var sql = 'DELETE FROM complain WHERE complainId="' + req.query.complainId + '"';
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
//已读投诉，已读 1
}).get(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var sql = 'UPDATE complain SET adminIsRead=1 where complainId ="' + req.query.complainId + '" LIMIT 1';
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

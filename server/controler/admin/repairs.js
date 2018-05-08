var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//申请报修
api.route('/repairs').put(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var sql = null;
			//处理维修，加入维修人员，状态为 1维修中
			if(typeof(req.body.repairBy) != 'undefined'){
				sql = 'UPDATE repair SET repairBy="' + req.body.repairBy + '",repairProcess = 1 WHERE repairId=' + req.body.repairId;
			}
			//完成维修，加入完成时间，状态为 2已完成
			if(typeof(req.body.finishTime) != 'undefined'){
				sql = 'UPDATE repair SET finishTime="' + req.body.finishTime + '",repairProcess = 2 WHERE repairId=' + req.body.repairId;
			}
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					console.log(results);
					if(results.affectedRows == 1){
						res.status(200).send({msg:'处理成功'});
					}
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
}).get(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			if( typeof(req.query.uid) != 'undefined' ){
				//获取未完成的报修信息
				var sql = 'SELECT repairId, repairType, repairContent, repairProcess FROM repair where repairProcess < 2 AND accountId ="' + req.query.uid + '" order by repairId desc';
			}else if(typeof(req.query.repairId) != 'undefined'){
				//取消报修申请，设置状态为3
				var sql = 'UPDATE repair SET repairProcess=3 where repairId ="' + req.query.repairId + '" LIMIT 1';
			}else{
				res.status(400).send('参数不合法');
			}
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
//获取所有的报修记录
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var searchs = req.body.searchs;
			var pageSize = req.body.pageSize;
			var pageStart = req.body.pageSize * (req.body.currentPage - 1);
			if(typeof(searchs.applicant) == 'undefined'){
				searchs.applicant = '';
			}
			if(typeof(searchs.repairProcess) == 'undefined'){
				searchs.repairProcess = '';
			}
			if(typeof(searchs.repairType) == 'undefined'){
				searchs.repairType = '';
			}
			//分页查询需要的数据
			var sql = 'select * from repair WHERE ' +
									'repairProcess =(CASE WHEN ' + String(searchs.repairProcess).length + '=0 THEN repairProcess ELSE "' + searchs.repairProcess + '" END) ' +
									'AND repairType =(CASE WHEN ' + String(searchs.repairType).length + '=0 THEN repairType ELSE "' + searchs.repairType + '" END) ' +
								'order by cast(applicantTime as datetime) desc ' +
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
						var sql2 = 'select count(repairId) total from (select repairId,accountId from repair) a';
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
//删除报修记录
}).delete(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var sql = 'DELETE FROM repair WHERE repairId="' + req.query.repairId + '"';
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

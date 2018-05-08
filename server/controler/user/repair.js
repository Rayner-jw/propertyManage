var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//申请报修
api.route('/repairApi').put(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var accountId = req.body.uid,
					repairType = req.body.repairType,
			 		repairContent = req.body.repairContent,
					applicantPhone = req.body.applicantPhone,
					applicantTime = req.body.applicantTime;
			var applicantAddress = null;
			var insertsql = function (){
				var sql = 'INSERT INTO repair(repairType, repairContent, applicantPhone, applicantAddress, applicantTime, accountId) VALUES ("' + repairType + '","' + repairContent + '","' + applicantPhone + '","' + applicantAddress + '","' + applicantTime + '","' + accountId + '")';
				connection.query(sql, function (error, results, fields) {
					connection.release();
					if (error){
						console.log(error);
						res.status(500).send(error);
					} else {
						console.log(results);
						if(results.affectedRows == 1){
							res.status(200).send({msg:'报修申请成功',url:'/user/repairProcess',id: accountId});
						}
					}
				});
			}
			//没有地址 ，自家类型，则先查询出账号人所在地址
			if(typeof(req.body.applicantAddress) == 'undefined'){
				var sql1 = 'SELECT a.* FROM houseinfo a,userinfo b WHERE a.id=b.houseId AND b.id="' + accountId + '"';
				connection.query(sql1, function (error, results, fields) {
					if (error){
						connection.release();
						console.log(error);
						res.status(500).send(error);
					} else {
						applicantAddress = results[0].buildingName + ' ' + results[0].houseLayer + '-' + results[0].houseNumber;
						insertsql();
					}
				});
			//有地址
			}else {
				applicantAddress = req.body.applicantAddress;
				insertsql();
			}
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
			var accountId = req.body.uid;
			var pageSize = req.body.pageSize;
			var pageStart = req.body.pageSize * (req.body.currentPage - 1);
			//分页查询需要的数据
			var sql = 'select * from repair where accountId="' + accountId + '" ' +
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
						var sql2 = 'select count(repairId) total from (select repairId,accountId from repair where accountId="' + accountId + '") a';
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

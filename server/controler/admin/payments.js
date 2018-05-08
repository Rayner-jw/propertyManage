var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//发起管理费
api.route('/paymentApi').put(function(req, res, next){
	pool.getConnection(function(err, connection) {
		if(err){console.log('连接池连接错误');}
		var theYear = req.body.theYear,
				costPerSquare = req.body.costPerSquare,
				createAt = req.body.createAt;
		var sql = 'INSERT INTO launchManageFee(theYear, costPerSquare, createAt) SELECT ' +
							'"' + theYear + '","' + costPerSquare + '","' + createAt + '" ' +
							'FROM DUAL WHERE NOT EXISTS(SELECT theYear FROM launchManageFee WHERE theYear = "' + theYear + ' "limit 1)';
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error){
				console.log(error);
				res.status(500).send(error);
			} else {
				if(results.affectedRows == 0){
					res.send({msg:'发起失败，该年度管理费已存在',type:'error'});
				}else{
					res.send({msg:'发起成功'});
				}
			}
		});
	});
	pool.on('error', function(err) {
		console.log("[mysql error]",err);
	});
//发起管理费记录
}).get(function(req, res, next){
	pool.getConnection(function(err, connection) {
		if(err){console.log('连接池连接错误');}
		var sql = 'SELECT * FROM launchManageFee';
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error){
				console.log(error);
				res.status(500).send(error);
			} else {
				res.send({results:results});
			}
		});
	});
	pool.on('error', function(err) {
		console.log("[mysql error]",err);
	});
// 缴费情况
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var searchs = req.body.searchs;
			var pageSize = req.body.pageSize;
			var pageStart = req.body.pageSize * (req.body.currentPage - 1);
			if(typeof(searchs.status) == 'undefined'){
				searchs.status = '';
			}
			//查询该年度是否有管理费
			var sql = 'SELECT costPerSquare FROM launchManageFee WHERE theYear="' + searchs.theYear + '"';
			connection.query(sql, function (error, results, fields) {
				if (error){
					connection.release();
					console.log(error);
					res.status(500).send(error);
				} else {
					if(results.length == 0){
						connection.release();
						res.send({results:results,msg:'该年度暂无管理费'});
					}else{
						//查询管理费情况
						var sql2 =	'SELECT * FROM ' +
													'(SELECT a.id,buildingName,houseLayer,houseNumber,square,1 as status FROM ( ' +
														'SELECT id,houseId from userinfo WHERE id in ' +
															'(SELECT a.accountId FROM feebills a LEFT JOIN launchmanagefee b on a.launchFeeId=b.launchFeeId ' +
															'WHERE b.theYear="' + searchs.theYear + '") ' +
													') a LEFT JOIN houseinfo b ON a.houseId=b.id ' +
													'UNION ' +
													'SELECT a.id,buildingName,houseLayer,houseNumber,square,0 as status FROM ( ' +
														'SELECT id,houseId from userinfo WHERE id not in ' +
															'(SELECT a.accountId FROM feebills a LEFT JOIN launchmanagefee b on a.launchFeeId=b.launchFeeId ' +
															'WHERE b.theYear="' + searchs.theYear + '") AND houseId is not null' +
													') a LEFT JOIN houseinfo b ON a.houseId=b.id) c ' +
											'WHERE c.status =(CASE WHEN ' + String(searchs.status).length + '=0 THEN c.status ELSE "' + searchs.status + '" END) ' +
											'limit ' + pageStart + ',' + pageSize;
						connection.query(sql2, function (error2, results2, fields2) {
							if (error2){
								connection.release();
								console.log(error2);
								res.status(500).send(error2);
							} else {
								connection.query('SELECT count(*) total FROM userinfo where houseId is not null', function (error3, results3, fields3) {
									connection.release();
									if (error2){
										console.log(error3);
										res.status(500).send(error3);
									} else {
										res.send({total:results3[0].total,results:results2,costPerSquare:results[0].costPerSquare});
									}
								});
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

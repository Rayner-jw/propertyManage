var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//用户数据
api.route('/profilesApi').post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var searchs = req.body.searchs;
			var pageSize = req.body.pageSize;
			var pageStart = req.body.pageSize * (req.body.currentPage - 1);
			if(typeof(searchs.userName) == 'undefined'){
				searchs.userName = '';
			}
			if(typeof(searchs.userStatus) == 'undefined'){
				searchs.userStatus = '';
			}
			//分页查询需要的数据
			var sql = 'SELECT a.*,b.buildingName,b.houseLayer,b.houseNumber FROM userinfo a LEFT JOIN houseinfo b on a.houseId=b.id WHERE ' +
									'userName=(CASE WHEN ' + String(searchs.userName).length + '=0 THEN userName ELSE "' + searchs.userName + '" END) ' +
									'AND userStatus=(CASE WHEN ' + String(searchs.userStatus).length + '=0 THEN userStatus ELSE "' + searchs.userStatus + '" END) ' +
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
						var sql2 = 'select count(id) total from userInfo';
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
//审核通过
}).put(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var uid = req.body.uid,
					checkInTime = req.body.check_in_time,
					buildingName = req.body.buildingName,
					houseLayer = req.body.houseLayer,
					houseNumber = req.body.houseNumber;
			var sql = 'UPDATE userinfo SET userStatus=3,check_in_time="' + checkInTime + '",houseId='+
								'(SELECT id FROM houseinfo WHERE buildingName="' + buildingName + '" AND houseLayer="' + houseLayer + '" AND houseNumber="' + houseNumber + '" limit 1) ' +
								'WHERE id="' + uid + '"';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					if(results.affectedRows == 0){
						res.status(500).send({msg:'审核失败,该楼房已有住户',results:results});
					}
					res.send({msg:'审核成功'});
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
//审核不通过
}).get(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var uid = req.query.uid;
			var sql = 'UPDATE userInfo SET userStatus=0 WHERE id="' + uid + '"';
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
//删除用户
}).delete(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var uid = req.query.uid;
			var sql = 'DELETE FROM userInfo WHERE id="' + uid + '"';
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
})

module.exports = api;

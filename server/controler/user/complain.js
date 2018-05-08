var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//发起投诉
api.route('/complain').put(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var accountId = req.body.uid,
					complainType = req.body.complainType,
			 		complainContent = req.body.complainContent,
					complainBy = req.body.complainBy,
					complainTime = req.body.complainTime;
			var sql = 'INSERT INTO complain(complainType, complainContent, complainBy, complainTime, accountId) VALUES ("' + complainType + '","' + complainContent + '","' + complainBy + '","' + complainTime + '","' + accountId + '")';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					// if(error.code == "ER_DUP_ENTRY"){
					// 	res.status(500).send({msg:'您已经提交填写内容,如需修改请前往个人中心'});
					// }
					res.status(500).send(error);
				} else {
					console.log(results);
					if(results.affectedRows == 1){
						res.status(200).send({msg:'已成功发起一条投诉',url:'/user/complainLog',id: accountId});
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
			var accountId = req.body.uid;
			var pageSize = req.body.pageSize;
			var pageStart = req.body.pageSize * (req.body.currentPage - 1);
			//分页查询需要的数据
			var sql = 'select * from complain where accountId="' + accountId + '" ' +
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
						var sql2 = 'select count(complainId) total from (select complainId,accountId from complain where accountId="' + accountId + '") a';
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
})

module.exports = api;

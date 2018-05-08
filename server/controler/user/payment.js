var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');

api.route('/payment').get(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var accountId = req.query.accountId;
			//分页查询需要的数据
			var sql = 'select * from ' +
									'(SELECT b.*,a.square,1 as status FROM ' +
										'(SELECT square FROM houseInfo WHERE id=(SELECT houseId FROM userinfo WHERE id="' + accountId + '" LIMIT 1)) as a,' +
										'(SELECT * FROM launchmanagefee WHERE launchFeeId in (select launchFeeId from feebills WHERE accountId="' + accountId + '")) as b ' +
									'UNION ' +
									'SELECT b.*,a.square,0 as status FROM ' +
										'(SELECT square FROM houseInfo WHERE id=(SELECT houseId FROM userinfo WHERE id="' + accountId + '" LIMIT 1)) as a,' +
										'(SELECT * FROM launchmanagefee WHERE launchFeeId not in (select launchFeeId from feebills WHERE accountId="' + accountId + '")) as b) c ' +
								'order by cast(c.createAt as datetime) desc limit 0,5';
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
//
}).post(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var accountId = req.query.accountId;
			var sql = 'select * from ' +
									'(SELECT b.*,a.square,1 as status FROM ' +
										'(SELECT square FROM houseInfo WHERE id=(SELECT houseId FROM userinfo WHERE id="' + accountId + '" LIMIT 1)) as a,' +
										'(SELECT * FROM launchmanagefee WHERE launchFeeId in (select launchFeeId from feebills WHERE accountId="' + accountId + '")) as b ' +
									'UNION ' +
									'SELECT b.*,a.square,0 as status FROM ' +
										'(SELECT square FROM houseInfo WHERE id=(SELECT houseId FROM userinfo WHERE id="' + accountId + '" LIMIT 1)) as a,' +
										'(SELECT * FROM launchmanagefee WHERE launchFeeId not in (select launchFeeId from feebills WHERE accountId="' + accountId + '")) as b) c ' +
								'order by cast(c.createAt as datetime) desc';
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
//
}).put(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var accountId = req.body.accountId,
					launchFeeId = req.body.launchFeeId,
					totalFee = req.body.totalFee,
					payTime = req.body.payTime;
			var sql = 'INSERT INTO feebills(launchFeeId,accountId,totalFee,payTime) VALUE("' + launchFeeId + '","' + accountId + '","' + totalFee + '","' + payTime + '")';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					res.send({msg:'缴费成功'});
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});
module.exports = api;

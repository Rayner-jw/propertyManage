var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//登录
api.get(/\/notify\/(message|notify)/, function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			if(req.url.search('/notify/message') == 0){
				var sql = 'SELECT a.complain,b.message from ' +
										'(SELECT count(a.status) complain FROM complain a WHERE a.status=0) a,' +
										'(SELECT count(b.isread) message FROM message b WHERE  b.isread=0) b';
			}else if(req.url.search('/notify/notify') == 0){
				var sql = 'SELECT a.repair,b.userinfo from ' +
										'(SELECT count(a.repairProcess) repair FROM repair a WHERE a.repairProcess=0) a,' +
										'(SELECT count(b.userStatus) userinfo FROM userinfo b WHERE b.userStatus=2) b';
			}
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					var json = {results:results,account:req.session.account};
					res.send(json);
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});
module.exports = api;

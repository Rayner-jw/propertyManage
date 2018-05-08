var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');
//登录
api.get(/\/notify\/(message|notify)/, function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var uid = req.query.uid;
			if(req.url.search('/notify/message') == 0){
				var sql = 'select * from message WHERE sendTo="' + uid +'" AND isread =0 ' +
									'order by cast(createAt as datetime) desc';
			}else if(req.url.search('/notify/notify') == 0){
				var sql = 'SELECT a.* FROM annocement a WHERE annocementId not in ' +
										'(SELECT annocementId FROM readAnnocement WHERE accountId="' + uid + '") ' +
										'order by cast(a.createAt as datetime) desc';
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

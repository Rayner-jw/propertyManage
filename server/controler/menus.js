var express = require('express');
var api = express.Router();
var pool = require('../conf/db.connect.js');
//申请报修
api.get('/menus',function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var sql = 'SELECT * FROM (select * from menu join menuChild ON menu.menuId = menuChild.belongTo) As a where a.role =(SELECT role FROM register where id ="' + req.query.uid + '" LIMIT 1)';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					var arr = [];
					for(var i=0;i<results.length;i++){
						var isHave = false;
						arr.forEach(function(item){
							if(item.menuId == results[i].menuId){
								isHave = true;
								item.childs.push({
									name : results[i].name,
									url : results[i].url
								})
							}
						})
						if(!isHave){
							arr.push({
								menuId : results[i].menuId,
								menuName : results[i].menuName,
								icon : results[i].icon,
								childs : [{
										name : results[i].name,
										url : results[i].url,
								}]
							})
						}
					}
					res.send(arr);
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
});

module.exports = api;

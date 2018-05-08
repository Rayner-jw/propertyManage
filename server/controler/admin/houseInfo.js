var express = require('express');
var api = express.Router();
var pool = require('../../conf/db.connect.js');

//数组去重
Array.prototype.uniq = function(){
    var temp = [];
    if(!this.length){
         return [];
    }
    for(var i=0,len = this.length;i<len;i++){
     if(temp.indexOf(this[i])<0){
          temp.push(this[i]);
      }   
    }
    return temp;
}
//楼房数据数据
api.route('/houseInfoApi').get(function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if(err){console.log('连接池连接错误');}
			var sql = 'SELECT buildingName,houseLayer,houseNumber FROM houseinfo GROUP BY buildingName,houseLayer,houseNumber';
			connection.query(sql, function (error, results, fields) {
				connection.release();
				if (error){
					console.log(error);
					res.status(500).send(error);
				} else {
					var buildingNames = [],
							houseLayers = [],
							houseNumbers = [];
					for(var i = 0; i < results.length; i++){
						buildingNames.push(JSON.stringify({label:results[i].buildingName,value:results[i].buildingName}));
						houseLayers.push(JSON.stringify({label:results[i].houseLayer,value:results[i].houseLayer}));
						houseNumbers.push(JSON.stringify({label:results[i].houseNumber,value:results[i].houseNumber}));
					}
					var obj={
						houseNumbers:houseNumbers
					}
					buildingNames = buildingNames.uniq().map(function(item){
						return JSON.parse(item);
					});
					houseLayers = houseLayers.uniq().map(function(item){
						return JSON.parse(item);
					});
					houseNumbers = houseNumbers.uniq().map(function(item){
						return JSON.parse(item);
					});
					res.send({buildingNames:buildingNames,houseLayers:houseLayers,houseNumbers:houseNumbers});
				}
			});
		});
		pool.on('error', function(err) {
		  console.log("[mysql error]",err);
		});
})

module.exports = api;

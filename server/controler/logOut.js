var express = require('express');
var api = express.Router();

//退出
api.post('/logOut', function(req, res, next) {
		req.session.account = null;
		res.send({url:'/admin/login'})
});
module.exports = api;

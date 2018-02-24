var express = require('express');
var router = express.Router();


router.post('/login', function(req, res, next) {
		
		res.send({
			url:'/home'
		})
	  console.log(req.body)
	  console.log("users")
});
module.exports = router;

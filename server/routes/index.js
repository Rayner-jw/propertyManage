var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("22")
  res.sendfile('./views/index.html');
});

router.get('/home', function(req, res, next) {
  res.sendfile('./views/home.html');
});
module.exports = router;

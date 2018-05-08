var express = require('express');
var router = express.Router();
//登录权限验证过滤
var dologn = require('../routes/filter.js');
/* GET home page. */
//登录
router.get('/', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/index.html');
});
router.get('/login', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/index.html');
});
/* admin. */
router.get('/home', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/profiles.html');
});
router.get('/profiles', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/profiles.html');
});
router.get('/setting', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/setting.html');
});
router.get('/annocement', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/annocement.html');
});
router.get('/annocementLogs', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/annocementLogs.html');
});
router.get('/sentMsgs', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/sentMsgs.html');
});
router.get('/receiveMsgs', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/receiveMsgs.html');
});
router.get('/launchPay', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/launchPay.html');
});
router.get('/payment', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/payment.html');
});
router.get('/complainLogs', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/complainLogs.html');
});
router.get('/repairLogs', dologn.adminfilter, function(req, res, next) {
  res.sendfile('./views/repairLogs.html');
});

module.exports = router;

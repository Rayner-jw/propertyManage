var express = require('express');
var router = express.Router();
//登录权限验证过滤
var dologn = require('../routes/filter.js');
/* GET home page. */
//登录
router.get('/', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/index.html');
});
router.get('/login', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/index.html');
});
//首页
router.get('/home', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/home.html');
});
router.get('/forgotPwd', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/forgotPwd.html');
});
router.get('/register', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/register.html');
});
router.get('/basic', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/basic.html');
});
router.get('/basicInfo', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/basicInfo.html');
});
router.get('/basicChecking', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/basicChecking.html');
});
router.get('/setting', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/setting.html');
});
router.get('/houseInfo', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/houseInfo.html');
});
router.get('/manageFees', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/manageFees.html');
});
router.get('/repair', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/repair.html');
});
router.get('/repairProcess', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/repairProcess.html');
});
router.get('/repairLog', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/repairLog.html');
});
router.get('/message', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/message.html');
});
router.get('/sentMsg', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/sentMsg.html');
});
router.get('/receiveMsg', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/receiveMsg.html');
});
router.get('/annocementLog', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/annocementLog.html');
});
router.get('/complain', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/complain.html');
});
router.get('/complainLog', dologn.userfilter, function(req, res, next) {
  res.sendfile('./views/complainLog.html');
});
module.exports = router;

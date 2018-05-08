var express = require('express');
var api = express.Router();
var svgCaptcha = require('svg-captcha');

api.route('/getVerCode').get(function(req, res, next){
  var codeConfig = {
      size: 4,// 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 3, // 干扰线条的数量
      height: 35,
      with: 150
  }
  var captcha = svgCaptcha.create(codeConfig);
  req.session.getVerCode = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
  var codeData = {
      img:captcha.data
  }
  res.send(codeData);
}).post(function(req, res, next){
  if(req.session.getVerCode == req.body.verCode.toLowerCase()){
    res.end();
  }else{
    res.status(401).end();
  }
})

module.exports = api;

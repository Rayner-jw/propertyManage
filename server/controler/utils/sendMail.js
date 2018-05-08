var express = require('express');
var api = express.Router();
var nodemailer = require('nodemailer');
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.126.com',
  port: 25,
  auth: {
    user: 'junweivv@126.com', //刚才注册的邮箱账号
    pass: 'dqmjwl3090142' //邮箱的授权码，不是注册时的密码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 发送邮件
var sendMail = function (email){
  //四位随机码
  var random = Math.floor(Math.random()*9000)+1000;
  // 创建一个邮件对象
  var mail = {
    from: 'JW物业 <junweivv@126.com>',
    subject: 'JW propertySys',
    to: email,
    text: '您本次的验证码为：' + random + '，请在五分钟内完成，超过时间验证码失效'
  };
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mail, function(error, info){
      if(error) {
        reject(error);
      }
      console.log('mail sent:');
      resolve(random.toString());
    });
  });
}
api.route('/mailCode').post(function(req, res, next){
  sendMail(req.body.email).then(function (value) {
    req.session.getMailCode = value;
    res.end();
  }).catch(function (error) {
      console.log(error);
      res.status(401).end();
  });
}).get(function(req, res, next){
  if( String(req.session.getMailCode) == String(req.query.mailCode)){
    res.end();
  }else{
    res.status(401).end();
  }
})

module.exports = api;

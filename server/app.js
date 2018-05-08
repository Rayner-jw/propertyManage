var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

//路由
var index = require('./routes/index');
var admin = require('./routes/admin');
//配置api
var login = require('./controler/login');
var logOut = require('./controler/logOut');
var lookfor = require('./controler/lookfor');
var menus = require('./controler/menus');
//验证码
var getVerCode = require('./controler/utils/getVerCode');
var sendMail = require('./controler/utils/sendMail');
//user
var register = require('./controler/user/register');
var userBasic = require('./controler/user/userBasic');
var userBasicInfo = require('./controler/user/userBasicInfo');
var annocement = require('./controler/user/annocement');
var repair = require('./controler/user/repair');
var complain = require('./controler/user/complain');
var message = require('./controler/user/message');
var payment = require('./controler/user/payment');
var notify = require('./controler/user/notify');
//admin
var profiles = require('./controler/admin/profiles');
var complains = require('./controler/admin/complains');
var repairs = require('./controler/admin/repairs');
var annocements = require('./controler/admin/annocements');
var messages = require('./controler/admin/messages');
var payments = require('./controler/admin/payments');
var houseInfo = require('./controler/admin/houseInfo');
var notifies = require('./controler/admin/notifies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine("html",require("jade").renderFile);
app.set('view engine', 'html');

//跨域请求
app.all('*', (req, res, next) => {
  const origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret : 'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 60 * 24, // 设置 session 的有效时间，单位毫秒
    },
}));

//管理静态文件目录
app.use('/static' , express.static(path.join(__dirname, 'static')));

//配置路由
app.use('/user', index);
app.use('/admin', admin);

//配置api
app.use('/', login);
app.use('/', logOut);
app.use('/', lookfor);
app.use('/', menus);
//utils
app.use('/', getVerCode);
app.use('/', sendMail);
//user
app.use('/user', register);
app.use('/user', userBasic);
app.use('/user', userBasicInfo);
app.use('/user', annocement);
app.use('/user', repair);
app.use('/user', complain);
app.use('/user', message);
app.use('/user', payment);
app.use('/user', notify);
//admin
app.use('/admin', profiles);
app.use('/admin', complains);
app.use('/admin', repairs);
app.use('/admin', annocements);
app.use('/admin', messages);
app.use('/admin', payments);
app.use('/admin', houseInfo);
app.use('/admin', notifies);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send(err)
  //res.render('error');
});

module.exports = app;

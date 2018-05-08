var userfilter = function(req, res, next){
    if (!req.session.account) {
        if ( req.url.search(/^\/(login|register|forgotPwd)$/) == 0 ) {
          return next(); //如果请求的地址是登录则通过，进行下一个请求
        } else {
            res.redirect('/user/login');//跳转到登录页面
        }
    } else if (req.session.account && req.session.role == 1) {
      if(req.session.userStatus == 1){//未提交资料
        req.url != "/basic" && res.redirect('/user/basic');
        return next();
      }else if(req.session.userStatus == 3){//通过
        req.url.search(/^\/(login|register|basic|basicChecking)$/) == 0 && res.redirect('/user/home');
        return next();
      }else{//不通过，审核中
        req.url != "/basicChecking" && res.redirect('/user/basicChecking');
        return next();
      }
    }else{
      res.send(404);
    }
}
var adminfilter = function(req, res, next){
    if (!req.session.account) {
        if (req.url == "/login" || req.url == "/") {
          return next(); //如果请求的地址是登录则通过，进行下一个请求
        } else {
            res.redirect('/admin/login');//跳转到登录页面
        }
    } else if (req.session.account && req.session.role == 0) {
      //登录未失效，进入首页
      console.log('-----------'+req.url);
      if (req.url == "/login" || req.url == "/") {
          res.redirect('/admin/home');
      }
      return next();
    }else{
      res.send(404);
    }
}
module.exports = {userfilter,adminfilter};

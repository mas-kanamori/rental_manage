
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// ログの設定
var log4js = require('log4js');
log4js.configure('./conf/log4js_setting.json', { reloadSecs: 300 });
var logger = log4js.getLogger();

// all environments
app.configure(function(){
              app.set('port', process.env.PORT || 3000);
              app.set('views', path.join(__dirname, 'views'));
              app.set('view engine', 'ejs');
              
              // セッションはとりあえず無効
              //app.use(express.cookieParser("hogehoge"));
              //app.use(express.session());
              
              app.use(express.favicon());
              app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));
              //   app.use(express.logger('dev'));
              app.use(express.bodyParser());
              app.use(app.router);
              app.use(express.json());
              app.use(express.urlencoded());
              app.use(express.methodOverride());
              app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}




//***************************************
//********* ルート情報 ******************
//***************************************

// ログイン画面
app.get('/login', routes.login);
app.post('/login', routes.login_post);


// TOP検索画面
//app.get('/top', routes.top);
app.get('/top', routes.top_post);
app.post('/top', routes.top_post);

// カート画面
//app.get('/cart', routes.cart_get);


//***************************************
//********* ルート情報 ******************
//***************************************

// Expressのappsオブジェクトを引数にhttp.Serverクラスのインスタンスを作成
var server = http.createServer(app);

// node.jsサーバーの起動
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var socketApp = require("./socket/socketApp");
// socket.IOサーバーの起動
socketApp.receiveMassages(server,function(){
  console.log('Socket.IO server listening on port ' + app.get('port'));
});


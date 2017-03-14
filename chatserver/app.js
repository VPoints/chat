var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

let port = process.env.PORT || '3000';
app.set('port', port);
let socketIo = require('socket.io');
let http = require('http').createServer(app);
let io = socketIo(http);

//  var sessionMiddleware = session({
// 			secret : 'VVG',
// 		// 一个小时后过期
// 			cookie:{maxAge:60*60*1000}
// 		 });
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(sessionMiddleware);
// io.use(function(socket, next) {
//     sessionMiddleware(socket.request, socket.request.res, next);
// });


let gochat = require('./chat/chats').init(io);

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	next()
})
app.use(function(req,res){
	res.sendfile(__dirname+'/public/index.html');
})

http.listen(app.get('port'),function(){
	console.log('this port : ' + app.get('port'))
})


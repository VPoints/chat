var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.use(function(req,res,next){
//	console.log('聊天室共有:' + io.sockets)
	next();
})
app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});
app.get('/test', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});
var mack = require('./socket/mack')(io)

http.listen(8080, function(){
	console.log('listening on *:8080');
});
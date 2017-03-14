
var users = require('../../db/dbchat').users,
	rooms = require('../../db/dbchat').rooms;

function msg (io,socket) {
	socket.on('msg',(obj)=>{
		let name = socket.name;
		let roomid = socket.roomid;
		obj.name = name; 
		rooms.up(roomid,obj).then(l=>{
			obj.type = 'me' 
			socket.emit('msg',obj);
			obj.type = 'users' 
			socket.broadcast.to(roomid).emit('msg', obj);
		})
	})
}
module.exports = msg 

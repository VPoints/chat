
let users = require('../../db/dbchat').users,
	rooms = require('../../db/dbchat').rooms;
function join(io,socket){
	socket.on('join',function(obj){
		let name = socket.name; 
		let msg = {
			name : name, 
			type : 'sys',  
			msg : name + '离开了房间', 
			Head : '',  
			time : ''  
		}
		users.query(name).then(l=>{
			let _roomidOld = l.roomid ; 
			let _roomid = obj.roomid ;  
			rooms.query(_roomid).then(r=>{
				l.roomid = _roomid ;
				users.save(l).then((result)=>{
					var arr = [],s = r.data.content.length;i=0;
					for(i;i!=s;i++){
						arr.push(r.data.content[i]);
						if(arr[i].name == name) arr[i].type = 'me';
					}
					if(_roomidOld!=_roomid){
						socket.broadcast.to(_roomidOld).emit('leave', msg);
						socket.leave(_roomidOld);
					}
					socket.roomid = _roomid
					socket.emit('join', arr);
					msg.msg =  name + '加入了房间'
					socket.join(_roomid)
					io.to(_roomid).emit('msg', msg); 
					socket.roomid = obj.roomid ;
					console.log(name + '加入了房间：' + _roomid);
				})
			})
		})
	})
}
module.exports = join
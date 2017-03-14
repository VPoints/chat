
let users = require('../../db/dbchat').users;
let rooms = require('../../db/dbchat').rooms;
let jwt = require('../../jwt/jwt.config');
function login(socket){
	socket.on('login',function(data){
		console.log('data = '+data.token)
		let obj = jwt.verify(data.token),
			name = obj.data,
			msg = obj.msg;
		if(msg){
			users.query(name).then(l=>{
				if(l==null){
					socket.emit('login',{
						msg:'err'
					})
				}else if(l.online==false){
					l.online = true;
					users.save(l).then(()=>{
						socket.roomid = l.roomid;
						socket.name = l.name;
						socket.emit('login',{
							name : l.name,
							head : l.head,
							nickname : l.nickname,
							roomid : l.roomid,
							saysay : l.saysay,
							age : l.age,
							addRoom : l.addRoom
						}) 
					})
				}else{
					socket.emit('login',{
						msg: '200',
						content : '用户已经在其他地方登录'
					})
				}
			})
		}else{
			socket.emit('login',{
				msg:'err',
				content:'登录信息错误'
			})
		}
	});
}
module.exports = login
function cloneObj(oldObj) { //复制对象方法
	if (Object.prototype.toString.call(oldObj) != '[object Object]') return oldObj; // 如果不是对象就返回
		var newObj = new Object(); // 新对象
		for (var i in oldObj){
			newObj[i] = cloneObj(oldObj[i]);
		}
	return newObj;
};
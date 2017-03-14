
let dbConnect = require('../../db/users')('users'),
	jwt = require('../../jwt/jwt.config');
function register(socket){
	socket.on('register',(obj)=>{
		var msg = {	msg :200,content : ''}
		if(obj&&obj.name&&obj.nickname&&obj.password){
			let time = new Date();
			let name = obj.name,
				nickname = obj.nickname,
				password = obj.password;
			let Schema = {
					_id : name , 
					name : name,
					password : password ,
					nickname : nickname || 'robot' , 
					time : time.getFullYear()+"年 " + (time.getMonth()+1)+"月 " +time.getDay()+'日',
				}
			let mongos = new dbConnect(Schema);
			dbConnect.findById(name,function(err,result){
				if(result==null){
					mongos.save((err)=>{
						if(err){
							console.log('err'+err)
						}else{
							msg.content = '用户注册成功'
							socket.emit('register',msg)
						}
					})
				}else{
					msg.msg = 'err'
					msg.content = '用户已存在';
					socket.emit('register',msg)
				}
			})
		}
	})
}
function singUp(socket){
	socket.on('signUp',(obj)=>{
		let msg = {msg :200,content : ''}
		let name = obj.name,
			password = obj.password;
		let obj = {	name : name ,password : password }
		dbConnect.findById( name ,function(err,result){
			if(result == null){
				msg.msg = 'err';
				msg.content = '该用户不存在，请注册';
				socket.emit('signUp',msg)
			}else if( result.password != password){
				msg.msg = 'err';
				msg.content = '帐号或者密码错误';
				socket.emit('signUp',msg)
			}else if(result.online==true){
				msg.msg = 'err';
				msg.content = '该用户已再其他地方登录';
				socket.emit('signUp',msg)
			}else{
				msg.content = '用户已成功登录';
				msg.token = jwt.creat(name);
				socket.emit('signUp',msg)
			}
		})
	})
}
module.exports = (socket)=>{
	singUp(socket)
	register(socket)
}

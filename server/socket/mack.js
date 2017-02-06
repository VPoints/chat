
//在线用户
//每个人所在的房间列表 {人名 ： 房间号}  便于通过人名称找寻所在房号
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;
//home 是房间集合 sum是代表的房间总数 home中的属性==》num ：人数  其他的是 ｛人名称:发言？｝
var onlineHome = {
	sum:0,
	home:{
		
	}
}

function test(io){
	io.on('connection', function(socket){
		// 这个是 socket 请求地址的页面连接  可以用于房间区别  在我这里不通过这种方法
		var url = socket.request.headers.referer;
		console.log(url)
	console.log('a user connected');
	//监听新用户加入
	socket.on('login', function(obj){
		console.log(obj);
		//将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
		socket.name = obj.username;
		socket.home = obj.userhome;
		var texts = '',msg = '';
		
		// 对房间广播的代码部分：房间对话
		socket.on(obj.userhome,function(objs){
			io.emit(socket.home,objs);
			console.log(socket.home + " : 房间搞出事情了")
		})
		
		
		//检查在线列表，如果不在里面就加入
		if(!onlineUsers.hasOwnProperty(obj.username)) {
			onlineUsers[obj.username] = obj.userhome;
			//在线人数+1
			onlineCount++;
		}
		//检测房间状态,如果找不到这个房间
		if(!onlineHome.home[obj.userhome]){
			onlineHome.sum++;
			//初始化房间人数
			onlineHome.home[obj.userhome] = {num:1};
			onlineHome.home[obj.userhome][obj.username] = 0;
			msg=200;
		//检测房间人员是否重复
		}else if(!onlineHome.home[obj.userhome][obj.username]){
			//房间人数增加
			onlineHome.home[obj.userhome].num ++ ;
			onlineHome.home[obj.userhome][obj.username] = 0;
			msg=200;
		}else{
			msg = '该用户名已被注册'
		}
		console.log('msg : '+msg)
		//向所有客户端广播用户加入
//		io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj,home:onlineHome,texts:texts});
		io.emit('login', {home:onlineHome.home,msg:msg})
		console.log(obj.username+'加入了聊天室');
//		console.log('当前有 : ' + onlineHome.sum + '个聊天室');
		console.log('在线总人数为 ： ' + onlineCount);
	});
	
	//监听用户退出
	socket.on('disconnect', function(){
		//将退出的用户从在线列表中删除
		console.log(onlineUsers)
		if(onlineUsers.hasOwnProperty(socket.name)) {
			//退出用户的信息
			var obj = {userhome:socket.home, username:socket.name};
			//删除
			delete onlineUsers[socket.name];
			//在线人数-1
			onlineCount--;
			//判断：如果房间的人不足就会删除整个房间
			if(Object.keys(onlineHome.home[socket.home]).length<3){
				delete onlineHome.home[socket.home]
				onlineHome.sum--;
			}else{
				//删除房间中的该人
				delete onlineHome.home[socket.home][socket.name];
				onlineHome.home[socket.home].num--
			}
			//向所有客户端广播用户退出
			io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
			console.log(onlineHome)
			console.log(obj.username+'退出了'+ obj.userhome +'聊天室');
		}
	});
	
	//监听用户发布聊天内容
	socket.on('message', function(obj){
		//向所有客户端广播发布的消息
		io.emit('message', obj);
		console.log(obj.username+'说：'+obj.content);
	});
});
}
module.exports = test

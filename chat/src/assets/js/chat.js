import io from 'socket.io-client'
var chats = {
	io:null,
	disconnect () {
		this.io.disconnect();
		return this
	},
	connect () {
		this.io = io('http://www.fetchs.cn',{'force new connection': true,'reconnect':true});
		this.init();
		return this
	},
	init:function(){
		this.io.on('connect', function() {
			console.log('用户已连接')
		});
		this.io.on('disconnect', function() {
			console.log('用户已断开')
		});
		return this
	},
	sign:{
		fn:function(){
			chats.io.on('register', (test)=>{
				if(test.msg == 200){
					this.toggle = 1;
				}else{
					alert(test.content)
				}
			})
			chats.io.on('signUp', (test)=>{
				if(test.msg == 200){
					localStorage['token'] = test.token
					window.location.hash='/home'
				}else{
					alert(test.content)
				}
			})
			return chats
		},
		btn:{
			register (obj) {
				chats.io.emit('register',obj)
			},
			signUp (obj) {
				chats.io.emit('signUp',obj)
			}
		}
	},
	chat:{
		fn:function(){
			chats.io.on('logout',(test)=>{
				window.localStorage['token'] = '';
				window.location.hash = '/';
				chats.io.disconnect()
			});
			chats.io.on('login',(test)=>{
				if(test.msg){
					if(test.msg =='200'){
						alert(test.content)
					}
					chats.io.emit('logout')
					return
				}
				this.user.name = test.name;
				this.homename = test.roomid ;
				this.homes.push({
					name:test.roomid
				})
				this.chat.chat.btn.join({
		          	name:test.name,
		          	roomid:test.roomid
		        });
			});
			chats.io.on('leave',(test)=>{
				this.msg.push(test)
				this.$nextTick(scroll)
			});
			chats.io.on('msg',(test)=>{
				if(test.type){}else if(test.name == this.user.name){test.type = 'me'}else{test.type = 'users'}
				this.msg.push(test)
			});
			chats.io.on('join',(test)=>{
				this.msg = [];
				let i = 0,msg=test,l=test.length;
				for(i;i!=l;i++){
					if(msg[i].type){}else if(msg[i].name == this.user.name){msg[i].type = 'me'}else{msg[i].type = 'users'}
					this.msg.push(msg[i])
				}
			});
			return chats
		},
		btn : {
			login () {
				let token = window.localStorage.token;
				chats.io.emit('login',{token : token});
				return chats
			},
			join (obj) {
				chats.io.emit('join',obj);
				return chats
			},
			msg (msg) {
				chats.io.emit('msg',msg);
				return chats
			},
			logout () {
				chats.io.emit('logout')
			}
		}
	}
}

function scroll (bool) {
	var dom = document.getElementsByClassName('main').item(0)
	if(dom||dom==null) return
	var wh = dom.clientHeight;
	var h = dom.scrollHeight;
	var top = dom.scrollTop;
	var sh = h - wh;
	if(bool){
		dom.scrollTop = top;
	}else if(sh-top<200){
		dom.scrollTop = sh;
	}
}
export { chats }

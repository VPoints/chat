
var vm = new Vue({
	el : "#interfaces" ,
	data : {
		toggle : true,
		userName: '',
		userHome : '',
		socket:null
	},
	methods:{
		login:function(event){
			//连接websocket后端服务器
			vm.socket = io.connect('http://localhost:8080');
			//告诉服务器端有用户登录
			vm.socket.emit('login', {userhome:vm.$data.userHome, username:vm.$data.userName});
			vm.socket.on('login',function(obj){
				if(obj.msg == 200 ){
					vm.$data.toggle = false;
					vm.socket.emit(vm.$data.userHome, vm.$data.userName);
				}
				console.log(obj);
			});
			vm.socket.on('logout', function(obj){
				console.log(obj)
			});
			vm.socket.on(vm.$data.userHome,function(obj){
				console.log(obj)
			});
		},
		logout:function(event){
			vm.$data.toggle = true;
			//该处断开连接
			vm.socket.disconnect();
		}
	}
});
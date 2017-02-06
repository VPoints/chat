(function(w){
	w.VVG = {
		Socket : null,
		home : null,
		username : null,
		connect : "localhost:4000",
		//切换显示界面 
		interfaces : function(){
			var login = document.getElementsByClassName('login').item(0);
			var msg = document.getElementsByClassName('doc').item(0);
			if(login.style.display == "none" ){
				login.style.display = 'flex';
				msg.style.display = 'none';
				return this
			}
			login.style.display = 'none';
			msg.style.display = 'block';
			return this
		},
		isUserName:function(){
			var username = document.getElementsByName("username").item(0);
			var home = document.getElementsByName("userhome").item(0);
			this.home = home.value;
			this.username = username.value;
			username.value = '' ;
			home.value = '' ;
			document.getElementById('username').innerHTML = this.username;
			document.getElementById('userhome').innerHTML = this.home;
			return this
		},
		btn:function(){
			var login = document.getElementById('login');
			var logout = document.getElementById('logout');
			login.addEventListener('click',function(){
				this.isUserName();
				this.interfaces()
			}.bind(this));
			logout.addEventListener("click",function(){
				this.interfaces()
			}.bind(this));
			return this
		},
		
		init:function(){
			this.btn();
		}
		
	}
	VVG.init()
}(window))

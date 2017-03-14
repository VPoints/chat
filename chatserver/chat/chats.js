var chatRouter = require('./chatRouter/init')
const chat = {
	io : null ,
	init :function(io){
		this.io = io;
		this.on(this.io);
		return this
	},
	client:[],
	socket:null,
	on : function(io){
		io.on('connection',(socket)=>{
			chatRouter(io,socket)
		});
	}
}

module.exports=chat
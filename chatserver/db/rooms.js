let mongoose = require('mongoose');
let db = mongoose.createConnection('mongodb://127.0.0.1:27017/chat');
let time = new Date()
let monSchema = new mongoose.Schema({
	roomid:String,
	_id : String , 
	content:[]
});

module.exports = function(Collection){ 
	var monModel = db.model(Collection,monSchema);
	return monModel
}

let mongoose = require('mongoose');
let db = mongoose.createConnection('mongodb://127.0.0.1:27017/chat');
let time = new Date()
let monSchema = new mongoose.Schema({
	_id : String , 
    name:{type:String},
    password:{type:String},
	roomid : {type:Number,default:1},
    nickname:{type:String,default:'robot'},
    saysay:{type:String,default:'用户太懒，啥都不留'},
    age:{type:Number,default:18},
    head:{type:String,default:'http://www.fetchs.cn/images/kiana.jpg'},
    time:{type:String,default:time.getFullYear()+"年 " + (time.getMonth()+1)+"月 " +time.getDay()+'日'},
    online:{type:Boolean,default:false},
    addRoom:{}
});

module.exports = function(Collection){
	var monModel = db.model(Collection,monSchema);
	return monModel
}

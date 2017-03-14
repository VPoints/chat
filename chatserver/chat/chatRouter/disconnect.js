
var users = require('../../db/dbchat').users;
var rooms = require('../../db/dbchat').rooms;
function msg (io,socket) {
    socket.on('disconnect', function(){
        var name = socket.name;
        if(socket.name){
            delete socket.name;
            users.query(name).then(l=>{
                l.online = false;
                users.save(l).then(k=>{
                    console.log('用户已经安全退出')
                })
            });
        }
        console.log('断开连接')
    })
}
module.exports = msg 

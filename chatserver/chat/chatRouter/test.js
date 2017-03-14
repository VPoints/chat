
var users = require('../../db/dbchat').users;
var rooms = require('../../db/dbchat').rooms;

function msg (io,socket) {
    socket.on('test',function(obj){
        socket.emit('test',obj);
    });
}
module.exports = msg 

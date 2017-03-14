
function msg (io,socket) {
    socket.on('logout',function(obj){
        socket.emit('logout'); 
    });
}
module.exports = msg 

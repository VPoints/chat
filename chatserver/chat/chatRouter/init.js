let login = require('./login'),
    logout = require('./logout'),
    test = require('./test'),
    join = require('./join'),
    msg = require('./msg'),
    sign = require('./sign'),
    disconnect = require('./disconnect');
function init(io,socket){
    sign(socket);
    login(socket);
    join(io,socket);
    msg(io,socket);
    logout(io,socket);
    test(io,socket);
    disconnect(io,socket)
}
module.exports = init
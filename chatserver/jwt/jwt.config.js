let jwt = require('jwt-simple'),
    moment = require('moment'),
    jwtKey = 'vvg';

let createToken = function(id){
    let timeOut = moment().
                  add( 7 , 'days' ).
                  valueOf();
    let token = jwt.encode({
                    iss: id, 
                    exp: timeOut 
                },jwtKey);
    return token 
}
var tokenVerify = function(token){
    let msg = {
            msg : true,
            data : null
        }
    try{
    var code = jwt.decode( token , jwtKey );
        if( code.exp >= Date.now() ) {
            msg.data = code.iss;
            return msg
        }else{
            msg.msg = false;
            msg.data = 'token已过期' 
            return msg   
        }
    }
    catch(err){
        msg.msg = false;
        msg.data = 'err' ;
        return msg  
    }
}
module.exports = {
    creat : createToken , 
    verify : tokenVerify
}
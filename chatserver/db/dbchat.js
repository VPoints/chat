
var dbusers = require('../db/users')('users');
var dbrooms = require('../db/rooms')('rooms');

var rooms = {
	query (roomid) { 
		return new Promise((resolve,reject)=>{
			dbrooms.findById(roomid,function(err,result){
				if(err){
					reject(err)
				}else{
					if(result==null){
						resolve(rooms.add(roomid))
					}else{
						resolve({
							msg : 200,
							data : result
						})
					}
				}
			})
		})
	},
	add (roomid) {
		var newObj = new dbrooms({roomid:roomid,content:[],_id:roomid}) 
		return new Promise((resolve,reject)=>{
			newObj.save(function(err,result){
				if(err){
					reject(err)
				}else{
					resolve({
						msg : 'create' ,
						data : result
					})
				}
			})
		})
	},
	up (roomid,msgObj) {
		return new Promise((resolve,reject)=>{
			dbrooms.findById(roomid,function(err,result){
				if(err){
					reject(err)
				}else{
					if(result!=null){ 
						result.content.push(msgObj)
						result.save((err,test)=>{
							resolve({
								msg : 200,
								data : test
							})
						})
					}
				}
			})
		})
	},
	save (db) {
		return new Promise((resolve,reject)=>{
			db.save((err,result)=>{
				if(err){
					return reject(err)
				}
				resolve({
					msg : 200,
					data : result
				})
			})
		})
	}
}
var users = {
	query (name) {
		return new Promise((resolve,reject)=>{
			dbusers.findById(name,function(err,result){
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		})
	},
	up (name,newobj) {
		return new Promise((resolve,reject)=>{
			dbusers.findById(name,function(err,result){
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		})
	},
	online (name,online) {
		return new Promise((resolve,reject)=>{
			dbusers.findById(name,function(err,result){
				if(err){
					reject(err)
				}else{
					result.online = online || false
					result.save((err,test)=>{
						resolve({
							msg : 200,
							data : test
						})
					})
				}
			})
		})
	},
	save (db) {
		return new Promise((resolve,reject)=>{
			db.save((err,result)=>{
				if(err){
					return reject(err)
				}
				resolve({
					msg : 200,
					data : result
				})
			})
		})
	}
}
module.exports = {
	rooms:rooms,
	users:users
}

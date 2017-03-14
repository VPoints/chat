<template>
	<div class="chat-box">
	<div v-bind:class="['chat',{chatShow:menu}]" >
		<headers :homename="homename" :menu="menu" :showMenu='showMenu' :showNick="showNick"></headers>
		<mains :msg='msg'></mains>
		<div v-bind:class="['footer']">
			<div>
				<div class="iconBox">
					<i class="iconfont" v-on:click='showEmoji'>&#xe78a;</i>
				</div>
			</div>
			<div class="footerCent">
				<div class="inputs">
					<input type="text" @keyup.enter="submit"  v-model="txt" ref="input"/>
				</div>
			</div>
			<div>
				<div class="iconBox" v-on:click="submit" >
					<i class="iconfont" >&#xe650;</i>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div v-bind:class="'share'" v-show="menu" v-on:click="showMenu"></div>
		</transition>
	</div>
	 <transition name="fade">
		<brow v-show="emoji" v-on:click='showEmoji' :showEmoji='showEmoji'></brow>
 	 </transition>
	<menus :homes='homes' :user="user" :menu="menu" :homename='homename' :gohome='gohome' :showCreate='showCreate' :logout='logout' ref='menu'></menus>
	<createroom v-if="create" :showCreate="showCreate" :createRoomid="createRoomid"></createroom>
	</div>
</template>
<style type="text/css" scoped="scoped">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.flex{
	flex: 1;
}
.chat-box{
	margin: 0 auto;
	height: 100%;
	overflow: hidden;
	position: relative;
	flex-direction: row-reverse;
	 -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;
}
.chat{
    background-color: rgb(245, 245, 245);
	background-image:url(http://www.fetchs.cn/images/kiana.jpg) ; 
	/* 这里有个皮肤以后会做背景自选更换 */
	background-size: cover;
    background-position: center center;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	height: 100%;
	position: absolute;
	transition: all .5s; 
	width: 100%;
	position : relative
}
/*.menuSlider,.menuOpen,.chat,.chatShow{
	transition-duration:.5s;
}*/
.menuSlider{
	position: absolute;
	display: flex;
	bottom: 0;
	height: 100%;
	width: 280px;
	z-index: 101;
	transform: translateX(-280px);
	transition: all .5s; 
	flex-direction: column;
}
.share{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.2);
	z-index: 100;
}
.chatShow{
	transform: translateX(280px);
}
.menuOpen{
	transform: translateX(0px);
}
@media screen and (max-width: 980px){
}
@media screen and (min-width: 981px){
}

.footer{
	height: 50px;
	display: flex;
	position : relative;
}
.footer .iconBox{
	height: 48px;
	width: 40px;
	line-height: 48px;
	text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: #555;
    cursor: pointer;
}
.footerCent{
	flex: 1;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
.footer .inputs{
	border-radius: 5px;
	background: #fff;
	margin: 2px;
	display: flex;
	height: 28px;
	line-height: 28px;
}
.footer .inputs input{
	height:auto;
	outline: none;
	border: 0;
	flex: 1;
}
</style>
<script type="text/javascript">
import headers from '../components/headers.vue'
import mains from '../components/main.vue'
import menus from '../components/menu.vue'
import createroom from '../components/createRoom.vue'
import brow from '../components/brow.vue'
import BScroll from 'better-scroll'
import {chats} from '../assets/js/chat'
var user={
	name:null,
	saysay:'asdasdads'
}
var homes = [{name:1}]
var homename = 1;  
var msg =[];
var menu = false; 
var notice = false;
var create = false;
export default {
	data () {
		return {
			create : create , 
			test : 'test' , 
			menu : menu,
			notice : notice,  
			chat : null, 
			txt : '', 
			msg : msg, 
			user : user, 
			homes : [],  
			homename : homename, 
			emoji : false  
		}
	},
	watch:{
		homename:function(){
			this.msg=[];
			this.chat.chat.btn.join({
	          	name:this.user.name,
	          	roomid:this.homename
	        })
		}
	},
	computed :{
		addHome:function(){
			let i=0,l=this.homes,arr=[];
			for (i in l){
				if(Object.prototype.toString.call(l[i].name)=='[object Number]'){
					l[i].name+=''
				}
				arr.push(l[i].name)
			}
			return arr
		}
	},
	methods:{
		showEmoji:function(str){
			if(Object.prototype.toString.call(str)=='[object String]'){
				this.txt +='!['+str+']'
			}
			this.emoji = !this.emoji;
			this.$refs.input.focus()
		},
		showMenu:function(){ 
			this.menu=!this.menu;
		},
		showCreate:function(e){ 
			this.create = !this.create;
		},
		createRoomid:function(str){  
			if(str == this.homename){
				return
			}else if(this.addHome.indexOf(str)<0){
				this.homes.push({
					name: str
				});
			}
			this.$nextTick(()=>{
				this.homename = str;
			})
		},
		showNick:function(){  
			this.notice = !this.notice
		},
		
		gohome:function(name){
			this.homename = name;
		},
		logout:function(){
			this.chat.chat.btn.logout()
		},
		submit: function(){
			if(this.txt==''){return}
			this.$refs.input.focus()
			var txt = this.txt;
			console.log(txt);
			var newTxt = txt.replace(/</,'\\<');
				newTxt = newTxt.replace(/>/,'\\>'); 
				newTxt = newTxt.replace(/\!\[(.+?)\]/g,'<img src="http://www.fetchs.cn/images/emoji/$1.png" alt="$1">'); // 匹配替换成文字
			var name = this.user.name;
			this.$nextTick(() => {
		        this.chat.chat.btn.msg({
					name : name,
					msg: newTxt
				});
		   });
			this.txt='';
		},
		look : function(){

		}
	},
	components:{
		headers, 
		mains, 
		menus, 
		createroom, 
		brow
	},
	props:['local'],
	created () {
		this.msg = []; 
		this.chat = window
			.chats.disconnect()
			.connect().chat.fn.call(this)
			.chat.btn.login()
	}
}
</script>
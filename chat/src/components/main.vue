<template>
<div class='main' ref='msg'>
	<div class="mainBox">
	<section v-for="(v,i) in msg">
		<div v-if="v.type == 'sys'" :class="v.type">
			<div class="msg_box">{{v.msg}}</div>
		</div>
		<div v-else-if="v.type === 'me'" :class="v.type">
			<div class="msgHead"><img src="../assets/logo.png"/></div>
			<div class="msgData"><h3>{{v.name}}</h3>
				<div class="msg_box" v-html="v.msg"></div>
			</div>
		</div>
		<div v-else-if="v.type === 'users'" :class="v.type">
			<div class="msgHead"><img src="../assets/logo.png"/></div>
			<div class="msgData"><h3>{{v.name}}</h3>
				<div class="msg_box" v-html="v.msg"></div>
			</div>
		</div>
	</section>
	</div>
	<div>
		<audio src="http://data.huiyi8.com/2014/lxy/05/14/10.mp3" id="msg"></audio>
	</div>
</div>
</template>

<style lang="less">
@import '../less/main.less';	
</style>
<script>
import BScroll from 'better-scroll'
export default {
	watch:{
		msg:function(){
			this.$nextTick(()=>{
				document.getElementById('msg').play()
				this._initScroll();
			})
		}
	},
	methods:{
		_initScroll () {
			let dom = document.getElementsByClassName('main').item(0)
			let h = document.getElementsByClassName('main').item(0).clientHeight;
			let y = dom.getElementsByTagName('div').item(0).clientHeight;
			let s = y - h +20;
			if(h<y){
			  this.foodsScroll = new BScroll(dom, {
			    startY: -s ,
	            click: true
		     });
			}else{
			  this.foodsScroll = new BScroll(dom, {
	            click: true
		     });
			}
		},
	},
	props:['msg']
}
</script>
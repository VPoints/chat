<template>
<div v-bind:class="['menuSlider',{menuOpen:menu}]">
	<div class="menuMain">
		<div id="">
		<div class="user">
			<div class="userHead"><img src="../assets/logo.png"/></div>
			<div class="userData"><h3>{{user.name}}</h3><p>{{user.saysay}}</p></div>
		</div>
		<div :class="['homes']">
			<div :class="['seo',{'seoShow':isSeo}]">
				<input type="text" v-model='test'/>
				<div class="iconBox">
					<i class="iconfont" >&#xe650;</i>
				</div>
			</div>
			<div class="title">房间列表</div>
			<div :class="['home','animated',{zoomInDown:animate}]" v-for="(v,i) in addHome" v-if="homename!=v.name" v-on:click="gohome(v.name)">
				<div class="homeHead"><img src="../assets/logo.png"/></div>
				<div class="homeData">
						<span>{{v.name}}</span>
				</div>
			</div>
			<div class="home myhome" v-else>
				<div class="homeHead"><img src="../assets/logo.png"/></div>
				<div class="homeData">
						<span>{{v.name}}</span>
				</div>
			</div>
		</div>
			
		</div>
	</div>
	<!--菜单栏按钮-->
	<div class="menus">
		<ul>
			<li>
				<div v-on:click='isSeo=false'>
					<i class="iconfont" >&#xe64c;</i>
				</div>
			</li>
			<li>
				<div  v-on:click='showSeo'>
					<i class="iconfont" >&#xe612;</i>
				</div>
			</li>
			<li>
				<div v-on:click='showCreate'>
					<i class="iconfont" >&#xe607;</i>
				</div>
			</li>
			<li>
				<div  v-on:click='setting'>
					<i class="iconfont" >&#xe6b5;</i>
				</div>
			</li>
			<li>
				<div  v-on:click='logout'>
					<i class="iconfont" >&#xe605;</i>
				</div>
			</li>
		</ul>
	</div>
</div>
</template>

<style lang="less">
@import '../less/menu.less';	
</style>
<style type="text/css" scoped>
	
</style>
<script>
import BScroll from 'better-scroll'
export default{
	data () {
		return {
			isSeo:false,  // 显示搜索条
			shows:true,  //  还没想好用来干嘛
			animate:false,  // 动画显示
			time: '' , // 动画的移除时间
			addHome: null,
			test:''
		}
	},
	methods:{
		showSeo:function(){
			this.isSeo = !this.isSeo;
		},
		setting:function(){
			alert('暂未开放此功能')
		},
		_initScroll () {
			this.foodsScroll = new BScroll(document.getElementsByClassName('menuMain').item(0), {
	          click: true
	       });
		},
		_initAnimate () {
			this.animate = true;
			this.time = setTimeout(()=>{
				this.animate = false;
			},1000)
		}
	},
	computed:{
	},
	watch:{
		addHome:function(){
			this.$nextTick(()=>{
				this._initAnimate()
				this._initScroll();
			})
		}
	},
	created () {
		this.addHome = this.homes;
		this.$nextTick(()=>{
			this._initScroll();
		})
	},
//	menu 是控制菜单显示 
//	user 是用户信息  
//	homes  是房间集合  
//	homename 是选中的房间
//	gohome 是去到这个房间的动作  
	props:['menu','user','homes','homename','gohome','showCreate','msg','logout']
}
</script>



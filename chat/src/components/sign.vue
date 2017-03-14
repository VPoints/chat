<template>
	<div class="sign">
		<div class="sign-navs">
			<div class="navs-slider">
				<a v-for="(v,t) in navs" :class="{active:toggle==t}" v-on:click="toggle=t">{{v.title}}</a>
				<span v-bind:style='navsSlider'></span>
			</div>
		</div>
		<div class="sign-box">
			<div class="inputs" v-for="(v,t) in navs[toggle].inputs">
				<input type="text" :placeholder="v.p" name="v.name" v-if="v.type==='text'" v-model='v.txt'/>
				<input type="password" :placeholder="v.p" name="password" v-model='v.txt' v-else-if="v.type==='password'" />
				<input type="file" :placeholder="v.p" name="nickname"  v-else/>
			</div>
		</div>
		<input type="submit" :value="navs[toggle].title" class="sign-submit" v-on:click="gohome"/>
	</div>
</template>

<style lang="less">
@import '../less/sign.less';	
</style>
<script type="text/javascript">
let navs = [
   		{
  	      title:'注册',
  	      inputs:[
  	        {
  	          p:'帐号',
  	          name:'username',
  	          type:'text',
  	          txt:''
  	        },
  	        {
  	          p:'密码',
  	          name:'username',
  	          type:'password',
  	          txt:''
  	        },
  	        {
  	          p:'昵称',
  	          name:'nickname',
  	          type:'text',
  	          txt:''
  	        }
  	      ]
  	    },
  	    {
  	      title:'登录',
  	      inputs:[
  	        {
  	          p:'帐号',
  	          name:'username',
  	          type:'text',
  	          txt:''
  	        },
  	        {
  	          p:'密码',
  	          name:'username',
  	          type:'password',
  	          txt:''
  	        }
  	      ]
  	    }
  	  ]
function trans() {
	var test = {
			transform: 'translateX('+(this.toggle*200/navs.length)+'px)'
  	}
  	return test
}
export default {
  data () {
  	return {
      toggle:0,
  	  navs:navs,
  	  chat: null
  	}
  },
  methods:{
  	gohome:function(){
  		var sign = {
  				name : navs[0].inputs[0].txt,
  				password : navs[0].inputs[1].txt,
  				nickname : navs[0].inputs[2].txt
  		} 
		var login = {
			name : navs[1].inputs[0].txt,
			password : navs[1].inputs[1].txt
		} 	
  		if(this.toggle==0){
					// this.$store.commit('register',sign);
  			window.chats.sign.btn.register(sign)
	  	}else{
				
					// this.$store.commit('signUp',sign);
  			window.chats.sign.btn.signUp(login)
	    }
  	}
  },
  created () {
		// this.$store.commit('disconnect');
		// this.$store.commit('connect');
		// this.$store.commit('signFn',this);
	window.chats.disconnect().connect().sign.fn.call(this)
  },
  computed: {
     navsSlider:trans
  }
}
</script>
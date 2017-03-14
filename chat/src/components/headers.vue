<template>
	<header>
		<div class="menu" v-on:click="showMenu"><i class="iconfont">&#xe63d;</i></div>
		<div class="headerTitle"><!--<img src="../../dist/logo.png"/>-->{{homename}}</div>
		<div class="menu" v-on:click="showNick"><i class="iconfont">&#xe621;</i></div>
	</header>
</template>

<style lang="less">
@import '../less/headers.less';	
</style>
<script>
export default {
	data () {
		return {}
	},
	props:['menu','homename','showMenu','showNick']
}
</script>
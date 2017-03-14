<template>
	<div class="createRoom">
		<div class="createContarner">
			<div class="createrHeader">
				创建房间
			</div>
			<div class="createForm">
				<div class="inputs">
					<input type="text" v-model='roomid'/>
				</div>
				<div class="btn" v-on:click="createHome">
					<button>
						创建
					</button>
				</div>
				
				<div class="btn" v-on:click="showCreate">
					<button>
						取消
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less">
@import '../less/createRoom.less';	
</style>
<script type="text/javascript">
export default {
	data () {
		return {
			roomid:''
		}
	},
	methods:{
		createHome:function(){
			this.createRoomid(this.roomid); 
			this.showCreate(); 
			this.roomid = '';
		}
	},
	props:['showCreate','createRoomid']
}
</script>
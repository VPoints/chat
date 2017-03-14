<template>
	<div class="login-box">
		<div class="login">
			<div class="login-header">
				VVG的聊天室
			</div>
			<sign></sign>
			<div class="login-footer"></div>
		</div>
	</div>
</template>
<style type="text/css"scoped>
.login-box{
	height: 100%;
	width: 100%;
	background: #fff;
	position: relative;
}
	.login{
		width: 300px;
		font-family: "微软雅黑";
		display: flex;
		margin: 0 auto;
		flex-direction: column;
		justify-content:center;
		height: 100%;
	}
	.login-header{
		padding: 30px 0 20px;
	    font-weight: 400;
	    font-size: 24px;
	    opacity: .7;
	}
	.login-footer{
		height: 200px;
	}
	.sign{
		min-height: 400px;
	}
	@media (max-width: 741px) {
		.login{
			justify-content: flex-start;
		}
		.sign{
			min-height: auto;
		}
	}
</style>
<script type="text/javascript">
import sign from '../components/sign.vue'
export default{
	components:{
		sign
	}
}
</script>
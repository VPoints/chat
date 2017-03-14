<template>
	<div class='brow' v-on:click='showEmoji'>
        <div class="lookBox">
            <div class="emoji" v-for="(v,i) in emoji" v-on:click.stop='showEmoji(v.title)'>
                <img :src="'http://www.fetchs.cn/images/emoji/'+v.title+'.png'" alt="">
            </div>
        </div>
    </div>
</template>
<style lang="less">
@import '../less/brow.less';	
</style>
<script type="text/javascript">
import {look} from '../assets/js/emoji'
export default{
	data () {
        return {
            emoji : look
        }
    },
    props:['showEmoji']
}
</script>

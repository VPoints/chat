import Vue from 'vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'  
import Vuex from 'vuex'
import router from './assets/config/router'
import store from './assets/config/store'
Vue.use(Vuex)
Vue.use(VueRouter);
Vue.use(VueResource );

// 因为是io对象  使用 store 反而会有缺陷，暂时抛开store进行操作
import { chats } from './assets/js/chat'
window.chats = chats.connect() ;

new Vue({  
  el: '#app',  
  data(){  
    return {  
    	test:'test',
        transitionName: 'slide'
    }  
  },  
  store ,
  router,  
  watch: {  
    '$route' (to, from){  
        const toDepth = to.path.substring(0, to.path.length-2).split('/').length
        const fromDepth = from.path.substring(0, from.path.length-2).split('/').length  
        this.transitionName = toDepth < fromDepth ? 'slide_back' : 'slide'  
    }  
  } ,
  created () {
    // this.$store.commit('connect');
  }
})  
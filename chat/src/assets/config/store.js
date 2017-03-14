import Vue from 'vue'
import Vuex from 'vuex'
import { chats } from '../js/chat'
Vue.use(Vuex);
export default new Vuex.Store({
    state : {
        chat: chats , // 全局的chat变量
    },
    mutations :{
        connect (state,test) { // 启动连接
            chats.connect.call(state.chat)
        },
        disconnect (state) {  // 关闭连接
            chats.disconnect.call(state.chat);
        },
        signFn (state,vm) {
            state.chat.io.on('register', (test)=>{
				if(test.msg == 200){
					vm.toggle = 1;
				}else{
					alert(test.content)
				}
			})
			state.chat.io.on('signUp', (test)=>{
				if(test.msg == 200){
					localStorage['token'] = test.token
					window.location.hash='/home'
				}else{
					alert(test.content)
				}
			})
            console.log('sign')
        },
        register (state,obj) {
            state.chat.io.emit('register',obj)
        },
        signUp (state,obj) {
            state.chat.io.emit('signUp',obj)
        }
    }
})


import Vue from 'vue'
import VueRouter from 'vue-router'  
Vue.use(VueRouter);
import login from '../../pages/login.vue'
import home from '../../pages/mains.vue'
const routes = [  
    {  
        path: '/',  
        component: login  
    },  
    {  
        path: '/home',  
        component: home  
    }  
]
export default new VueRouter({  
    routes  
})  

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Player from './components/Player.vue'
import VideoPlayer from './components/VideoPlayer.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  base: __dirname,
  routes: [
    {path: "/", component: Player},
    {path: "/video", component: VideoPlayer},
  ]
})
document.addEventListener("DOMContentLoaded",function(){
  window.pidMap = {
    "0C": "RPM", "0E": "Ign Timing", "2F": "Fuel Level", "31": "Distance",
    "05": "ECT", "0D": "Speed", "0F": "IAT", "11": "TPS", "0B": "MAP"
  }

  window.store = {   
    jwt: "",     
    fetchGet(url, onOk){
      return fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'          
        }
      })
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        if (data.status == "ok"){
          if (onOk != undefined){
            onOk(data)
          }
        }else{
          console.error("Invalid response")
        }      
      });
    },
    fetchPost(url, method, params, onComplete){            
      return fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
                    
        },
        body: JSON.stringify(params)
      })
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        onComplete(data)        
      });      
    } 
  }

  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
})


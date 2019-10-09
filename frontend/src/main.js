import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
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
    render: h => h(App),
  }).$mount('#app')
})


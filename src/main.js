import Vue from 'vue'
import App from './App.vue'
 
var appDiv = document.createElement('div');
appDiv.id = "App";
document.body.appendChild(appDiv);

new Vue({
  el: "#App",
  render: h => h(App)
})
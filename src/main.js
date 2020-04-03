import Vue from 'vue'
import App from './App.vue'

var elem = document.getElementsByTagName("covid-19-models-app")[0]
//console.log("elem is "+elem);

new Vue({
  el: elem,
  render: h => h(App)
})
<template>  
  <div id="App">
    <h1>Template loaded</h1>
    <h2>{{message}}</h2>
  </div>
</template>
 
<script>
export default {
  name: 'app',
  data () {
    return {
      message: 'It works'
    }
  }
}
</script>
 
<style>
#hello {
  font-family: Verdana;
  color: navy;
}
</style>
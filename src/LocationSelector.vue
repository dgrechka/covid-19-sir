<template>  
  <form action="#">
  <fieldset>
    <label for="location-selection">Select location:</label>
    <select name="location-selection" v-model="selected">
        <option v-for="option in options" :key="option.value" v-bind:value="option">{{ option.text }}</option>
    </select>
  </fieldset>
  </form>
</template>

<script>
// import $ from 'jquery'
// import * as jQuery from "jquery-ui"

export default {
  name: 'location-selector',
  props : {
      options: {
          required : true,
          type: Array
      }
  },
  data () {
    return {
        selected: null
    }
  },
  watch: {
      selected: function(newVal) {
          if(newVal) {
            console.log('selection changed to '+newVal.value)
            this.$emit('selectedChanged', newVal)
          }
      }
  }
//   mounted: function() {
//     $("select",this.$el).selectmenu()
//   }
}
</script>
 
<style>
#hello {
  font-family: Verdana;
  color: navy;
}
</style>
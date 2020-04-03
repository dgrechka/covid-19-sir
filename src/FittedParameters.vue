<template>  
  <div>
      <div>
          <div>Date of infection peak</div><div>{{parameters.PeakDate}}</div>
          <div>Peak Infected Count</div><div>{{parameters.PeakDayInfectedCount}}</div>
      </div>
  </div>
</template>

<script>
// import $ from 'jquery'
// import * as jQuery from "jquery-ui"

export default {
  name: 'fitted-parameters',
  props: {
      parameters: {
          type: Object
      }
  },
  data () {
    return {
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
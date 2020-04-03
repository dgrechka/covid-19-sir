<template>  
  <img class="fit-figure" v-bind:src="imgSrc" />
</template>

<script>

export default {
  name: 'fit-figure',
  props: {
      locationKey: {
          type: String,
          required: false
      },
      datasetURL : {
          type: String,
          required: true
      }
  },
  computed : {
      imgSrc : function() {
          return this.datasetURL + "/per_location_figures/"+this.locationKey+".png"
      }
  }
}
</script>
 
<style>
.fit-figure {
  width: 100%;
}
</style>
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
      },
      cacheBraker: {
        type: String
      }
  },
  computed : {
      imgSrc : function() {
          return this.datasetURL + "/figures/"+this.locationKey+".png?"+"cacheBraker="+this.cacheBraker;
      }
  }
}
</script>
 
<style>
.fit-figure {
  width: 100%;
  max-width: 600px;
  border-radius: 4px;
  margin: 5px;
  padding: 0.1em;
}
</style>
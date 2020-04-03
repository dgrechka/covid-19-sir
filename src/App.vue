<template>  
  <div id="App">
    <div v-if="!catalogLoaded">
        <p>Loading locations...</p>
    </div>
    <div v-if="catalogLoaded">
        <location-selector @selectedChanged="locationSelected"  v-bind:options="locations"></location-selector>
        <div v-if="selectedLocation">
            <fitted-parameters v-bind:parameters="selectedLocation.params"></fitted-parameters>
            <fit-figure v-bind:datasetURL="datasetURL" v-bind:locationKey="selectedLocation.value"></fit-figure>
        </div>
        <div v-if="!selectedLocation">
            About page
        </div>
    </div>
  </div>
</template>
 
<script>
import Papa from 'papaparse'
import LocationSelector from './LocationSelector.vue'
import FittedParameters from './FittedParameters.vue'
import FitFigure from './FitFigure.vue'

export default {
  components: {LocationSelector, FittedParameters, FitFigure},
  name: 'covid-19-models-app',
  data () {
    return {
      catalogLoaded: false,
      datasetURL: "/dataset",
      dataDate: "2 April 2020",
      locations: [],
      selectedLocation: null
    }
  },
  methods: {
    locationSelected (value) {
      this.selectedLocation = value;
    }
  },
  created: function() {
        var paramsURL = this.datasetURL+"/per_location_fitted_params.csv"
        console.log("Loading fitted locations from "+paramsURL)
        var vm = this;
        Papa.parse(paramsURL, {
                download: true,
                complete: function(results) {
                    vm.dataset = results.data;
                    let locs = [];
                    let parameters = []
                    let paramNames = []
                    var heading = results.data[0]
                    var N = results.data.length-1;
                    for(var i=2;i<heading.length;i++)
                        paramNames.push(heading[i]);
                    for(var i=1;i<N;i++) {
                        var row = results.data[i];
                        var province = row[0];
                        var country = row[1];
                        var locKey = "";
                        var locText = "";
                        if(province.length>0) {
                            locKey = province+"@"+country;
                            locText = country +" - "+province
                        } else {
                            locKey = country;
                            locText = country;
                        }
                        var paramsObj = {};
                        for(var j=0; j<paramNames.length;j++) {
                            paramsObj[paramNames[j]]=row[j+2]
                        }
                        
                        locs.push({'value':locKey, 'text':locText, 'params':paramsObj });
                    }
                    locs.sort(function(a, b){return a.text>b.text ? 1: -1})
                    vm.locations = locs;
                    vm.catalogLoaded = true;
                }
            });
  }
}
</script>
 
<style>
#hello {
  font-family: Verdana;
  color: navy;
}
</style>
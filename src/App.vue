<template>  
  <div id="App">
    <h1>COVID-19 spread modelling (as on {{fitDate}})</h1>
    <div v-if="!catalogLoaded">
        <p>Loading locations...</p>
    </div>
    <div v-if="catalogLoaded">
        <location-selector @selectedChanged="locationSelected"  v-bind:options="locations"></location-selector>
        <div class="location-info" v-if="selectedLocation">
            <div class="disclaimer"><i>Disclaimer: The results are obtained using automatic tool. Consider visual Quality Control of the fit before taking the numbers below seriously!</i></div>
            <fitted-parameters v-bind:parameters="selectedLocation.params"></fitted-parameters>
            <fit-figure v-bind:cacheBraker="fitDate" v-bind:datasetURL="datasetURL" v-bind:locationKey="selectedLocation.value"></fit-figure>
        </div>
        <div v-if="!selectedLocation" class="about">
            <p>This app provides a way to explore COVID-19 epidemic dynamics prediction using <a href='https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model' target="_BLANK">SIR modelling</a>.
                
                I made these predictions as a part of <a href="https://www.kaggle.com/c/covid19-global-forecasting-week-3/" target="_BLANK">Kaggle COVID19 Global Forecasting Challenge</a>.
                I also publish the predictions as <a href="https://www.kaggle.com/dgrechka/covid19-global-forecast-sir-jhu-timeseries-fit" target="_BLANK">public Kaggle dataset</a>. 
                I try to update the predictions daily both here and on Kaggle. But due to limited compute power, there can be delays couple of days long.</p>
                <p>The model is defined as ODE system as follows:</p>
                <img src='https://wikimedia.org/api/rest_v1/media/math/render/svg/29728a7d4bebe8197dca7d873d81b9dce954522e'>
                <p>Where</p>
                <ul>
                    <li>S - susceptible, subjects who can catch the infection</li>
                    <li>I - infected, contagious subjects</li>
                    <li>R - removed, subjects either recovered or died due to disease</li>
                </ul>
                <p>The models are fitted on <a href='https://github.com/CSSEGISandData/COVID-19' target="_BLANK">John Hopkins University data</a> (time series) using several runs of Nelder-Mead simplex optimization method (best run is taken) starting at different initial locations and RMSE as a loss.</p>

                <p>What parameters are fitted (estimated) per country/province:</p>
                <ul>
                    <li>the day when the infection emerged in the country</li>
                    <li>the initial infected count on the first day of the infection</li>
                    <li>beta (weekly [spline model]) - an average number of contacts (sufficient to spread the disease) per day each infected individual has</li>
                    <li>gamma - fixed fraction of the infected group that will recover during any given day</li>
                    <li>R0 (weekly [spline model]) - Equals beta/gamma</li>
                </ul>

                <p>How to read the figures.</p>
                <ul>
                    <li>points are real observed data provided by Johns Hopkins University</li>
                    <li>curves are model prediction</li>
                </ul>
                <ul>
                    <li>blue is susceptible population - people that are not yet infected but can get the infection
                    <li>red is infected population</li>
                    <li>green is removed population (recovered or dead). people that are not susceptible any more as they came through the infection.</li>
                </ul>
                <p>The predictions are recomputed regularly using <a href='https://github.com/itislab/alpheus' target="_BLANK">Alpheus computational experiments framework</a> 
                <p>The model fitting code is published at <a href="https://github.com/Yet-Another-Team/covid19-global-forecasting" target="_BLANK">github</a></p>
                <p>The web app is also published at <a href="https://github.com/dgrechka/covid-19-sir" target="_BLANK">github</a></p>
                <hr>
                <p>Dmitry Grechka 2020<br>dmitry&lt;at&gt;grechka.family</p>
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
      datasetURL: "dataset",
      fitDate: "13 April 2020",
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
        var paramsURL = this.datasetURL+"/params.csv?cacheBraker="+this.fitDate;
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
                    var countryColIdx = -1;
                    var provinceColIdx = -1;
                    for(var i=0;i<heading.length;i++) {
                        if(heading[i] == "Country")
                            countryColIdx = i;
                        else if(heading[i] == "Province")
                            provinceColIdx = i;
                        else
                            paramNames.push(heading[i]);
                    }
                    for(var i=1;i<N;i++) {
                        var row = results.data[i];
                        var province = row[provinceColIdx];
                        var country = row[countryColIdx];
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
                        var skipCount = 0;
                        for(var j=0; j<paramNames.length+2;j++) {
                            if((j == countryColIdx) || (j== provinceColIdx)) {
                                skipCount ++;
                                continue;
                            }
                            paramsObj[paramNames[j-skipCount]]=row[j]
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
    body {
        background: #eeeeee;
    }
    div.location-info {
        display: flex;
        flex-wrap: wrap;
    }
    div.about {
        border-radius: 4px;
        background: white;
        padding: 0.5em;
        margin: 1em 0.1em 0 0.1em;
    }
    h1 {
        margin: 0.5em 0 0 1pt;
        font-size: 2em;
    }
    h2 {
        margin: 0.5em 0 0 1pt;
    }
</style>
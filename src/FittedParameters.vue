<template>
  <div class="paramsArea">
  <h3>Estimated SIR model paramters:</h3>
  <div class="params">
        <div class="pRow">
            <div class="pName">Date of infection peak (<strong>estimated</strong>)</div><div class="pVal">{{parameters.PeakDate}}</div>
        </div>
        <div class="pRow">
            <div class="pName">Peak Infected Count (<strong>estimated</strong>)</div><div class="pVal">{{parameters.PeakDayInfectedCount}}</div>
        </div>
        <div class="pRow">
            <div class="pName">Location population</div><div class="pVal">{{parameters.TotalPopulation}}</div>
        </div>
        <div v-if="!expanded" class="pRow">
            <span @click="toggleExpand">More...</span>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Susceptible population</div><div class="pVal">{{parameters.EstimatedSusceptiblePopulation}}</div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Beta</div><div class="pVal">{{parameters.Beta}}</div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Gamma</div><div class="pVal">{{parameters.Gamma}}</div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">R0</div><div class="pVal">{{parameters.R0}}</div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Infection start date </div><div class="pVal">{{parameters.FirstDate}}</div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Infected count on first infection day</div><div class="pVal">{{parameters.FirstDayInfectedCount}}</div>
        </div>
        <div  v-if="expanded" class="pRow">
            <span @click="toggleExpand">Show less</span>
        </div>
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
  methods: {
      toggleExpand: function() {
          this.expanded = !this.expanded;
      }
  },
  data () {
    return {
        expanded: false
    }
  }
}
</script>
 
<style>
div.paramsArea {
    background: white;
    border-radius: 3px;
    margin: 10px;
    padding: 0.1em;

}
div.paramsArea h3 {
    margin: 5px;
    display: inline;
}
div.params {
    display: flex;
    flex-direction: column;
    margin: 5px;
}
div.pRow {
    display: flex;
    margin: 0 0 4px 0;
}
div.pName {
    width: 50%;
    font-size: 1em;
}
div.pVal {
    font-size: 1em;
}
span {
    font-weight: bold;
    cursor: pointer;
}
</style>
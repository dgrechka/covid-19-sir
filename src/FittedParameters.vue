<template>
  <div class="paramsArea">
  <h3>SIR model parameters:</h3>
  <div class="params">
      <div class="pRow">
            <div class="pName"><strong>Parameter</strong></div>
            <div class="pVal"><strong>Estimated Value</strong></div>
            <div class="pUnits"><strong>Units</strong></div>
        </div>
        <div class="pRow">
            <div class="pName">Date of infection peak</div>
            <div class="pVal">{{parameters.PeakDate | formatDate}}</div>
            <div class="pUnits"></div>
        </div>
        <div class="pRow">
            <div class="pName">Peak Infected Count</div>
            <div class="pVal">{{parameters.PeakDayInfectedCount | formatPopulation}}</div>
            <div class="pUnits">people</div>
        </div>
        <div class="pRow">
            <div class="pName">Average infected person recovers in</div>
            <div class="pVal">{{1.0/parameters.Gamma | formatDays}}</div>
            <div class="pUnits">days</div>
        </div>
        <div class="pRow">
            <div class="pName">Location population</div>
            <div class="pVal">{{parameters.TotalPopulation | formatPopulation}}</div>
            <div class="pUnits">people</div>
        </div>
        <div v-if="!expanded" class="pRow">
            <span @click="toggleExpand">More...</span>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Susceptible population</div>
            <div class="pVal">{{parameters.EstimatedSusceptiblePopulation | formatPopulation}}</div>
            <div class="pUnits">people</div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Beta</div>
            <div class="pVal">{{parameters.Beta | formatTwoDecimal}}</div>
            <div class="pUnits"></div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Gamma</div>
            <div class="pVal">{{parameters.Gamma | formatTwoDecimal}}</div>
            <div class="pUnits">days<sup>-1</sup></div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">R0</div>
            <div class="pVal">{{parameters.R0 | formatR0}}</div>
            <div class="pUnits">people</div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Infection start date </div>
            <div class="pVal">{{parameters.FirstDate | formatDate}}</div>
            <div class="pUnits"></div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Infected count on first infection day</div>
            <div class="pVal">{{parameters.FirstDayInfectedCount | formatPopulation}}</div>
            <div class="pUnits">people</div>
        </div>
        <div v-if="expanded" class="pRow">
            <div class="pName">Achieved loss (RMSE)</div>
            <div class="pVal">{{parameters.Loss | formatTwoDecimal}}</div>
            <div class="pUnits">people</div>
        </div>
        <div  v-if="expanded" class="pRow">
            <span @click="toggleExpand">Show less</span>
        </div>
  </div>
  </div>
</template>

<script>
import numeral from 'numeral'

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
  filters: {
      formatPopulation : function(value) {
          return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
      },
      formatDays : function(value) {
          return numeral(value).format("0.");
      },
      formatR0 : function(value) {
          return numeral(value).format("0.0");
      },
      formatTwoDecimal : function(value) {
          return numeral(value).format("0.00");
      },
      formatDate : function(value) {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          var d = new Date(value)
          return d.toLocaleDateString("en-UK",options);
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
    width: 100%;
    max-width: 600px;
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
    margin: 2px 0 3px 0;
    align-items: baseline;
}
div.pName {
    width: 50%;
    font-size: 1em;
}
div.pVal {
    width: 30%;
    font-size: 1em;
    text-align: end;
}
div.pUnits {
    margin-left: 1em;
    width: 20%;
    font-size: 1em;
}
span {
    font-weight: bold;
    cursor: pointer;
}
</style>
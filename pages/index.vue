<template>
  <v-layout column justify-center align-center>
    <v-row
      ><v-card-title class="justify-center">COVID-19 Tracker</v-card-title>
      <v-autocomplete
        v-if="affectedCountries"
        v-model="selectedCountry"
        :items="affectedCountries"
        shaped
        dense
        filled
        label="Search country"
      ></v-autocomplete
    ></v-row>

    <h4 class="my-3">
      Total cases in {{ selectedCountry }}
      <span v-if="selectedTotalCases">: {{ selectedTotalCases }}</span>
    </h4>
    <div class="chartContainer">
      <v-progress-circular
        v-if="!totalCases.length > 0 || !dates.length > 0"
        class="center-loader"
        :size="45"
        :width="5"
        color="white"
        indeterminate
      ></v-progress-circular>
      <TrendChart
        v-if="totalCases.length > 0 && dates.length > 0"
        class="chart"
        :interactive="true"
        :datasets="[dataset]"
        :grid="{
          verticalLines: true,
          horizontalLines: true
        }"
        :min="0"
        :labels="labels"
        @mouse-move="onMouseMove"
      >
        <div v-for="date in dates" :key="date">
          {{ date }}
        </div>
      </TrendChart>
    </div>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      // showChart: false,
      total_cases: [],
      selectedTotalCases: 0
    }
  },
  watch: {
    selectedCountry() {
      this.$store.dispatch('fetchCasesByCountry')
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.showChart = true
    // }, 100)
    // this.showChart = true
  },
  methods: {
    numberWithSpaces(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    onMouseMove(params) {
      if (!params) {
        this.selectedTotalCases = null
        return
      }
      this.selectedTotalCases = this.numberWithSpaces(params.data[0])
    }
  },
  computed: {
    selectedCountry: {
      get() {
        return this.$store.state.selectedCountry
      },
      set(value) {
        this.$store.commit('setSelectedCountry', value)
      }
    },
    labels() {
      return {
        xLabels: this.dates || ['11/11', '11/11', '11/11', '11/11', '11/11'],
        yLabels: 10,
        yLabelsTextFormatter: (val) => Math.ceil(val)
      }
    },
    dates() {
      return this.historyByCountry.map((history) => history.record_date)
    },
    totalCases() {
      return this.historyByCountry.map((history) =>
        Number(history.total_cases.replace(',', ''))
      )
    },
    five() {
      return this.totalCases.filter((a, b) => this.totalCases.indexOf(a) === b)
    },
    dataset() {
      if (!this.totalCases.length > 0) {
        return {
          data: [1000, 2000, 3000, 4000, 5000],
          showPoints: true,
          fill: true
        }
      }
      return {
        data: this.totalCases,
        showPoints: true,
        fill: true
      }
    },
    ...mapState({
      historyByCountry: (state) => state.historyByCountry,
      affectedCountries: (state) => state.affectedCountries
    })
  }
}
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
}
.center-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.chartContainer {
  position: relative;
  width: 100%;
  height: 63vh;
  background-color: #2e2e2e;
  padding: 2%;
  border-radius: 8px;
}
.label {
  text {
    fill: white;
  }
}
</style>

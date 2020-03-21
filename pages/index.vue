<template>
  <v-layout column justify-center align-center>
    <v-card-title class="justify-center">COVID-19 Tracker</v-card-title>
    <h4 class="my-2">Total cases in South Africa</h4>
    <div class="chartContainer">
      <v-progress-circular
        v-if="!totalCases.length > 0 || !dates.length > 0 || !showChart"
        class="center-loader"
        :size="45"
        :width="5"
        color="white"
        indeterminate
      ></v-progress-circular>
      <TrendChart
        v-if="totalCases.length > 0 && dates.length > 0 && showChart"
        class="chart"
        :interactive="true"
        :datasets="[dataset]"
        :grid="{
          verticalLines: true,
          horizontalLines: true
        }"
        :min="0"
        :labels="labels"
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
      showChart: false,
      total_cases: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.showChart = true
    }, 100)
  },
  computed: {
    labels() {
      return {
        xLabels: this.dates || ['11/11', '11/11', '11/11', '11/11', '11/11'],
        yLabels: 10,
        yLabelsTextFormatter: (val) => Math.ceil(val)
      }
    },
    dates() {
      return this.historyByCountry.map(
        (history) =>
          `${new Date(history.record_date).getDate()}/${new Date(
            history.record_date
          ).getMonth() + 1} `
      )
    },
    totalCases() {
      return this.historyByCountry.map((history) => Number(history.total_cases))
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
      historyByCountry: (state) => state.historyByCountry
    })
  }
}
</script>

<style lang="scss">
.center-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.chartContainer {
  position: relative;
  width: 100%;
  height: 70vh;
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

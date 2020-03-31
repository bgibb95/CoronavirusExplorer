<template>
  <div class="page-container chart-page">
    <v-layout column justify-center align-center>
      <v-row>
        <!-- <v-card-title class="justify-center">COVID-19 Tracker</v-card-title> -->
        <v-autocomplete
          v-if="affectedCountries.length > 0"
          v-model="selectedCountry"
          :items="affectedCountries"
          shaped
          dense
          :menu-props="{ maxHeight: 170 }"
          filled
          label="Search country"
        ></v-autocomplete>
      </v-row>

      <h5 v-if="percentageChange" class="my-3 percent-change-title">
        <span v-if="!loading">
          <span :class="percentClass">{{ percentageChange }}%</span> over previous day
        </span>
        <span v-if="loading">&nbsp;</span>
      </h5>
      <h4 class="active-cases">
        <span v-if="!loading">
          Active cases in {{ selectedCountry }}
          <span v-if="selectedActiveCases">
            :
            <span class="blue--text text--lighten-1">
              <b>{{ selectedActiveCases }}</b>
            </span>
            on
            <span>{{ selectedDate }}</span>
          </span>
        </span>
        <span v-if="loading">Updating...</span>
      </h4>
      <div class="chartContainer">
        <v-progress-circular
          v-if="!activeCases.length > 0 || !dates.length > 0 || loading"
          class="center-loader"
          :size="45"
          :width="5"
          color="white"
          indeterminate
        ></v-progress-circular>
        <TrendChart
          v-if="activeCases.length > 0 && dates.length > 0"
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
        ></TrendChart>
      </div>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    // if (to.name === 'stats' || to.name === 'learn') {
    //   return 'slide-right'
    // }
    return 'slide-left'
  },
  data() {
    return {
      active_cases: [],
      selectedActiveCases: 0,
      selectedDate: 0,
      loading: false
    }
  },
  watch: {
    selectedCountry() {
      if (this.selectedCountry) {
        document.querySelector('input').blur()
      }
      this.loading = true
      this.$store.dispatch('fetchCasesByCountry').finally(() => (this.loading = false))
      this.$store.dispatch('fetchLatestStatByCountry')
    }
  },
  mounted() {
    const element = document.querySelector('.chart-page')
    // eslint-disable-next-line no-new, no-undef
    new ResizeSensor(element, () => {
      this.$store.commit('setPageHeight', element.offsetHeight + 15)
    })
  },
  methods: {
    numberWithSpaces(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    onMouseMove(params) {
      if (!params) {
        this.selectedActiveCases = null
        return
      }
      this.selectedActiveCases = this.numberWithSpaces(params.data[0])
      this.selectedDate = this.historyByCountry.find(
        (history) => Number(history.active_cases) === params.data[0]
      ).record_date
    }
  },
  computed: {
    percentClass() {
      return this.percentageChange > 0 ? 'red--text text--lighten-2' : 'green--text text--lighten-2'
    },
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
      if (this.historyByCountry.length > 6) {
        return [
          this.historyByCountry[0].record_date,
          this.historyByCountry[this.historyByCountry.length - 1].record_date
        ]
      }
      return this.historyByCountry.map((history) => history.record_date)
    },
    activeCases() {
      return this.historyByCountry.map((history) => Number(history.active_cases))
    },
    five() {
      return this.activeCases.filter((a, b) => this.activeCases.indexOf(a) === b)
    },
    dataset() {
      if (!this.activeCases.length > 0) {
        return {
          data: [1000, 2000, 3000, 4000, 5000],
          showPoints: true,
          fill: true,
          className: 'active-cases'
        }
      }
      return {
        data: this.activeCases,
        showPoints: true,
        fill: true,
        className: 'active-cases'
      }
    },
    ...mapState({
      historyByCountry: (state) => state.historyByCountry,
      affectedCountries: (state) => state.affectedCountries,
      percentageChange: (state) => state.percentageChange
    })
  }
}
</script>

<style lang="scss" scoped>
.percent-change-title {
  margin-bottom: 0 !important;
}
.v-card__title {
  //font-size: 1rem;
  @media screen and (max-width: 780px) {
    padding-top: 0 !important;
  }
}
.active-cases {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
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
  height: 62vh;
  border: 1px solid rgba(white, 0.3);
  background-color: rgba(#2e2e2e, 0.8);
  padding: 2%;
  border-radius: 8px;
  @media screen and (max-width: 780px) {
    height: 60vh;
  }
}
</style>

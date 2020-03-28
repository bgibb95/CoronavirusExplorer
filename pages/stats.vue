<template>
  <v-layout column justify-center align-center>
    <v-row>
      <v-card-title class="justify-center">COVID-19 Tracker</v-card-title>
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
    <!-- <h4 class="active-cases">
      <span v-if="countryStat:oading">Updating...</span>
    </h4> -->

    <div v-if="latestCountryStat" class="chartContainer">
      <h4 class="justify-center">
        <span v-if="!countryStatLoading">{{ selectedCountry }}</span>
        <span v-if="countryStatLoading">Updating...</span>
      </h4>
      <v-row class="stats-row">
        <v-col v-if="latestCountryStat.active_cases" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">Active cases</v-list-item-title>
                <v-list-item-subtitle class="mb-1 blue--text text--lighten-3">
                  {{ latestCountryStat.active_cases }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col v-if="latestCountryStat.total_cases" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">Total cases</v-list-item-title>
                <v-list-item-subtitle class="mb-1 blue--text text--lighten-3">
                  {{ latestCountryStat.total_cases }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col v-if="latestCountryStat.total_deaths" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">Total deaths</v-list-item-title>
                <v-list-item-subtitle class="mb-1 red--text text--lighten-3">{{
                  latestCountryStat.total_deaths
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col v-if="latestCountryStat.total_recovered" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">Total recovered</v-list-item-title>
                <v-list-item-subtitle class="mb-1 green--text text--lighten-3">{{
                  latestCountryStat.total_recovered
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col v-if="latestCountryStat.serious_critical" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">Serious condition</v-list-item-title>
                <v-list-item-subtitle class="mb-1 amber--text text--lighten-3">{{
                  latestCountryStat.serious_critical
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-progress-circular
        v-if="countryStatLoading"
        class="center-loader"
        :size="45"
        :width="5"
        color="white"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-if="worldTotalStat" class="chartContainer">
      <h4 class="justify-center">
        <span v-if="!worldStatLoading">Worldwide</span>
        <span v-if="worldStatLoading">Updating...</span>
      </h4>
      <v-row class="stats-row">
        <v-col v-if="worldTotalStat.active_cases" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">Active cases</v-list-item-title>
                <v-list-item-subtitle class="mb-1 blue--text text--lighten-3">
                  {{ worldTotalStat.active_cases }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col v-if="worldTotalStat.total_cases" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">Total cases</v-list-item-title>
                <v-list-item-subtitle class="mb-1 blue--text text--lighten-3">{{
                  worldTotalStat.total_cases
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col v-if="worldTotalStat.total_deaths" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Total deaths</v-list-item-title>
                <v-list-item-subtitle class="mb-1 red--text text--lighten-3">{{
                  worldTotalStat.total_deaths
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col v-if="worldTotalStat.total_recovered" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">Total recovered</v-list-item-title>
                <v-list-item-subtitle class="mb-1 green--text text--lighten-3">{{
                  worldTotalStat.total_recovered
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col v-if="worldTotalStat.serious_critical" md="2" cols="6">
          <v-card outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">Serious condition</v-list-item-title>
                <v-list-item-subtitle class="mb-1 amber--text text--lighten-3">{{
                  worldTotalStat.serious_critical
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-progress-circular
        v-if="worldStatLoading"
        class="center-loader"
        :size="45"
        :width="5"
        color="white"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      countryStatLoading: false,
      worldStatLoading: false
    }
  },
  watch: {
    selectedCountry() {
      if (this.selectedCountry) {
        document.querySelector('input').blur()
      }
      this.countryStatLoading = true
      this.$store.dispatch('fetchCasesByCountry').finally(() => (this.countryStatLoading = false))
      this.$store.dispatch('fetchLatestStatByCountry').finally(() => (this.countryStatLoading = false))
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
    ...mapState({
      affectedCountries: (state) => state.affectedCountries,
      latestCountryStat: (state) => state.latestCountryStat[0],
      worldTotalStat: (state) => state.worldTotalStat
    })
  },
  mounted() {
    // this.worldStatLoading = true
    // this.$store.dispatch('fetchWorldTotalStat').finally(() => (this.worldStatLoading = false))
  }
}
</script>

<style lang="scss" scoped>
.v-card__title {
  //font-size: 1rem;
  @media screen and (max-width: 780px) {
    padding-top: 0 !important;
  }
}
// h4 {
//   text-align: center;
//   padding: 8px;
// }
.stats-row {
  justify-content: center;
  width: 100%;
  margin: auto;
}
.v-list-item__content {
  @media screen and (max-width: 780px) {
    padding: 0;
  }
}
.v-list-item__subtitle {
  font-weight: 900;
  font-size: 20px;
}
.v-card {
  margin: 8px;
  text-align: center;
  border: 1px solid rgba(white, 0.3) !important;
  background-color: rgba(#2e2e2e, 0.8);
  @media screen and (max-width: 780px) {
    margin: 4px;
  }
}
h4 {
  text-align: center;
  //font-size: 1rem;
  padding-top: 5px !important;
  padding-bottom: 5px;
  @media screen and (max-width: 780px) {
    padding-top: 0 !important;
  }
}
.v-list-item {
  @media screen and (max-width: 780px) {
    padding: 0 12px;
  }
}
.v-list-item__title {
  @media screen and (max-width: 780px) {
    font-size: 13px;
  }
}
.col-6 {
  padding: 0px;
}
.col {
  @media screen and (max-width: 780px) {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
  }
}
.active-cases {
  margin-bottom: 10px;
}
.center-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.chartContainer {
  margin: 30px 0;
  width: 100%;
  position: relative;
  //background-color: rgba(#2e2e2e, 0.8);
  padding: 8px 1.5%;
  border-radius: 8px;
  //border: 1px solid rgba(white, 0.2);
  @media screen and (max-width: 780px) {
    margin-top: 8px;
    margin-bottom: 0;
  }
}
</style>

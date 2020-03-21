<template>
  <v-app dark>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-navigation v-model="bottomNav" :fixed="true">
      <v-btn value="recent" to="/">
        <span>Chart</span>
        <v-icon>mdi-chart-bell-curve</v-icon>
      </v-btn>

      <v-btn value="favorites" to="/tips">
        <span>Learn</span>
        <v-icon>mdi-safety-goggles</v-icon>
      </v-btn>

      <!-- <v-btn value="nearby">
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn> -->
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: 'recent'
    }
  },
  created() {
    // this.$axios({
    //   method: 'get',
    //   url: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php`,
    //   headers: {
    //     'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
    //     'x-rapidapi-key': process.env.COVID_19_STATS_API_KEY
    //   }
    // })
    //   .then((res) => {
    //     // console.log(res)
    //     this.$store.commit('setCasesByCountry', res.data.countries_stat)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    this.$axios({
      method: 'get',
      url: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=South%20Africa`,
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': process.env.COVID_19_STATS_API_KEY
      }
    })
      .then((res) => {
        // console.log(res)
        this.$store.commit('setHistoryByCountry', res.data.stat_by_country)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss">
html {
  overflow: auto;
}
.v-bottom-navigation {
  a {
    height: 100% !important;
  }
}
</style>

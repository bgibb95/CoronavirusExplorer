<template>
  <v-app dark>
    <div class="bg"></div>
    <v-content>
      <v-container class="main-container">
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
    this.$store.dispatch('fetchCasesByCountry')
    this.$store.dispatch('fetchAffectedCountries')
  }
}
</script>

<style lang="scss">
html {
  overflow: auto;
}
.main-container {
  padding-bottom: 80px;
  //max-width: 95vw;
}
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  filter: opacity(0.1);
}
.v-bottom-navigation {
  a {
    height: 100% !important;
  }
}
</style>

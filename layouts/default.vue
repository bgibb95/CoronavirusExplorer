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
    this.$store.dispatch('fetchRandomMaskUsageInstructions')
  }
}
</script>

<style lang="scss">
html {
  overflow: auto;
}
.main-container {
  padding-bottom: 65px;
  //max-width: 95vw;
  opacity: 0;
  animation: fade-in 0.6s ease 0.3s forwards 1;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
.page-enter {
  opacity: 0;
}

.page-leave-active {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s cubic-bezier(0.89, 0.08, 0.69, 1);
}
</style>

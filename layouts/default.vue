<template>
  <v-app dark>
    <div class="bg"></div>
    <v-content>
      <v-container class="main-container">
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-navigation :fixed="true">
      <v-btn to="/">
        <span>Chart</span>
        <v-icon>mdi-chart-bell-curve</v-icon>
      </v-btn>

      <v-btn to="/stats">
        <span>Stats</span>
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>

      <v-btn to="/learn">
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
      // bottomNav: 'recent'
    }
  },
  created() {
    this.$store.dispatch('fetchCasesByCountry')
    this.$store.dispatch('fetchAffectedCountries')
    this.$store.dispatch('fetchLatestStatByCountry')
    this.$store.dispatch('fetchRandomMaskUsageInstructions')
    this.$store.dispatch('fetchWorldTotalStat')
  }
}
</script>

<style lang="scss">
html {
  overflow: auto;
}
.v-content__wrap {
  display: flex;
}
.v-application--wrap {
  perspective: 1000px;
  overflow: hidden;
}
.label {
  text {
    fill: white;
  }
}
.v-text-field__details {
  display: none !important;
}
.active-line {
  stroke: #42a5f5 !important;
  stroke-width: 2;
  opacity: 1;
}
text {
  font-size: 14px !important;
}
.active-cases {
  .stroke {
    //stroke: #f44336;
    stroke-width: 2;
    //stroke: #ffffff;
  }
  .fill {
    fill: #fff9f9;
    opacity: 0.1;
  }
  .point {
    fill: #ffffff;
    //stroke: #ffffff;
    // opacity: 0.9;
    stroke-width: 1.5;
    //stroke: #f44336;
  }
}
.main-container {
  padding-bottom: 70px;
  //max-width: 95vw;
  opacity: 0;
  align-self: center;
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
  filter: opacity(0.2);
  animation: move 60s ease infinite;
}
@keyframes move {
  0% {
    transform: rotateX(0);
  }
  50% {
    transform: rotateX(20deg) scale(1.5) translateY(50px);
  }
  100% {
    transform: rotateX(0);
  }
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
  transition: all 0.19s ease;
}
</style>

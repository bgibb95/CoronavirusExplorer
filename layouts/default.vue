<template>
  <div>
    <div class="bg"></div>
    <v-app dark>
      <v-app-bar dense dark app hide-on-scroll>
        <v-icon size="large" class="px-1">mdi-lighthouse-on</v-icon>
        <h4 class="main-title">Coronavirus Explorer</h4>
      </v-app-bar>
      <v-content>
        <v-container class="main-container" :style="{ height: pageHeight }">
          <nuxt />
        </v-container>
      </v-content>
      <v-bottom-navigation :fixed="true" app hide-on-scroll grow>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // bottomNav: 'recent'
    }
  },
  computed: {
    ...mapState({
      pageHeight: (state) => state.pageHeight + 'px'
    })
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
// @import '~vuetify/src/styles/styles.sass';
// @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
//$body-font-family: 'Montserrat' !important;
$body-font-family: 'Poppins';

.v-application {
  font-family: $body-font-family, 'Roboto', sans-serif !important;
  //font-family: $body-font-family;
  //letter-spacing: 1px !important;
}
h4 {
  font-weight: 100;
  font-family: $body-font-family;
  font-size: 0.95rem !important;
}
.main-title {
  font-weight: 500;
  font-family: $body-font-family;
}
.page-container {
  //display: flex;
  //align-content: center;
  position: absolute;
  padding: 15px 12px;
  //padding-bottom: 15px;
  width: 100%;
  //height: 100%;
  //top: 50%;
  //transform: translateY(-50%);
  left: 0;
  @media screen and (max-width: 780px) {
    padding: 5px 12px 15px;
  }
}
.row {
  @media screen and (max-width: 780px) {
    width: 100%;
  }
}
html {
  overflow: auto;
  background: #121212;
}
.v-content__wrap {
  display: flex;
}
.v-application--wrap {
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
  position: relative;
  width: 100vw;
  height: 100%;
  //padding-bottom: 70px;
  //max-width: 95vw;
  //opacity: 0;
  //align-self: center;
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
  filter: blur(1px);
  opacity: (0.15);
  animation: move 20s ease infinite;
}
@keyframes move {
  0% {
    transform: rotateX(0);
  }
  50% {
    transform: rotateX(0deg) scale(1.1) translateY(0px);
  }
  100% {
    transform: rotateX(0);
  }
}

.v-bottom-navigation {
  height: 52px !important;
  a {
    font-family: $body-font-family;
    height: 100% !important;
    font-weight: 300 !important;
    font-size: 10px !important;
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

.slide-left-enter {
  transform: translateX(-120%);
}

.slide-left-leave-active {
  transform: translateX(120%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease;
}

.slide-right-enter {
  transform: translateX(120%);
}

.slide-right-leave-active {
  transform: translateX(-120%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease;
}
</style>

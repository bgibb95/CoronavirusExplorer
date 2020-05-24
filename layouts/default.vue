<template>
  <div>
    <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gradientFill" x1="1" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#fff9f9" />
          <stop offset="100%" stop-opacity="0.1" stop-color="#ffffff" />
        </linearGradient>
      </defs>
    </svg>
    <transition name="fade">
      <div class="bg"></div>
    </transition>
    <v-app dark>
      <v-app-bar dense dark app hide-on-scroll>
        <v-icon class="px-1">{{ mdiLighthouseOn }}</v-icon>
        <h4 class="main-title">Coronavirus Explorer</h4>
        <v-spacer></v-spacer>
        <v-btn icon class="add-button">
          <v-icon>{{ mdiFileDownloadOutline }}</v-icon>
        </v-btn>

        <v-menu v-if="$nuxt.$route.name === 'index'" bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>{{ mdiDotsVertical }}</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" @click="filterHistory(item.all)">
              <v-list-item-title>
                <b v-if="item.all === showAllHistory">{{ item.title }}</b>
                <span v-else>{{ item.title }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-content>
        <v-container class="main-container" :style="{ height: pageHeight }">
          <nuxt />
        </v-container>
      </v-content>

      <v-bottom-navigation :fixed="true" app hide-on-scroll grow>
        <v-btn to="/">
          <span>Chart</span>
          <v-icon>{{ mdiChartBellCurve }}</v-icon>
        </v-btn>
        <v-btn to="/stats">
          <span>Stats</span>
          <v-icon>{{ mdiNotebookOutline }}</v-icon>
        </v-btn>
        <v-btn to="/learn">
          <span>Learn</span>
          <v-icon>{{ mdiSafetyGoggles }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <a class="credit" href="https://www.freepik.com/free-photos-vectors/health" target="_blank"
        >Image provided by pikisuperstar</a
      >
    </v-app>
  </div>
</template>

<script>
import {
  mdiChartBellCurve,
  mdiNotebookOutline,
  mdiSafetyGoggles,
  mdiFileDownloadOutline,
  mdiLighthouseOn,
  mdiDotsVertical
} from '@mdi/js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      mdiChartBellCurve,
      mdiNotebookOutline,
      mdiSafetyGoggles,
      mdiFileDownloadOutline,
      mdiLighthouseOn,
      mdiDotsVertical,
      items: [
        { title: 'Recent history', all: false },
        { title: 'All history', all: true }
      ]
      // backgroundURL: null
      // bottomNav: 'recent'
    }
  },
  computed: {
    ...mapState({
      pageHeight: (state) => state.pageHeight + 'px',
      showAllHistory: (state) => state.showAllHistory
    })
  },
  created() {
    this.$store.dispatch('fetchCasesByCountry')
    this.$store.dispatch('fetchAffectedCountries')
    this.$store.dispatch('fetchLatestStatByCountry')
    this.$store.dispatch('fetchWorldTotalStat')
    this.$store.dispatch('fetchRandomMaskUsageInstructions')
  },
  mounted() {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    // if (process.client) {
    //   const imageFormat = this.canUseWebP() ? '.webp' : '.jpg'
    //   this.backgroundURL = require(`~/assets/background${imageFormat}`)
    // }
    this.maybeinstallApp()
  },
  methods: {
    filterHistory(showAll) {
      if (showAll !== this.showAllHistory) {
        this.$store.commit('setShowAllHistory', showAll)
        this.$store.commit('setHistoryByCountry')
      }
    },
    maybeinstallApp() {
      let deferredPrompt
      const addBtn = document.querySelector('.add-button')
      addBtn.style.display = 'none'

      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        // Stash the event so it can be triggered later.
        deferredPrompt = e
        // Update UI to notify the user they can add to home screen
        addBtn.style.display = 'block'

        addBtn.addEventListener('click', () => {
          // hide our user interface that shows our A2HS button
          addBtn.style.display = 'none'
          // Show the prompt
          deferredPrompt.prompt()
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt')
              addBtn.style.display = 'none'
            } else {
              console.log('User dismissed the A2HS prompt')
            }
            deferredPrompt = null
          })
        })
      })
    },
    canUseWebP() {
      const elem = document.createElement('canvas')

      if (elem.getContext && elem.getContext('2d')) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
      }

      // very old browser like IE 8, canvas not supported
      return false
    }
  }
}
</script>

<style lang="scss">
.v-card {
  //background-color: #1e1e1e !important;
  border: none !important;
  background-color: rgba(#2e2e2e, 1) !important;
  border-radius: 8px !important;
}
.credit {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 100;
  font-size: 10px;
  text-decoration: none;
  color: white !important;

  @media screen and (max-width: 780px) {
    display: none;
  }
}
.v-input {
  background-color: rgba(#2e2e2e, 1);
  //background-color: #1e1e1e !important;
  border: 0px solid rgba(white, 0.7);
  border-bottom-left-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
  //border-radius: 25px !important;
}
// .v-input__slot:before {
//   border: none !important;
// }
// .v-input__slot:after {
//   border-radius: 25px !important;
//   //width: 80% !important;
//   //left: 10% !important;
// }
// @import '~vuetify/src/styles/styles.sass';
// @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
//$body-font-family: 'Montserrat' !important;
.add-button {
  display: none;
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
  padding: 12px;
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
  overflow: auto !important;
  background: #2e2e2e;
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
.line {
  stroke: #121212 !important;
  opacity: 0.3;
}
.active-line {
  stroke: #42a5f5 !important;
  stroke-width: 3;
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
    fill: url(#gradientFill);
    //fill: #fff9f9;
    opacity: 0.7;
    //fill: #eef0ed;
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
  background-image: url('../assets/2.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  //filter: brightness(50%);
  //opacity: (1);
  //animation: move 50s ease infinite;
  @media screen and (max-width: 780px) {
    //opacity: (0.15);
    filter: blur(0px);
  }
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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

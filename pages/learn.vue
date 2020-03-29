<template>
  <div class="page-container learn-page">
    <v-layout column justify-center align-center>
      <!-- <v-row><v-card-title class="justify-center">COVID-19 Tracker</v-card-title></v-row> -->
      <v-flex xs12 sm8 md6>
        <div class="text-center"></div>
        <v-card>
          <h4 class="my-3 text-center">Information and safety</h4>
          <v-card-text>
            <div class="my-3">
              <v-btn
                :block="true"
                value="recent"
                target=":blank"
                href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
              >
                <!-- <v-icon left>mdi-hospital-building</v-icon> -->
                <span>Health Advice</span>
                <v-icon right>mdi-open-in-new</v-icon>
                <!-- <v-icon>mdi-chart-bell-curve</v-icon> -->
              </v-btn>
            </div>

            <div class="my-3">
              <v-btn
                :block="true"
                value="recent"
                target=":blank"
                outlined=""
                href="https://www.who.int/health-topics/coronavirus"
              >
                <!-- <v-icon left>mdi-pencil</v-icon> -->
                <span>What is the Coronavirus?</span>
                <v-icon right>mdi-open-in-new</v-icon>
                <!-- <v-icon>mdi-chart-bell-curve</v-icon> -->
              </v-btn>
            </div>

            <div class="my-3">
              <v-btn :block="true" value="recent" target=":blank" href="https://www.worldometers.info/coronavirus/">
                <!-- <v-icon left>mdi-format-list-numbered</v-icon> -->
                <span>Statistics</span>
                <v-icon right>mdi-open-in-new</v-icon>
                <!-- <v-icon>mdi-chart-bell-curve</v-icon> -->
              </v-btn>
            </div>
          </v-card-text>

          <div v-if="maskUsageImage" class="image-container">
            <h4 class="my-3 text-center">Mask usage tip</h4>
            <img v-if="maskUsageImage" :src="maskUsageImage" alt="" />
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transition(to, from) {
    if (!from) {
      return 'slide-right'
    }
    // if (to.name === 'index') {
    //   return 'slide-left'
    // }
    // if (to.name === 'stats') {
    //   return 'slide-left'
    // }
    return 'slide-right'
  },
  mounted() {
    const element = document.querySelector('.learn-page')
    // eslint-disable-next-line no-new, no-undef
    new ResizeSensor(element, () => {
      this.$store.commit('setPageHeight', element.offsetHeight + 10)
    })
  },
  computed: {
    ...mapState({
      maskUsageImage: (state) => state.maskUsageImage
    })
  }
}
</script>

<style lang="scss" scoped>
.row {
  @media screen and (max-width: 780px) {
    align-self: flex-start;
  }
}
.v-card__title {
  //font-size: 1rem;
  @media screen and (max-width: 780px) {
    padding-top: 0 !important;
  }
}
.v-card__text {
  padding-top: 2px;
  padding-bottom: 2px;
}
.v-card {
  //height: 100% !important;
  display: inline-block;
  border: 1px solid rgba(white, 0.3);
  background-color: rgba(#2e2e2e, 0.8);
}
span {
  font-size: 0.75rem !important;
}
a {
  border: 1px solid rgba(white, 0.3) !important;
}
.image-container {
  max-width: 250px;
  //background: yellow;
  //height: 200px;
  display: block;
  margin: 0px auto 20px;

  img {
    width: 100%;
    border-radius: 4px;
    border: 1px solid rgba(white, 0.3);
  }
}
</style>

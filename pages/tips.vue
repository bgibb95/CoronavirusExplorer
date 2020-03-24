<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center"></div>
      <v-card>
        <v-card-title class="justify-center">Information and Safety Tips</v-card-title>
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
              href="https://www.who.int/health-topics/coronavirus"
            >
              <!-- <v-icon left>mdi-pencil</v-icon> -->
              <span>What is the Coronavirus?</span>
              <v-icon right>mdi-open-in-new</v-icon>
              <!-- <v-icon>mdi-chart-bell-curve</v-icon> -->
            </v-btn>
          </div>

          <div class="my-3">
            <v-btn
              :block="true"
              value="recent"
              target=":blank"
              href="https://www.worldometers.info/coronavirus/"
            >
              <!-- <v-icon left>mdi-format-list-numbered</v-icon> -->
              <span>Statistics</span>
              <v-icon right>mdi-open-in-new</v-icon>
              <!-- <v-icon>mdi-chart-bell-curve</v-icon> -->
            </v-btn>
          </div>
        </v-card-text>

        <div class="image-container">
          <img v-if="maskUsageImage" :src="maskUsageImage" alt="" />
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      maskUsageImage: (state) => state.maskUsageImage
    })
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  //height: 100% !important;
  display: inline-block;
}
.image-container {
  max-width: 250px;
  //background: yellow;
  //height: 200px;
  display: block;
  margin: 20px auto;

  img {
    width: 100%;
    border-radius: 4px;
  }
}
</style>

<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center"></div>
      <v-card>
        <v-card-title class="justify-center"
          >Information and Safety Tips</v-card-title
        >
        <v-card-text>
          <div class="my-2">
            <v-btn
              :block="true"
              value="recent"
              target=":blank"
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
            >
              <span>Health Advice</span>
              <!-- <v-icon>mdi-chart-bell-curve</v-icon> -->
            </v-btn>
          </div>

          <div class="my-2">
            <v-btn
              :block="true"
              value="recent"
              target=":blank"
              href="https://www.who.int/health-topics/coronavirus"
            >
              <span>What is the Coronavirus?</span>
              <!-- <v-icon>mdi-chart-bell-curve</v-icon> -->
            </v-btn>
          </div>

          <div class="my-2">
            <v-btn
              :block="true"
              value="recent"
              target=":blank"
              href="https://www.worldometers.info/coronavirus/"
            >
              <span>Statistics</span>
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

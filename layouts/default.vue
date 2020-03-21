<template>
  <v-app dark>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-navigation v-model="bottomNav" :absolute="true">
      <v-btn value="recent" to="/">
        <span>Chart</span>
        <v-icon>mdi-chart-bell-curve</v-icon>
      </v-btn>

      <v-btn value="favorites" to="/tips">
        <span>Tips</span>
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
  }
}
</script>

<style lang="scss">
html {
  overflow: auto;
}
</style>

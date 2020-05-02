import colors from 'vuetify/es5/util/colors'

export default {
  env: {
    COVID_19_STATS_API_KEY: process.env.COVID_19_STATS_API_KEY
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'Coronavirus Explorer',
    title: 'Coronavirus Explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#212121' },
      {
        hid: 'description',
        name: 'description',
        content: 'A web app to view statistics and learn information regarding the Coronavirus / COVID-19'
      },
      { hid: 'og:image', name: 'og:image', content: '../icon.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Poppins&display=swap'
      }
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'
      // }
    ],
    script: [
      {
        src: '../scripts/ResizeSensor.min.js'
      }
    ]
  },

  server: {
    port: 8000, // default: 3000
    host: '10.0.0.102' // default: localhost
  },

  transition: {
    mode: ''
  },

  router: {
    base: process.env.NODE_ENV === 'development' ? '' : '/NuxtCovid19Tracker/'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#EF2768' }, // #9AC633
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-trend-chart.js', { src: '~/plugins/ga.js', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true,
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  pwa: {
    manifest: {
      name: 'Coronavirus Explorer',
      short_name: 'Coronavirus Explorer',
      background_color: '#212121',
      description: 'A web app to track statistics of the Coronavirus (COVID-19)'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  }
}

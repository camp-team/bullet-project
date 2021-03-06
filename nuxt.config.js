import colors from 'vuetify/es5/util/colors'
import webpack from 'webpack'

require('dotenv').config()
const { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY } = process.env

const title = 'from 8号車'
const description = '8号車の、8号車による、8号車のためだけの投稿サイトです。'
const url = process.env.BASE_URL
const ogImage = `${url}/ogp.jpg`

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:image', property: 'og:image', content: ogImage },
      { hid: 'og:site_name', property: 'og:site_name', content: title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [{ src: '~/assets/scss/main.scss', lang: 'scss' }],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/firebase.js' },
    { src: '~/plugins/auth.js' },
    { src: '~/plugins/post.js' },
    { src: '~/plugins/vue-masonry.js', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/dotenv',
      {
        filename:
          process.env.NODE_ENV !== 'production' ? './.env.dev' : './.env.prod',
      },
    ],
    // https://github.com/nuxt-community/analytics-module
    ['@nuxtjs/google-analytics', { id: 'UA-183488179-1' }],
    '@nuxtjs/date-fns',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: 'fa',
    },
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
      }),
    ],
  },

  target: 'static',

  env: {
    ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_KEY,
  },
}

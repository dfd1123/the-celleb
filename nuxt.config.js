import routes from './router'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '더셀럽',
    htmlAttrs: {
      lang: 'kr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '인플루언서 매칭 플랫폼, 더셀럽' },
      { hid: 'image', name: 'image', content: '/images/thecelleb-main.jpg' },
      { hid: 'og:title', property: 'og:title', content: '더셀럽' },
      { hid: 'og:description', property: 'og:description', content: '인플루언서 매칭 플랫폼, 더셀럽' },
      { hid: 'og:image', property: 'og:image', content: '/images/thecelleb-main.jpg' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/less/celleb.less'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/persistedState' },
    { src: '@/plugins/dialogNModal', mode: 'client' },
    { src: '@/plugins/toast' },
    { src: '@/plugins/api' },
    { src: '@/plugins/validation' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    middleware: ['auth'],
    extendRoutes: routes
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    'v-wave/nuxt'
  ],
  styleResources: {
    less: ['~/assets/less/fonts.less']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // vendor: ['babel-polyfill'],
    // babel: {
    //   presets: [
    //     ['@nuxtjs/babel-preset-app', {
    //       targets: { ie: 11 }
    //     }]
    //   ]
    // }
  }
}

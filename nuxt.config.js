import routes from './router'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'the-celleb',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
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
    { src: '@/plugins/dialogNModal', mode: 'client' },
    { src: '@/plugins/toast', mode: 'client' },
    { src: '@/plugins/validation' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    middleware: [],
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
    less: ['~/assets/less/reset.less', '~/assets/less/fonts.less']
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

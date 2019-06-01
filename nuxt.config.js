const autoprefixer = require('autoprefixer')
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    htmlAttrs: {
      lang: 'pl-PL'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'application-name', content: 'element-pinball' },
      // { name: 'msapplication-TileColor', content: '#FFFFFF' },
      // { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },
      // { name: 'msapplication-square70x70logo', content: '/mstile-70x70.png' },
      // { name: 'msapplication-square150x150logo', content: '/mstile-150x150.png' },
      // { name: 'msapplication-square310x310logo', content: '/mstile-310x310.png' },
      // { name: 'msapplication-wide310x150logo', content: '/mstile-310x150.png' },
      { name: 'theme-color', content: '#FFFFFF' },
      { hid: 'og:type', property: 'og:type', content: 'website' }
    ],
    link: [
      // { rel: 'apple-touch-icon-precomposed', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
      // { rel: 'apple-touch-icon-precomposed', sizes: '60x60', href: '/apple-touch-icon-60x60.png' },
      // { rel: 'apple-touch-icon-precomposed', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
      // { rel: 'apple-touch-icon-precomposed', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
      // { rel: 'apple-touch-icon-precomposed', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
      // { rel: 'apple-touch-icon-precomposed', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
      // { rel: 'apple-touch-icon-precomposed', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
      // { rel: 'apple-touch-icon-precomposed', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
      // { rel: 'icon', type: 'image/png', sizes: '196x196', href: '/favicon-196x196.png' },
      // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      // { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      // { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/favicon-128.png' },
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/oai3nmn.css' }
    ],
    script: [
      { src: '/js/poly-decomp.min.js', body: true }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/sass/_reset.scss',
    '@/assets/sass/_main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/service',
    '~plugins/components',
    '~plugins/axios',
    { src: '~plugins/100vh', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',

    /* ['@nuxtjs/pwa', {
      manifest: {
        'short_name': 'ELEMENT-PINBALL',
        'name': 'ELEMENT-PINBALL',
        'start_url': '/',
        'display': 'fullscreen',
        'theme_color': '#FFFFFF',
        'background_color': '#FFFFFF'
      },
      icon: {
        iconSrc: '~static/favicon-196x196.png'
      }
    }], */
  ],

  /*
  ** Style resources module configuration
  */
  styleResources: {
    scss: [
      '@/assets/sass/_vars.scss',
      '@/assets/sass/_mixins.scss',
      '@/assets/sass/_typography.scss'
    ]
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: [
      autoprefixer({ grid: true })
    ],

    html: {
      minify: false
    },

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    /*
    ** Enables Common CSS Extraction
    */
    extractCSS: true
  }
}

export default {
  ssr: false,
  head: {
    title: 'nuxt-pns',
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

  plugins: [
  ],

  components: true,

  
  buildModules: [
    '@nuxtjs/tailwindcss', 
  ],
  css: [
    
  ],

  router: {
    middleware: ['auth']  
  },

  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],
  axios: {
    baseURL: 'http://127.0.0.1:8000/api', 
    credentials: true,
  },


  build: {
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
  }
}

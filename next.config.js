const { i18n } = require('./next-i18next.config')
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  // scope: '/coins',
})

const settings = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  experimental: {
    // for liara services in production
    outputStandalone: true,
  },
}

module.exports = withPWA(settings)

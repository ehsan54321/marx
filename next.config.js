const { i18n } = require('./next-i18next.config')
const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
})

/**
 * @type {import('next').NextConfig}
 */

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

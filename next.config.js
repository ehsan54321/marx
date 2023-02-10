const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // scope: '/coins',
})

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
})

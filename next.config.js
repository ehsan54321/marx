const withPWA = require('next-pwa')({
  dest: 'public',
  // scope: '/coins',
})

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
})

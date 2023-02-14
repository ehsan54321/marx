const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  // scope: '/coins',
})

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
})

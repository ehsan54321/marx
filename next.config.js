const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  // scope: '/coins',
})

const settings = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports =
  process.env.NODE_ENV === 'development' ? settings : withPWA(settings)

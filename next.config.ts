/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next'
const { i18n } = require('./next-i18next.config')
const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
})

const nextConfig: NextConfig = {
    turbopack: {},
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  experimental: {
    // for liara services in production
    outputStandalone: true,
  },
}

export default  withPWA(nextConfig)

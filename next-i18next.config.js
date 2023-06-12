/* eslint-disable */
const path = require('path')

const locales = require('./lib/locales')
module.exports = {
  i18n: {
    locales: locales.map((l) => l.code),
    defaultLocale: 'fa',
    localeDetection: false,
    localePath: path.resolve('./util/locales'),
  },
}

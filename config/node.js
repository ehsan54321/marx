//    PU => production url
const PU = 'https://marx.iran.liara.run/'
const baseURL =
  process.env.NODE_ENV === 'production' ? PU : 'http://localhost:3000/'

module.exports = baseURL

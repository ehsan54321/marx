const a1 = 'https://marx.iran.liara.run/'
const a2 = 'https://marx.onfing.ir/'
const baseURL =
  process.env.NODE_ENV === 'production' ? a1 : 'http://localhost:3000/'

module.exports = baseURL

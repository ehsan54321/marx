const a1 = 'https://me-app.iran.liara.run/'
const a2 = 'https://my-app.onfing.ir/'
const baseURL =
  process.env.NODE_ENV === 'production' ? a1 : 'http://localhost:3000/'

module.exports = baseURL

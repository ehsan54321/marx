const a1 = 'https://my-app.onfing.ir/'
const a2 = 'https://me-app.iran.liara.run/'
const baseURL =
  process.env.NODE_ENV === 'production' ? a2 : 'http://localhost:3000/'

module.exports = baseURL

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.BASEURL
    : process.env.DEV_BASEURL

module.exports = baseURL

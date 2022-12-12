export const baseURL: string =
  process.env.NODE_ENV === 'production'
    ? process.env.BASEURL
    : process.env.DEV_BASEURL

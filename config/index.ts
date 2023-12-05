//    PU => production url
const PU: string = 'https://marx.iran.liara.run/'
export const baseURL: string =
  process.env.NODE_ENV === 'production' ? PU : 'http://localhost:3000/'

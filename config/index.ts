const a1: string = 'https://marx.iran.liara.run/'
const a2: string = 'https://marx.onfing.ir/'
export const baseURL: string =
  process.env.NODE_ENV === 'production' ? a1 : 'http://localhost:3000/'

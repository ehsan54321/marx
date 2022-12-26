const a1: string = 'https://me-app.iran.liara.run/'
const a2: string = 'https://my-app.onfing.ir/'
export const baseURL: string =
  process.env.NODE_ENV === 'production' ? a1 : 'http://localhost:3000/'

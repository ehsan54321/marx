const a1: string = 'https://my-app.onfing.ir/'
const a2: string = 'https://me-app.iran.liara.run/'
export const baseURL: string =
  process.env.NODE_ENV === 'production' ? a2 : 'http://localhost:3000/'

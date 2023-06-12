import axios from 'axios'
import { baseURL } from '@/config'

// axios config :
axios.defaults.baseURL = baseURL
// axios.defaults.headers.common['Accept-Encoding'] = 'application/json'

const http: { get; post; put } = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
}

export default http
// export const config = {
//   headers: {
//     'Accept-Encoding': 'application/json',
//   },
// }

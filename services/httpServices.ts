import axios from 'axios'
import { baseURL } from '@baseUrl'

// axios config :
axios.defaults.baseURL = baseURL

const http: any = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  create: axios.create,
}

export default http

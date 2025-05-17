import axios from "axios"

const instances = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})

instances.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {}
    config.headers["Access-Control-Allow-Origin"] = "*"

    return config
  },
  (error) => Promise.reject(error)
)

instances.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response) {
        const { response } = error
        if (response && response.status === 401) {
        } else {
          return Promise.reject(error)
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error", error)
      }
    } catch (e) {
      if (e?.response?.data?.error?.statusCode === 401) {
        console.log(e)
      }
    }

    return Promise.reject(error)
  }
)

export default instances

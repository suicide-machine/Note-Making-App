import axios from "axios"
import { server } from "./constants"

const axiosInstance = axios.create({
  baseURL: server,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token")

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstances

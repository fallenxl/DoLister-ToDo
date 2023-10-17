import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { getLocalStorageToken } from '../utils'

export const AxiosInterceptor = () => {
  const updateHeaders = (config: AxiosRequestConfig) => {
    const token = getLocalStorageToken()
    const newHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    config.headers = newHeaders
    return config
  }
  axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.url?.includes('login') || config.url?.includes('register')) {
      return config
    }
    return updateHeaders(config) as InternalAxiosRequestConfig
  })
}
import axios from 'axios'
import {API} from '../urls'

export default class Service {
  url

  /**
   * Service constructor
   * @param {string} url
   */
  constructor(url = API) {
    this.url = url
  }

  /**
   * Make http request
   * @param config
   * @return {AxiosPromise}
   */
  request(config) {
    return axios.request(config)
  }

  /**
   * Make http get request
   * @param url
   * @param config
   * @return {AxiosPromise}
   */
  get(url, config) {
    return axios.get(this.url + url, config)
  }

  /**
   * Make http delete request
   * @param url
   * @param config
   * @return {AxiosPromise}
   */
  delete(url, config) {
    return axios.delete(this.url + url, config)
  }

  /**
   * Make http head request
   * @param url
   * @param config
   * @return {AxiosPromise}
   */
  head(url, config) {
    return axios.head(this.url + url, config)
  }

  /**
   * Make http post request
   * @param url
   * @param data
   * @param config
   * @return {AxiosPromise}
   */
  post(url, data, config) {
    return axios.post(this.url + url, data, config)
  }

  /**
   * Make http put request
   * @param url
   * @param data
   * @param config
   * @return {AxiosPromise}
   */
  put(url, data, config) {
    return axios.put(this.url + url, data, config)
  }

  /**
   * Make http patch request
   * @param url
   * @param data
   * @param config
   * @return {AxiosPromise}
   */
  patch(url, data, config) {
    return axios.patch(this.url + url, data, config)
  }
}

import axios from 'axios'

export class Api {
  #axios;

  constructor (baseURL) {
    this.#axios = axios.create({ baseURL })
    this.#axios.interceptors.request.use((config) => {
      config.headers['Content-Type'] = 'application/json'
      config.headers.Pragma = 'no-cache'
      config.headers.Expires = -1
      return config
    })
  }

  #responseHandler = promise => new Promise((resolve, reject) => {
    promise
      .then((response) => {
        resolve(response.data)
      })
      .catch((e) => {
        reject(e)
      })
  });

  get (url, params = {}, config = {}) {
    return this.#responseHandler(this.#axios.get(url, params))
  }

  post (url, data, config = {}) {
    return this.#responseHandler(this.#axios.post({ url, data, ...config }))
  }

  put (url, data, config) {
    return this.#responseHandler(this.#axios.put({ url, data, ...config }))
  }

  delete (url, data, config) {
    return this.#responseHandler(this.#axios.delete({ url, data, ...config }))
  }
}

export default ({ app }, inject) => {
  app.$api = new Api('http://localhost:3002')

  inject('api', app.$api)
}

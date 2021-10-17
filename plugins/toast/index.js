import Vue from 'vue'
import ToastContainer from './components/ToastContainer'

export default ({ app }, inject) => {
  const getContainer = (c) => {
    const toastHolder = c.$root

    if (!toastHolder._toastContainer) {
      toastHolder._toastContainer = new (Vue.extend(ToastContainer))({ parent: toastHolder })
      toastHolder._toastContainer.$mount()
      toastHolder.$el.appendChild(toastHolder._toastContainer.$el)
    }
    return toastHolder._toastContainer
  }

  /**
     * @param {string|string[]} message
     * @param {{translate?: boolean, type?: 'success'|'fail', dura?: number}?} options
     * @returns {void}
     */
  app.$toast = function (message, { type, dura } = {}) {
    if (typeof window === 'undefined') { return }
    getContainer(this).toast(message, { type, dura })
  }

  inject('toast', app.$toast)
}

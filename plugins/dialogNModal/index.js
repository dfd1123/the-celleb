import Vue from 'vue'
import DialogContainer from './components/DialogContainer'
import ModalContainer from './components/ModalContainer'
import Confirm from './components/Confirm'
import Alert from './components/Alert'
import Prompt from './components/Prompt'

export default ({ app }, inject) => {
  const getContainer = (c, type = 'modal') => {
    let mdHolder = c

    const MdContainer = Vue.extend(
      type === 'dialog' ? DialogContainer : ModalContainer
    )

    while (mdHolder.$parent) {
      if (!mdHolder.$parent) { break }
      mdHolder = mdHolder.$parent
    }

    if (!mdHolder[`_${type}Container)`]) {
      mdHolder[`_${type}Container)`] = new MdContainer({
        parent: mdHolder
      })
      mdHolder[`_${type}Container)`].$mount()
      mdHolder.$el.appendChild(mdHolder[`_${type}Container)`].$el)
    }

    document.body.classList.add('pulldown-disable')
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    return mdHolder[`_${type}Container)`]
  }

  const validation = (params) => {
    if (
      (typeof params !== 'object' && typeof params !== 'string') ||
      Array.isArray(params)
    ) {
      let caughtType = typeof params
      if (Array.isArray(params)) { caughtType = 'array' }

      throw new Error(
        `Options type must be an object. Caught: ${caughtType}. Expected: object`
      )
    } else if (typeof params === 'string') {
      return {
        message: params
      }
    }

    return params
  }

  const callBackFunc = (result) => {
    document.body.classList.remove('pulldown-disable')
    document.body.style.overflow = null
    document.body.style.touchAction = null
    return result
  }

  const handlingDialog = async (params, occurComponent, createComponent) => {
    params = validation(params)

    if (typeof params === 'object') {
      return await getContainer(occurComponent, 'dialog')
        .add(createComponent, params)
        .then(callBackFunc)
    }
  }

  app.$confirm = async function (params) {
    return await handlingDialog(params, this, Confirm)
  }

  app.$alert = async function (params) {
    return await handlingDialog(params, this, Alert)
  }

  app.$prompt = async function (params) {
    return await handlingDialog(params, this, Prompt)
  }

  app.$modal = function (component, options) {
    return getContainer(this).add(component, options).then(callBackFunc)
  }

  inject('confirm', app.$confirm)
  inject('alert', app.$alert)
  inject('prompt', app.$prompt)
  inject('modal', app.$modal)
}

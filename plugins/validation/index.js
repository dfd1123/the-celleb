import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import ValidationErrors from '@/plugins/validation/components/ValidationErrors'
import { getCharLength, getByteLength } from '@/utils/commonUtils'

const required = {
  validate: (value, option) => {
    const allowFalse = (option || { allowFalse: true }).allowFalse
    const result = { valid: false, required: true }
    if (value === null || value === undefined) { return result }
    if (Array.isArray(value) && value.length === 0) { return result }
    if (value === false && !allowFalse) { return result }
    result.valid = !!String(value).trim().length
    return result
  },
  computesRequired: true
}

const email = value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)

const init = () => {
  const rules = {
    required,
    requiredNoname: required,
    requiredSelect: required,
    byteLength: {
      params: ['min', 'max'],
      validate: (value, { min, max }) => getByteLength(value) >= min && getByteLength(value) <= max
    },
    charLength: {
      params: ['min', 'max'],
      validate: (value, { min, max }) => getCharLength(value) >= min && getCharLength(value) <= max
    },
    charLengthMin: {
      params: ['min'],
      validate: (value, { min }) => getCharLength(value) >= min
    },
    charLengthMax: {
      params: ['max'],
      validate: (value, { max }) => getCharLength(value) <= max
    },
    correctLength: {
      params: ['length'],
      validate: (value, { length }) => value.length === Number(length)
    },
    length: {
      params: ['min', 'max'],
      validate: (value, { min, max }) => value.length >= min && value.length <= max
    },
    lengthMin: {
      params: ['min'],
      validate: (value, { min }) => value.length >= min
    },
    lengthMax: {
      params: ['max'],
      validate: (value, { max }) => value.length <= max
    },
    minMax: {
      params: ['min', 'max'],
      validate: (value, { min, max }) => parseInt(value, 10) >= parseInt(min, 10) && parseInt(value, 10) <= parseInt(max, 10)
    },
    confirm: {
      params: ['target'],
      validate: (value, { target }) => value === target
    },
    afterDate: {
      params: ['startTime'],
      validate: (value, { startTime }) => value > 0 && startTime > 0 && value > startTime
    },
    selectedImage: {
      params: ['key'],
      validate: (value, { key }) => value[key] && value[key].length > 0
    },
    notEqual: {
      params: ['other'],
      validate: (value, { other }) => value !== other
    },
    includeAlphabet: value => /[a-zA-Z]/.test(value),
    includeNumber: value => /[0-9]/.test(value),
    includeSpecial: value => /[`~!@#$%^&*()\-_=+|\\<>.,/?:;'"[\]{}]/.test(value),
    alphaDash: value => /^[a-zA-Z0-9_-]+$/.test(value),
    password: value => /^[a-zA-Z0-9`~!@#$%^&*()\-_=+|\\<>.,/?:;'"[\]{}]*$/.test(value),
    email,
    byEmail: email,
    url: value => /^https?:\/\//i.test(value),
    verificationCode: value => /^[A-Z0-9]+$/.test(value),
    nickname: value => /^[a-zA-Z0-9_]+$/.test(value),
    nicknameRegistered: value => value !== '더셀럽대박',
    isPhoneNumber: value => /^\+(?=(?:\s?\d){7,17}$)\d+(?:\s?\d+){0,3}$/.test(value),
    summonerName: value => /^[0-9a-zA-Z \u3131-\u314E\u314F-\u3163\uAC00-\uD7A3]+$/.test(value),
    hanaCoupon: value => /^Q[0-9A-Z]{6,7}$/.test(value),
    hanaCouponTeam: value => /^T[0-9A-Z]{6,7}$/.test(value),
    kartRider: value => /^[A-Za-z0-9가-힣]+$/.test(value) && getCharLength(value) >= 4 && getCharLength(value) <= 12,
    kartRiderUid: value => /^[a-zA-Z0-9]{13}$/.test(value),
    randomToYou: value => /^[A-Z0-9]{7}$/.test(value),
    teamName: value => /^[a-zA-Z0-9-_.' ]+$/.test(value),
    timeRequired: value => value > 0,
    extraRequired: value => value.length > 0,
    sixPassword: value => (value.length === 0 || value.length === 6) && /^[0-9]+$/.test(value)
  }

  Object.keys(rules).forEach((type) => {
    let rule
    switch (typeof rules[type]) {
      case 'object':
        rule = rules[type]
        break
      case 'function':
        rule = { validate: rules[type] }
        break
      default:
        throw new Error(`[validate] invalid rule '${type}'`)
    }
    // console.log('TEST', rule)
    rule.message = (_, params) => params
    extend(type, rule)
  })
}

ValidationProvider.mixin({ props: { tag: { default: 'div' }, slim: { default: true } } })
ValidationObserver.mixin({ props: { tag: { default: 'fieldset' } } })
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationErrors', ValidationErrors)

export default ({ app }, inject) => {
  init()

  app.$validate = async function (validator, errorCallback) {
    const result = await validator.validate()

    return new Promise((resolve, reject) => {
      if (!result) {
        if (errorCallback) { errorCallback(validator) }
        console.log(Object.values(validator.errors).filter(a => a.length))
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
        // throw Object.values(validator.errors).filter(a => a.length)[0][0]
      }
      if (typeof result === 'object') {
        if (!result.valid) {
          if (errorCallback) { errorCallback(validator) }
          // eslint-disable-next-line prefer-promise-reject-errors
          reject()
          throw result.errors[0]
        }
      }

      resolve()
    })
  }

  inject('validate', app.$validate)
}

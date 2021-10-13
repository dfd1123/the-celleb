export const NoToast = {}

export const common = {
  methods: {
    /**
     * 정해진 시간 간격 안에 여러번 발생하는 액션은 맨 첫 액션만 동작되도록 함. ( debounce 의 경우 마지막 액션을 사용하여 답답한 느낌을 줄 수 있음 )
     * @param {Number} duration 초단위
     * @returns {Promise<*>}
     */
    timeoutShield (duration = 0.5) {
      return new Promise((resolve) => {
        const now = +new Date()
        if (this.__shieldTime__ && this.__shieldTime__ + (duration * 1000) > now) {
          // eslint-disable-next-line prefer-promise-reject-errors
          // reject()
        } else {
          resolve()
        }
        this.__shieldTime__ = now
      })
    }
  }
}

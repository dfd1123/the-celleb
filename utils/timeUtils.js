import moment from 'moment'
import { pad } from '@/utils/commonUtils'

/**
 * 날짜값 millisecond 값으로 변경
 * @param {string?} val
 */
export const getTime = (val) => {
  return +(moment(val).toDate())
}
const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export const renderHms = (sec, maintainHour) => {
  let s = Math.floor(sec)
  const h = Math.floor(s / HOUR)
  s -= h * HOUR
  const m = Math.floor(s / MINUTE)
  s -= m * MINUTE
  const hh = maintainHour || h > 0 ? pad(h, '0', 2) + ':' : ''
  return hh + pad(m, '0', 2) + ':' + pad(s, '0', 2)
}

/**
 * 남은 시간 표현
 * 남은 시간이 없다면 null 을 반환한다.
 * @param {Store} store
 * @param {number} target
 * @param {boolean?} maintainHour false 로 명시하면 hour 가 없을시 시간 부분은 노출되지 않음
 * @returns {string | null}
 */
export const remainHms = (store, target, maintainHour = true) => {
  const v = moment(target).diff(moment(+new Date() + store.getters.timeDiff), 'second')
  if (v < 0) { return null }
  return renderHms(v, maintainHour)
}

/**
 * 날짜포함 남은 시간 표현
 * 남은 시간이 없다면 null 을 반환한다.
 * @param {Store} store
 * @param {number|string} target
 * @param {?boolean} maintainHour
 * @returns {{day: number, hms: string} | null}
 */
export const remainDayHms = (store, target, maintainHour = false) => {
  let s = moment(+target).diff(moment(+new Date() + store.getters.timeDiff), 'second')
  if (s < 0) { return null }
  const day = Math.floor(s / DAY)
  s -= day * DAY
  const hms = renderHms(s, maintainHour)
  return { day, hms, h: hms.slice(0, 2), m: hms.slice(3, 5), s: hms.slice(6, 8) }
}

/**
 * 이미 지났는지 여부
 * @param {Store} store
 * @param {number|string} target
 * @returns {boolean}
 */
export const isPassed = (store, target) => {
  return moment(+target).isBefore(moment(+new Date() + store.getters.timeDiff))
}

/**
 * D-day
 * @param {Store} store
 * @param {number|string} dueDate
 * @returns {string}
 */
export const dday = (store, dueDate) => {
  if (!dueDate) { return 'D-?' }
  const d = moment(+new Date() + store.getters.timeDiff).diff(moment(+dueDate), 'day')
  if (d === 0) { return 'D-day' } else { return d > 0 ? 'D+' + d : 'D' + d }
}

/**
 * 00:00 ~ hour 까지 시간 목록 배열로 반환
 * D-day
 * @param {int} hour
 * @returns {string[]}
 */
export const hours = (hour) => {
  let n = 1
  const list = []
  while (hour >= n) {
    list.push((n < 10 ? '0' + n : n) + ':00')
    n++
  }
  return list
}

/**
 * 시작 - 끝 날짜 목록 배열로 반환
 * @param {string} s 'YYYY-MM-DD'
 * @param {string} e 'YYYY-MM-DD'
 * @returns {string[]|string}
 */
export const startToLast = (s, e) => {
  // eslint-disable-next-line prefer-regex-literals
  const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
  if (!(regex.test(s) && regex.test(e))) { return 'date format error' }
  const result = []
  const start = new Date(s)
  while (start <= new Date(e)) {
    result.push(start.toISOString().split('T')[0])
    start.setDate(start.getDate() + 1)
  }
  return result
}

export const fullDateDetail = (milliSec) => {
  return moment(milliSec).format('YYYY/MM/DD a h:mm')
}

export const getYM = (milliSec) => {
  return moment(milliSec).format('YYYY-MM')
}

export const getYMD = (milliSec) => {
  return moment(milliSec).format('YYYY-MM-DD')
}

export const getHM = (milliSec) => {
  return moment(milliSec).format('HH:mm')
}

export const getDetailHM = (milliSec) => {
  return moment(milliSec).format('HH:mm:ss.SSS')
}

export const getEnHM = (milliSec) => {
  return moment(milliSec).locale('en').format('HH:mm:00 A')
}

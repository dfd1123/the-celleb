/**
 * 특정 길이만큼 앞에 특정값을 채움
 * @param {string|number} v 값
 * @param {string|number} p 갯수만큼 앞에 채울 값
 * @param {number} len 원하는 길이
 * @returns {string}
 */
export const pad = (v, p, len) => {
  let r = '' + v
  if (r.length >= len) { return r }
  while (r.length < len) { r = p + r }
  return r
}

/**
 * start 부터 end 까지 step 간격의 수를 반환
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @returns {number[]}
 */
export const range = (start, end, step = 1) => {
  const delta = end - start
  if (!delta) { return [start] }
  return [...(function* () {
    let i = start
    while (true) {
      yield i
      if (Math.abs(end - i) < Math.abs(step)) { break }
      end - start > 0 ? i += step : i -= step
    }
  })()]
}

/**
 * 한글을 2자로 계산하는 방식의 문자열 길이
 * @CHECK 이전 소스상 한글 1자와 영문 2자를 같은 길이로 보는 커멘트가 보여 validation 시 이 방식으로 byte 체크를 진행하였으나 확실한지 확인 필요.
 * @param {string} str
 * @returns {number}
 */
export const getCharLength = (str) => {
  if (!str) { return 0 }
  let i = str.length; let result = 0
  while (i--) { result += str.charCodeAt(i) >> 7 ? 2 : 1 }
  return result
}

/**
 * 문자열 utf-8 byte 계산
 * @param {string} str
 * @returns {number}
 */
export const getByteLength = (str) => {
  if (!str) { return 0 }
  let i = str.length; let result = 0; let code
  while (i--) {
    code = str.charCodeAt(i)
    result += code >> 11 ? 3 : code >> 7 ? 2 : 1
  }
  return result
}

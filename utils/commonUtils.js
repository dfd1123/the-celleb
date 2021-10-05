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

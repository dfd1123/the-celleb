export default function (to, from, savedPosition) {
  return new Promise((resolve) => {
    if (savedPosition) {
      to.params.y = savedPosition

      resolve(savedPosition)
    } else if (to.hash) {
      resolve({
        selector: to.hash
      })
    }

    resolve({ x: 0, y: 0 })
  })
}

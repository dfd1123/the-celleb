const initIntersectionObserver = () => {
  if (!window) { return false }
  window.intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const { target } = entry

      const ioRatio = Number(target.dataset.ioRatio || 0.5)

      if (entry.intersectionRatio >= ioRatio) {
        const animationName = target.dataset.animation || ''
        const duration = (target.dataset.duration || 500) / 1000
        const delay = +target.dataset.delay || 0
        setTimeout(() => {
          target.classList.add('que-done')
          target.style.visibility = 'visible'
          target.style.animationName = animationName
          target.style.animationDuration = `${duration}s`
          setTimeout(() => {
            target.style.animationName = null
            target.style.animationDuration = null
          }, duration * 1000 + 500)
          observer.unobserve(target)
        }, delay)
      }
    })
  }, { threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5] })
}

const addInteractionObserve = (el) => {
  if (!window.intersectionObserver) {
    initIntersectionObserver()
  }
  if (!el.classList.contains('que-done')) { window.intersectionObserver.observe(el) }
}

const removeInteractionObserve = (el) => {
  if (!window.intersectionObserver) {
    return
  }
  window.intersectionObserver.unobserve(el)
}

const que = {
  bind: (el, binding, vnode) => {
    const { animation, duration, delay, ioRatio } = binding.value

    el.style.visibility = 'hidden'
    if (animation) { el.dataset.animation = animation }
    if (duration) { el.dataset.duration = duration }
    if (delay) { el.dataset.delay = delay }
    if (ioRatio) { el.dataset.ioRatio = ioRatio }

    vnode.context.$once('hook:mounted', () => {
      vnode.context.$nextTick(() => {
        addInteractionObserve(el)
      })
    })

    vnode.context.$once('hook:updated', () => {
      vnode.context.$nextTick(() => {
        addInteractionObserve(el)
      })
    })

    vnode.context.$once('hook:beforeDestroy', () => {
      removeInteractionObserve(el)
    })
  }
}

export default que

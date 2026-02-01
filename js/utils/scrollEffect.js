export function watchInView(
  selector,
  onEnter,
  onLeave,
  options = {}
) {
  const elements = document.querySelectorAll(selector)
  if (!elements.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onEnter && onEnter(entry.target, entry)
        } else {
          onLeave && onLeave(entry.target, entry)
        }
      })
    },
    {
      threshold: 0,
      ...options
    }
  )

  elements.forEach(el => observer.observe(el))
}

export function watchScrollProgress(
  selector,
  onChange,
  options = {}
) {
  const el = document.querySelector(selector)
  if (!el) return

  const {
    clamp = true, // 是否限制在 0~100
  } = options

  let ticking = false

  function update() {
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight

    // 可滾動總距離（500vh - 100vh）
    const totalScroll = rect.height - vh

    // 已滾動距離
    const scrolled = Math.min(
      totalScroll,
      Math.max(0, -rect.top)
    )

    let percent = (scrolled / totalScroll) * 100

    if (clamp) {
      percent = Math.max(0, Math.min(100, percent))
    }

    onChange(Math.round(percent), el)
    ticking = false
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }

  update()
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', onScroll)

  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
}



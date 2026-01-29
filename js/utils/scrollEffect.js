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

import { onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

export function useOrbitLights(items) {
  let rafId = 0
  let lastTime = performance.now()

  const states = items.map(item => {
    return {
      el: item.el,
      baseRadius: item.radius,
      radiusRange: item.radiusRange || 20,
      angle: Math.random() * Math.PI * 2,
      direction: Math.random() > 0.5 ? 1 : -1, // 隨機方向
      speed: item.speed || (0.0008 + Math.random() * 0.002),
      speedSeed: Math.random() * 1000,
    }
  })

  function animate(time) {
    const delta = time - lastTime
    lastTime = time

    states.forEach(s => {
      const el = s.el.value
      if (!el) return

      // 平滑隨機速度
      const speedNoise =
        Math.sin(time * 0.001 + s.speedSeed) * 0.0005

      s.angle += (s.speed + speedNoise) * s.direction * delta

      // 半徑呼吸
      const radiusNoise =
        Math.sin(time * 0.0015 + s.baseRadius) * s.radiusRange

      const r = s.baseRadius + radiusNoise

      const x = Math.cos(s.angle) * r
      const y = Math.sin(s.angle) * r

      el.style.transform = `translate(${x}px, ${y}px)`
    })

    rafId = requestAnimationFrame(animate)
  }

  function start() {
    lastTime = performance.now()
    rafId = requestAnimationFrame(animate)
  }

  function stop() {
    cancelAnimationFrame(rafId)
  }

  onUnmounted(stop)

  return {
    start,
    stop,
  }
}

import { createApp, onMounted, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { useNav, openMenu, closeMenu } from './composables/useNav.js'
import { watchInView, watchScrollProgress } from './utils/scrollEffect.js'
import { useOrbitLights } from './composables/useOrbitLights.js'

createApp({
  setup() {
    const { openNav } = useNav()

    const orb1 = ref(null)
    const orb2 = ref(null)
    const orb3 = ref(null)

    const { start } = useOrbitLights([
      { el: orb1, radius: 300,  speed: 0.001 },
      { el: orb2, radius: 250, speed: 0.001 },
      { el: orb3, radius: 100, speed: 0.001 },
    ])

    onMounted(() => {
      const header = document.querySelector('.header')
      if (!header) return

      watchInView(
        '.content',
        () => {
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      let circleLastIndex = -1
      
      watchScrollProgress('.serviceCircle', (percent) => {
        let index = -1

        if (percent >= 75) index = 4
        else if (percent >= 60) index = 3
        else if (percent >= 45) index = 2
        else if (percent >= 30) index = 1
        else if (percent >= 15) index = 0

        if (index === circleLastIndex) return
        circleLastIndex = index

        const items = document.querySelectorAll('.cardArea__card')

        // 🔑 關鍵：先全部清掉
        items.forEach(item => item.classList.remove('active'))

        // 🔑 再顯示 0 ~ index
        if (index >= 0) {
          items.forEach((item, i) => {
            if (i <= index) {
              item.classList.add('active')
            }
          })
        }
      })


      let flowLastIndex = -1
      
      watchScrollProgress('.serviceFlow', (percent) => {
        let index = -1

        if (percent >= 90) index = 6
        else if (percent >= 75) index = 5
        else if (percent >= 60) index = 4
        else if (percent >= 45) index = 3
        else if (percent >= 30) index = 2
        else if (percent >= 15) index = 1
        else index = 0

        if (index === flowLastIndex) return
        flowLastIndex = index

        const image = document.querySelector('.serviceFlow .image')
        const features = document.querySelectorAll('.feature')
        const firstPart = document.querySelector('.firstPart')
        const secondPart = document.querySelector('.secondPart')
        const firstPartImages = document.querySelectorAll('.firstPart img')
        const secondPartImages = document.querySelectorAll('.secondPart img')
        
        // 🔑 關鍵：先全部清掉
        features.forEach(item => item.classList.remove('active'))
        firstPartImages.forEach(item => item.classList.remove('active'))
        secondPartImages.forEach(item => item.classList.remove('active'))

        // 🔑 再顯示 0 ~ index
        if (index >= 0 && index <= 3) {
          image.classList.remove('smallBg')
          firstPart.classList.add('active')
          secondPart.classList.remove('active')
        } else if (index >=4) {
          image.classList.add('smallBg')
          firstPart.classList.remove('active')
          secondPart.classList.add('active')
        }
        features[index]?.classList.add('active')
        firstPartImages[index]?.classList.add('active')
        secondPartImages[index - 4]?.classList.add('active')
      })

      start()

    })

    return { openNav, openMenu, closeMenu, orb1, orb2, orb3 }
  }
}).mount('#app')

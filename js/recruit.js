import { createApp, onMounted, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { useNav } from './composables/useNav.js'
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
        '.recruitBanner',
        () => {
          header.classList.remove('light')
          header.classList.add('dark')
        }
      )

      watchInView(
        '.recruitCulture',
        () => {
          header.classList.remove('light')
          header.classList.add('dark')
        }
      )

      watchInView(
        '.recruitPhotoWall',
        () => {
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      watchInView(
        '.recruitWelfare',
        () => {
          header.classList.remove('light')
          header.classList.add('dark')
        }
      )

      watchInView(
        '.recruitVacancies',
        () => {
          header.classList.remove('light')
          header.classList.add('dark')
        }
      )

      watchInView(
        '.recruitFlow',
        () => {
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      watchInView(
        '.recruitJoin',
        () => {
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      let bannerLastIndex = -1
      
      watchScrollProgress('.recruitBanner', (percent) => {
        let index = -1

        if (percent >= 75) index = 3
        else if (percent >= 50) index = 2
        else if (percent >= 25) index = 1
        else if (percent >= 0) index = 0

        if (index === bannerLastIndex) return
        bannerLastIndex = index

        const featureList = document.querySelector('.featureList')
        const features = document.querySelectorAll('.feature')

        featureList.style.transform = `translateY(-${index * 80}px)`

        // 🔑 關鍵：先全部清掉
        features.forEach(item => item.classList.remove('active'))

        // 🔑 再顯示 0 ~ index
        features[index]?.classList.add('active')
      })


      let cultureLastIndex = -1

      watchScrollProgress('.recruitCulture', (percent) => {
        let index = -1

        if (percent >= 75) index = 5
        else if (percent >= 62.5) index = 4
        else if (percent >= 50) index = 3
        else if (percent >= 37.5) index = 2
        else if (percent >= 25) index = 1
        else if (percent >= 12.5) index = 0

        if (index === cultureLastIndex) return
        cultureLastIndex = index

        const images = document.querySelectorAll('.picArea img')

        // 🔑 關鍵：先全部清掉
        images.forEach(item => item.classList.remove('active'))

        // 🔑 再顯示 0 ~ index
        if (index >= 0) {
          images.forEach((item, i) => {
            if (i <= index) {
              item.classList.add('active')
            }
          })
        }
      })

      start()
      
    })

    return { openNav, orb1, orb2, orb3}
  }
}).mount('#app')

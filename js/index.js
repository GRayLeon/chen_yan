// /js/main.js
import { createApp, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { useNav, openMenu, closeMenu } from './composables/useNav.js'
import { watchInView, watchScrollProgress } from './utils/scrollEffect.js'

createApp({
  setup() {
    const { openNav } = useNav()

    onMounted(() => {
      const header = document.querySelector('.header')
      if (!header) return

      watchInView(
        '.indexBanner',
        () => {
          header.classList.remove('light__dark')
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      watchInView(
        '.indexAbout',
        () => {
          header.classList.remove('light__dark')
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      watchInView(
        '.indexSupply',
        () => {
          header.classList.remove('light__dark')
          header.classList.remove('light')
          header.classList.add('dark')
        }
      )

      watchInView(
        '.indexBrand',
        () => {
          header.classList.remove('light__dark')
          header.classList.remove('light')
          header.classList.add('dark')
        }
      )

      watchInView(
        '.indexStore',
        () => {
          header.classList.remove('dark')
          header.classList.remove('light')
          header.classList.add('light__dark')
        }
      )

      watchInView(
        '.indexNews',
        () => {
          header.classList.remove('light__dark')
          header.classList.remove('light')
          header.classList.add('dark')
        }
      )

      watchInView(
        '.indexRecruit',
        () => {
          header.classList.remove('light__dark')
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      watchInView(
        '.recruitPhotoWall',
        () => {
          header.classList.remove('light__dark')
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )


      let aboutLastIndex = -1

      watchScrollProgress('.indexAbout', (percent) => {
        let index = -1

        if (percent >= 50) index = 2
        else if (percent >= 25) index = 1
        else if (percent >= 0) index = 0

        if (index === aboutLastIndex) return
        aboutLastIndex = index

        const items = document.querySelectorAll('.indexAbout__content__item')
        items.forEach(item => item.classList.remove('active'))
        items[index]?.classList.add('active')
      })

      let supplyLastIndex = -1

      watchScrollProgress('.indexSupply', (percent) => {
        let index = -1

        if (percent >= 75) index = 5
        else if (percent >= 62.5) index = 4
        else if (percent >= 50) index = 3
        else if (percent >= 37.5) index = 2
        else if (percent >= 25) index = 1
        else if (percent >= 12.5) index = 0

        if (index === supplyLastIndex) return
        supplyLastIndex = index

        const items = document.querySelectorAll('.indexSupply__cardArea__card')

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

      watchScrollProgress('.indexPartner', (percent) => {

        let porcess = 0
        if (percent <= 20) porcess = 0
        else if (percent <= 80 && percent > 20) porcess = (percent - 20) / 60 * 100
        else porcess = 100

        console.log(porcess)

        const cardArea = document.querySelector('.indexPartner__cardArea')

        cardArea.style.transform = `translateX(-${porcess}%)`
      })

      let brandLastIndex = -1

      watchScrollProgress('.indexBrand', (percent) => {

        const items = document.querySelectorAll('.indexBrand__cardArea__card')
        
        const total = items.length
        if (!total) return

        // 每一段的百分比
        const step = 100 / total

        // 算出目前 index
        let index = Math.floor(percent / step)

        // 防止超出範圍
        index = Math.max(0, Math.min(total - 1, index))

        if (index === brandLastIndex) return
        brandLastIndex = index

        items.forEach((item, i) => {
          item.classList.toggle('active', i === index)
        })
      })

    })

    return { openNav, openMenu, closeMenu }
  }
}).mount('#app')

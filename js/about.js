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
        '.aboutBanner',
        () => {
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      watchInView(
        '.aboutFaith',
        () => {
          header.classList.remove('light')
          header.classList.add('dark')
        }
      )

      watchInView(
        '.aboutMileStone',
        () => {
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      watchInView(
        '.aboutBase',
        () => {
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      watchInView(
        '.aboutMission',
        () => {
          header.classList.remove('dark')
          header.classList.add('light')
        }
      )

      let faithLastIndex = -1

      watchScrollProgress('.aboutFaith', (percent) => {
        let index = -1

        if (percent >= 75) index = 4
        else if (percent >= 60) index = 3
        else if (percent >= 45) index = 2
        else if (percent >= 30) index = 1
        else if (percent >= 15) index = 0

        if (index === faithLastIndex) return
        faithLastIndex = index

        const cardArea = document.querySelector('.cardArea')

        const items = document.querySelectorAll('.cardArea__card')
        const image = document.querySelector('.aboutFaith .image')

        // 🔑 關鍵：先全部清掉
        items.forEach(item => item.classList.remove('active'))
        image.classList.remove('active')

        if (index > 0) {
          cardArea.classList.add('active')
        }

        // 🔑 再顯示 0 ~ index
        if (index >= 0) {
          items.forEach((item, i) => {
            if (i <= index && i < 5) {
              item.classList.add('active')
            }
          })
        }
        if (index === 4) {
          image.classList.add('active')
        }
      })

      let mileStoneLastIndex = -1

      watchScrollProgress('.aboutMileStone', (percent) => {
        const yearArea = document.querySelector('.yearArea')
        const years = document.querySelectorAll('.year')
        const mileStoneLists = document.querySelectorAll('.mileStoneList')

        const total = years.length
        if (!total) return

        // 每一段的百分比
        const step = 100 / total

        // 算出目前 index
        let index = Math.floor(percent / step)

        // 防止超出範圍
        index = Math.max(0, Math.min(total - 1, index))

        if (index === mileStoneLastIndex) return
        mileStoneLastIndex = index

        // 年份位移（每個 year 高度假設 100px）
        yearArea.style.transform = `translateY(${-index * 100}px)`

        years.forEach((year, i) => {
          year.classList.toggle('active', i === index)
        })

        mileStoneLists.forEach((list, i) => {
          list.classList.toggle('active', i === index)
        })
      })

    })

    return { openNav, openMenu, closeMenu }
  }
}).mount('#app')

// /js/main.js
import { createApp, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { useNav } from './composables/useNav.js'
import { watchInView } from './utils/scrollEffect.js'

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
      
    })

    return { openNav }
  }
}).mount('#app')

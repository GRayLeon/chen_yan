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
      
    })

    return { openNav }
  }
}).mount('#app')

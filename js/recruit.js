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
      
    })

    return { openNav }
  }
}).mount('#app')

// /js/main.js
import { createApp, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { useNav, openMenu, closeMenu } from './composables/useNav.js'

createApp({
  setup() {
    const { openNav } = useNav()

    onMounted(() => {
      const header = document.querySelector('.header')
      if (!header) return
      
    })

    return { openNav, openMenu, closeMenu }
  }
}).mount('#app')
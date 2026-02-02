// /js/composables/useNav.js
export function useNav() {
  const openNav = (target, isBlank = false) => {
    if (!target) return
    if (isBlank) {
      window.open(target, '_blank')
    } else {
      window.location.href = target
    }
  }

  return { openNav }
}

export function openMenu() {
  const header = document.querySelector('.mainNav')
  header.classList.add('open')
}

export function closeMenu() {
  const header = document.querySelector('.mainNav')
  header.classList.remove('open')
}

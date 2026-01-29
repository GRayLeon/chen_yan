// /js/composables/useNav.js
export function useNav() {
  const openNav = (target) => {
    if (!target) return
    window.location.href = target
  }

  return { openNav }
}

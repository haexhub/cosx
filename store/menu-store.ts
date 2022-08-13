import { defineStore, skipHydrate } from 'pinia'

/* interface IMenuStore {
  isNavbarVisible: boolean
  isActionButtonVisible: boolean
  isActionButtonMenuVisible: boolean
  isMarkMenuVisible: boolean
  iconClass: string
} */

export const useMenuStore = defineStore("menuStore", () => {

  const isActionButtonVisible = ref(true)
  const isActionButtonMenuVisible = ref(false)
  const iconClass = ref("rotate-45")
  const isMarkMenuVisible = ref(false)
  const isNavbarVisible = ref(true)

  const showActionButton = () => {
    isActionButtonVisible.value = true
    return isActionButtonVisible.value
  }

  const hideActionButton = () => {
    isActionButtonVisible.value = false
    return isActionButtonVisible.value
  }

  const toggleActionButton = () => {
    if (isActionButtonVisible.value)
      hideActionButton()
    else
      showActionButton()

    return isActionButtonVisible.value
  }

  const showNavbar = () => {
    isNavbarVisible.value = true
    return isNavbarVisible.value
  }

  const hideNavbar = () => {
    isNavbarVisible.value = false
    return isNavbarVisible.value
  }

  const toggleNavbar = () => {
    if (isNavbarVisible.value)
      hideNavbar()
    else
      showNavbar()

    return isNavbarVisible.value
  }

  const showActionButtonMenu = () => {
    iconClass.value = "rotate-180"
    isActionButtonMenuVisible.value = true
    return isActionButtonMenuVisible.value
  }

  const hideActionButtonMenu = () => {
    iconClass.value = "rotate-45"
    isActionButtonMenuVisible.value = false
    return isActionButtonMenuVisible.value
  }

  const toogleActionButtonMenu = () => {
    if (isActionButtonMenuVisible.value)
      hideActionButtonMenu()
    else
      showActionButtonMenu()
    return isActionButtonMenuVisible.value
  }

  const showMarkMenu = () => {
    isMarkMenuVisible.value = true
    return isMarkMenuVisible.value
  }

  const hideMarkMenu = () => {
    isMarkMenuVisible.value = false
    return isMarkMenuVisible.value
  }

  const toggleMarkMenu = () => {
    if (isMarkMenuVisible.value)
      hideMarkMenu()
    else
      showMarkMenu()

    return isMarkMenuVisible.value
  }

  return {
    hideActionButton,
    hideActionButtonMenu,
    hideMarkMenu,
    hideNavbar,
    iconClass: skipHydrate(iconClass),
    isActionButtonMenuVisible: skipHydrate(isActionButtonMenuVisible),
    isActionButtonVisible: skipHydrate(isActionButtonVisible),
    isMarkMenuVisible: skipHydrate(isMarkMenuVisible),
    isNavbarVisible: skipHydrate(isNavbarVisible),
    showActionButton,
    showActionButtonMenu,
    showMarkMenu,
    showNavbar,
    toogleActionButtonMenu,
    toggleMarkMenu,
    toggleNavbar,
  }
})
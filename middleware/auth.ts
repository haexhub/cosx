export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  const localePath = useLocalePath()

  if (!user.value?.id) {
    return navigateTo(localePath('/login'))
  }

  if (to.path !== from.path && to.redirectedFrom?.path !== to.path) {
    return navigateTo(to.path)
  }
})

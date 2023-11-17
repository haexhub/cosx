<template>
  <UDropdown
    :items="items"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton
      color="white"
      icon="i-heroicons-user-circle"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
  </UDropdown>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const items = [
  [
    {
      label: 'Profile',
      icon: 'i-heroicons-user-circle',
      click: () => router.push({ name: 'profile' }),
    },
  ],

  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      shortcuts: ['L'],
      click: async () => {
        try {
          const { error } = await supabase.auth.signOut()
          if (error) throw error
          user.value = null
          router.push('/')
        } catch (error) {
          console.log(error)
        }
      },
    },
  ],
]
</script>

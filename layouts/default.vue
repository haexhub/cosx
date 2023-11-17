<template>
  <div class="h-full">
    <NavigationTop />

    <div class="h-full w-full flex pt-20 pl-16">
      <NavigationSidebar v-show="true">
        <NavigationSidebarItem
          :href="{ name: 'files' }"
          icon="i-heroicons-folder"
          tooltip="Dateien"
        >
        </NavigationSidebarItem>

        <NavigationSidebarItem
          :href="{ name: 'chamber' }"
          icon="i-mdi-key-chain"
          tooltip="Schlüssel"
        >
        </NavigationSidebarItem>

        <template #bottom>
          <div class="px-2">
            <UButton
              variant="outline"
              block
              @click="logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 14 14"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.5 10.5v2a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v2M6.5 7h7m-2-2l2 2l-2 2"
                />
              </svg>
            </UButton>
          </div>
        </template>
      </NavigationSidebar>

      <div class="min-w-0 p-4 w-full h-full overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>

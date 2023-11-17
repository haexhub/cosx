<template>
  <UForm
    :state="state"
    @submit="updateProfile"
  >
    <div class="flex flex-col items-center space-y-2">
      <Avatar
        :size="10"
        @upload="updateProfile"
        v-model:path="state.avatar_path"
      />

      <UFormGroup
        class="w-full"
        label="E-Mail"
        name="email"
      >
        <UInput
          :value="user?.email"
          disabled
          icon="i-heroicons-envelope"
        />
      </UFormGroup>

      <UFormGroup
        class="w-full"
        label="Username"
        name="username"
      >
        <UInput
          icon="i-heroicons-user"
          v-model="state.username"
        />
      </UFormGroup>

      <UFormGroup
        class="w-full"
        label="Website"
        name="website"
      >
        <UInput
          type="url"
          v-model="state.website"
        />
      </UFormGroup>

      <div>
        <UButton
          :disabled="loading"
          :loading="loading"
          @click="updateProfile"
          block
        >
          Update
        </UButton>
      </div>
    </div>
  </UForm>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const loading = ref(false)

const state = reactive({
  avatar_path: '',
  username: '',
  website: '',
})

const { data: profile } = await useAsyncData('profile', async () => {
  try {
    loading.value = true
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.value.id)
      .single()

    if (profileError) throw new Error(profileError.message)

    return data
  } catch (error) {
    toast.add({ title: error?.message ?? error, color: "red", timeout: 20000 })
  } finally {
    loading.value = false
  }
})

if (profile.value?.username) {
  state.username = profile.value?.username ?? ''
  state.website = profile.value?.website ?? ''
  state.avatar_path = profile.value?.avatar_url ?? ''
}

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: state.username,
      website: state.website,
      avatar_url: state.avatar_path,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    toast.add({ title: error?.message ?? error?.msg ?? error, timeout: 60000 })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="m-1">
    <UForm
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <UFormGroup
        class="my-4"
        label="Email"
        name="email"
      >
        <UInput
          icon="i-heroicons-envelope"
          placeholder="your@mail.com"
          trailing
          v-model="state.email"
        />
      </UFormGroup>

      <UFormGroup
        class="my-4"
        label="Password"
        name="password"
      >
        <UInput
          icon="i-heroicons-lock-closed"
          trailing
          type="password"
          v-model="state.password"
        />
      </UFormGroup>

      <UButton type="submit"> Einloggen </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { object, string } from 'yup'

const state = reactive({
  email: '',
  password: '',
})

const supabase = useSupabaseClient()

const router = useRouter()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required'),
})

async function onSubmit() {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password,
  })

  console.log('error', error)
  console.log('data', data)

  if (!error) {
    router.push({ name: 'profile' })
  }
}
</script>

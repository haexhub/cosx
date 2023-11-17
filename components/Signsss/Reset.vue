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



      <UButton type="submit"> Reset Password </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { object, string } from 'yup'

const state = reactive({
  email: '',
})

const supabase = useSupabaseClient()

const router = useRouter()

const schema = object({
  email: string().email('Invalid email').required('Required'),
})

async function onSubmit() {
  let { data, error } = await supabase.auth.resetPasswordForEmail(state.email)

  console.log('error', error)
  console.log('data', data)

  if (!error) {
    router.push({ name: 'login' })
  }
}
</script>

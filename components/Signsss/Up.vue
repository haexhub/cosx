<template>
  <UCard class="m-1">
    <UForm
      :state="state"
      :schema="schema"
      @submit="onSubmit"
    >
      <UFormGroup
        label="Email"
        name="email"
        class="my-4"
      >
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup
        label="Password"
        name="password"
        class="my-4"
      >
        <UInput
          v-model="state.password"
          type="password"
        />
      </UFormGroup>

      <UButton type="submit">Account erstellen</UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
//@ts-ignore
import { object, string } from 'yup'

const state = reactive({
  email: '',
  password: '',
})

const supabase = useSupabaseClient()

const toast = useToast()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characters').required('Required'),
})

async function onSubmit() {
  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
    })

    if (signUpError) throw new Error(signUpError.message)
  } catch (error: any) {
    toast.add({ title: error?.msg ?? error?.message ?? error })
  }
}
</script>

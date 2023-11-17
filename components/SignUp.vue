<template>
  <!-- component -->
  <div class="bg-white dark:bg-gray-900 h-full rounded-lg overflow-hidden shadow-md">
    <div class="flex justify-center h-full">
      <div
        class="hidden bg-cover lg:block lg:w-2/3"
        style="background-image: url(/computer.avif)"
      >
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-primary">Chamber of Secrets</h2>

            <p class="max-w-xl mt-3 text-gray-300">Dein digitales Leben zu deinen Fingern</p>
          </div>
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="mt-8">
            <UForm
              :schema="schema"
              :state="state"
              @submit="onSubmit"
            >
              <div class="flex flex-col space-x-4">
                <UFormGroup
                  label="E-Mail Address"
                  name="email"
                >
                  <UInput
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    size="xl"
                    type="email"
                    v-model="state.email"
                  />
                </UFormGroup>
              </div>

              <div class="mt-6">
                <UFormGroup
                  label="Password"
                  name="password"
                >
                  <UInput
                    id="password"
                    label="Password"
                    type="password"
                    size="xl"
                    name="password"
                    placeholder="Your Password"
                    v-model="state.password"
                  />
                </UFormGroup>
              </div>

              <div class="mt-6">
                <UFormGroup
                  label="Password"
                  name="password"
                >
                  <UInput
                    id="password"
                    label="Password"
                    type="password"
                    size="xl"
                    name="password"
                    placeholder="Your Password"
                    v-model="state.password"
                  />
                </UFormGroup>
              </div>

              <div class="mt-6">
                <UButton
                  block
                  icon="i-mdi-login-variant"
                  size="lg"
                  type="submit"
                >
                  Sign in
                </UButton>
              </div>
            </UForm>

            <p class="mt-6 text-sm text-center text-gray-400">
              Already have an account?
              <NuxtLink :to="localePath('/login')">Login</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string } from 'yup'

const localePath = useLocalePath()

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

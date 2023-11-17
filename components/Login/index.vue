<template>
  <div class="bg-white dark:bg-gray-900 h-full rounded-lg shadow-md">
    <div class="flex justify-center h-full">
      <div
        class="hidden bg-cover lg:block lg:w-2/3"
        style="background-image: url(/computer.avif)"
      >
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-primary">Chamber of Secrets</h2>

            <p class="max-w-xl mt-3 text-gray-300">{{ $t('component.login.welcome') }}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">
              {{ $t('component.login.signIn.label') }}
            </h2>

            <p class="mt-3 text-gray-500 dark:text-gray-300">
              {{ $t('component.login.signIn.message') }}
            </p>
          </div>

          <div class="mt-12">
            <UForm
              :schema="schema"
              :state="state"
              @submit="onSubmit"
              class="flex flex-col space-y-8"
            >
              <UFormGroup
                :label="$t('component.login.email.label')"
                name="email"
              >
                <UInput
                  :placeholder="$t('component.login.email.placeholder')"
                  id="email"
                  name="email"
                  size="xl"
                  type="email"
                  v-model="state.email"
                />
              </UFormGroup>

              <div>
                <UFormGroup
                  :label="$t('component.login.password.label')"
                  name="password"
                >
                  <UInput
                    :label="$t('component.login.password.label')"
                    :placeholder="$t('component.login.password.placeholder')"
                    id="password"
                    name="password"
                    size="xl"
                    type="password"
                    v-model="state.password"
                  />
                </UFormGroup>

                <div class="flex justify-end mt-2">
                  <NuxtLink
                    :to="localePath('/reset')"
                    class="text-sm text-primary focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    {{ $t('component.login.password.forgot') }}
                  </NuxtLink>
                </div>
              </div>

              <UButton
                block
                icon="i-mdi-login-variant"
                size="lg"
                type="submit"
              >
                {{ $t('component.login.signIn.label') }}
              </UButton>
            </UForm>

            <p class="mt-6 text-sm text-center text-gray-400">
              {{ $t('component.login.signUp.message') }}
              <NuxtLink
                class="ml-2 text-sm text-primary focus:text-blue-500 hover:text-blue-500 hover:underline"
                :to="localePath('/signup')"
              >
                {{ $t('component.login.signUp.label') }}
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string } from 'yup'

const { t } = useI18n()
const localePath = useLocalePath()

const state = reactive({
  email: '',
  password: '',
})

const supabase = useSupabaseClient()

const router = useRouter()

const schema = object({
  email: string()
    .email(t('component.login.schema.email.valid'))
    .required(t('component.login.schema.email.required')),
  password: string()
    .min(8, t('component.login.schema.password.minLength', 8))
    .required(t('component.login.schema.password.required')),
})

const onSubmit = async () => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password,
  })

  console.log('error', error)
  console.log('data', data)

  if (!error) {
    navigateTo(localePath({ name: 'profile' }))
  }
}
</script>

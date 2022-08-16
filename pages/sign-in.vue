<template>
  <p v-if="needsEmailVerification">
    Your email is not yet verified. Please check your mailbox and follow the
    verification link finish registration.
  </p>

  <form v-else @submit="handleSubmit">
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="input"
    /><br />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="input"
    /><br />

    <button class="btn-submit" type="submit">Sign in</button>
    <p>No account yet? <router-link to="/sign-up"> Sign up </router-link></p>
  </form>
</template>

<script setup lang="ts">
const nhost = useNhost();
// const nhost = useNhost()
/* const { signInEmailPassword, needsEmailVerification } = nhost.useSignInEmailPassword() */
nhost.client.auth.client.machine.config.predictableActionArguments = true;
const router = useRouter();
const email = ref("");
const password = ref("");
const handleSubmit = async (event: Event) => {
  /* event.preventDefault()
    const { isSuccess } = await signInEmailPassword(email, password)
    if (isSuccess) router.push('/') */
};
</script>


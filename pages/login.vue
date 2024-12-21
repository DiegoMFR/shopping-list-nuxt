<script setup lang="ts">
const logging = ref(false)
const password = ref('')
const email = ref('')

async function login() {
  if (logging.value || !password.value) return
  logging.value = true
  await $fetch('/api/login', {
    method: 'POST',
    body: {
      password: password.value,
      email: email.value,
    },
  })
    .then(() => {
        console.log('Login successful')
        navigateTo('/', { replace: true })
    })
    .catch((err) => {
      console.error(err)
    })
  logging.value = false
}
</script>

<template>
  <form
      class="space-y-4"
      @submit.prevent="login"
    >
    <label name="email">
        email
        <input
          v-model="email"
          name="email"
          type="email"
        >
      </label>

      <label name="Password">
        Password
        <input
          v-model="password"
          name="password"
          type="password"
        >
      </label>
      
      <button
        type="submit"
        :disabled="!password || !email"
        color="black"
        class="mt-2"
      >
        Login
    </button>
    </form>
</template>
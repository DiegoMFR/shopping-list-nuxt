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
  <div class="flex flex-col col-span-8 md:col-span-6 gap-4 md:col-start-2 items-center md:items-start w-full">
    <h1 class="text-7xl text-center font-bold text-indigo-800">Hola!</h1>
    <form class="flex flex-col space-y-2 text-indigo-100" @submit.prevent="login">
      <input
          v-model="email" class="bg-transparent border border-indigo-500 rounded-md p-2 grow" placeholder="email"
          name="email" type="email">

          <input
          v-model="password"
          class="bg-transparent border border-indigo-500 rounded-md p-2 grow" name="password" placeholder="password"
          type="password">

      <button type="submit" :disabled="!password || !email" color="black"  class="w-full text-left p-2 bg-purple-800 hover:bg-purple-700 active:bg-indigo-700 rounded-md">
        Login
      </button>
    </form>
  </div>

</template>
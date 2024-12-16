<template>
    <form class="grid grid-cols-4 gap-2 p-2" @submit="createList">
      <input v-model="listName" type="text" placeholder="Add a topic for your list" required class="rounded bg-indigo-900/75 text-white bold p-2 col-span-3">
      <button type="submit" class="border rounded border-indigo-300">Create</button>
    </form>
</template>

<script setup lang="ts">
import { addEmoji } from '~/actions/ai.actions';

const listName = ref('');


const createList = async (event: FormDataEvent) => {
    event.preventDefault();
    const nameWitEmoji = await addEmoji(listName.value);
    const { error } = await useFetch(`/api/lists/add-list?listName=${nameWitEmoji}&owner=Diego`, { method: 'POST' });
    reloadNuxtApp();
    
    if (error.value) {
        console.error('Error:', error.value);
    }
  }
</script>
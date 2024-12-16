<template>
  <div class="flex flex-col col-span-8 md:col-span-6 gap-4 md:col-start-2 items-center md:items-start w-full">
    <ListProducts v-if="list" :list-data=list />
    <div
      v-else
      className='w-full text-center text-indigo-500 border-indigo-500 bg-indigo-500/25 border border-dashed rounded p-2 mt-2'>
      List {{ listId }} not found
    </div>
  </div>
</template>
<script setup lang="ts">
import ListProducts from '~/components/ListProducts.vue';
import type { ListDataWithProducts } from '~/server/api/lists/[id]';

const listId = useRoute().params.id;

const list = ref<ListDataWithProducts | null>()

try {
  const { data } = await useFetch<ListDataWithProducts>(`/api/lists/${listId}`);
  console.log('bbb', data.value);
  if (data.value) {
    list.value = data.value;
  }
} catch (error) {
  console.error('Error fetching list data:', error);
}



</script>
<template>
  <div class="flex flex-col col-span-8 md:col-span-6 gap-4 md:col-start-2 items-center md:items-start w-full">
    <ListProducts v-if="data" :list-data=data />
    <div
      v-else
      className='w-full text-center text-indigo-500 border-indigo-500 bg-indigo-500/25 border border-dashed rounded p-2 mt-2'>
      List {{ listId }} not found
    </div>
  </div>
</template>
<script setup lang="ts">
import ListProducts from '~/components/ListProducts.vue';
const listId = useRoute().params.id;

const { data, error } = await useFetch<ListData>(`/api/lists/${listId}`);

useSeoMeta({
	title: () => data.value?.title || "",
});

if (error.value) throw createError(error.value.data);
watch(error, (err) => {
	if (err) throw createError({ ...err.data, fatal: true });
});

</script>
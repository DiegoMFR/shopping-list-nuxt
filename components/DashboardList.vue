<template>
    <div class="col-span-8 md:col-start-2 md:col-span-6">
        <!-- <DashhboardSkeleton/> -->
        <ClientOnly>
            <Suspense>
                <section v-if="Array.isArray(lists)" class="w-full">
                    <ul class="grid grid-cols-8 auto-rows-max gap-4 items-stretch content-center">
                        <li v-for="list in lists" :key="list.id" class="bg-indigo-500/75 rounded-md col-span-2">
                            <NuxtLink :href="`/lists/${list.id}`" class="p-4 centered block">
                            <h2 class="text-lg">{{list.title}}</h2>
                            </NuxtLink>
                        </li>
                        <li class="bg-indigo-500/75 rounded-md col-span-6">
                            <CreateListForm/>
                        </li>

                    </ul>
                </section>
                <template #fallback>
                    <DashboardSkeleton/>
                </template>
            </Suspense>
            <template #placeholder>
               <DashboardSkeleton/>
          </template>
        </ClientOnly>
    </div>
</template>


<script setup lang="ts">
import type { ListDataList } from '~/types';

const lists = ref<ListDataList>();

try {
    const { data } = await useFetch<ListDataList>('/api/lists');
    if (Array.isArray(data.value)) {
        lists.value = data.value;
    }
} catch (e) {
    console.error(e);
}
</script>

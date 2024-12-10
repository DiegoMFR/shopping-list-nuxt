<template>
    <div class="w-full">
        <h1 class="p-2 text-indigo-300 text-xl">{{ listData.title }}</h1>
        <section>
            <h2 class="pt-4 p-2 text-indigo-100 text-l">To buy:</h2>
            <ShoppingListComp v-if="shoppingList.size" list={shoppingList} @click="handleListClick" />
            <div 
                v-else
                class="text-center text-indigo-300 border-indigo-300 bg-indigo-300/25 border border-dashed rounded p-2 mb-2">
                {{removedList.size ? "You've got everything!" : "Add some items below..."}}
            </div>
            <ListInput :topics="[listData.title]" @submit="addToList" />

        </section>
        <section>
            <h2 class="pt-4 p-2 text-indigo-100 text-l">In the basket:</h2>

            <ShoppingListComp v-if="removedList.size" list={removedList} theme="deleted" @click="handleRemovedClick" />
            <div 
                v-else
                class="text-center text-indigo-500 border-indigo-500 bg-indigo-500/25 border border-dashed rounded p-2 mt-2">
                Nothing yet...
            </div>

        </section>

    </div>
</template>

<script setup lang="ts">
import type { ShoppingItem } from '~/server/api/products';
import ListInput from './ListInput.vue';
import type { ListDataWithProducts } from '~/server/api/lists/[id]';

interface Props {
    listData: ListDataWithProducts;
}

const { listData } = defineProps<Props>();

const shoppingList = ref(new Set());
const removedList = ref(new Set());

const addToList = async (item: ShoppingItem) => {
    await fetch(`/add-product-to-list`, { method: 'POST', body: JSON.stringify({ productId: item.id, listId: listData.id }) })
    shoppingList.value = new Set([...Array.from(shoppingList.value), item]);
};

const handleListClick = async (item: ShoppingItem) => {
    const response = await fetch(`/remove-product-from-list?productId=${item.id}&listId=${listData.id}`, { method: 'DELETE' });
    const res: ShoppingItem[] = await response.json();
    shoppingList.value = new Set(res);
    removedList.value = (new Set(removedList.value.add(item)));
}

const handleRemovedClick = async (item: ShoppingItem) => {
    await addToList(item);
    removedList.value.delete(item);
    removedList.value = new Set(removedList.value);
}




</script>
<template>
    <div class="w-full">
        <h1 class="p-2 text-indigo-300 text-xl">{{ listData.title }}</h1>
        <section>
            <h2 class="pt-4 p-2 text-indigo-100 text-l">To buy:</h2>
            <ShoppingListComp v-if="shoppingList.size" :list="shoppingList" @remove-item="handleAddToBasket" />
            <div v-else
                class="text-center text-indigo-300 border-indigo-300 bg-indigo-300/25 border border-dashed rounded p-2 mb-2">
                {{ removedList.size ? "You've got everything!" : "Add some items below..." }}
            </div>
            <ListInput :topics="[listData.title]" @submit-item="addToList" />

        </section>
        <section>
            <h2 class="pt-4 p-2 text-indigo-100 text-l">In the basket:</h2>

            <ShoppingListComp v-if="removedList.size" :list="removedList" theme="deleted"
                @remove-item="handleReAddToList" />
            <div v-else
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
import ShoppingListComp from './ShoppingListComp.vue';

interface Props {
    listData: ListDataWithProducts;
}

const { listData } = defineProps<Props>();

const shoppingList = ref(new Set<ShoppingItem>());
const removedList = ref(new Set<ShoppingItem>());

if (listData.products) {
        // Filter out null and duplicated values from the products array
        const validProducts = Array.from(listData.products).filter((product): product is ShoppingItem => product !== null);
        shoppingList.value = new Set(validProducts)
    }

const addToList = async (item: ShoppingItem) => {
    await $fetch(`/api/products/add-product-to-list`, { method: 'POST', body: JSON.stringify({ productId: item.id, listId: listData.id }) })
    shoppingList.value = new Set([...Array.from(shoppingList.value), item]);
};

const handleAddToBasket = async (item: ShoppingItem) => {
    const response = await $fetch(`/api/products/remove-product-from-list?productId=${item.id}&listId=${listData.id}`, { method: 'DELETE' });
    shoppingList.value = new Set(response);
    removedList.value = (new Set(removedList.value.add(item)));
}

const handleReAddToList = async (item: ShoppingItem) => {
    await addToList(item);
    removedList.value.delete(item);
    removedList.value = new Set(removedList.value);
}




</script>
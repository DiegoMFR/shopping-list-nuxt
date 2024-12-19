<template>
    <div class="w-full relative">
        <form autoComplete="off" class="flex" @submit="submit">
            <input type="text" name="itemName"
                class="bg-transparent border border-indigo-500 rounded-md p-2 grow mr-2 text-indigo-100" :value=inputVal
                placeholder="Type an item here..." @keyup="filterList">
            <button type="submit" :disabled="!inputVal"
                class="bg-indigo-500 text-indigo-100 disabled:bg-transparent disabled:border disabled:border-dashed disabled:text-indigo-500 disabled:border-indigo-500 disabled:bg-indigo-500/25 rounded-md px-4 py-2">Add</button>
        </form>

        <ul v-if="aiSuggestions.length || isLoadingSuggestions"
            class="p-2 rounded-md bg-purple-900 mt-2 h-64 overflow-y-auto absolute left-0 right-0">
            <li v-for="(suggestion, index) in aiSuggestions" :key="index" class="mb-1">
                <button
                    class="w-full text-left text-indigo-100 p-2 bg-purple-800 hover:bg-purple-700 active:bg-indigo-700 rounded-md"
                    @click="handleSuggestion(suggestion)">
                    {{ suggestion }}
                </button>
            </li>

            <li v-if="isLoadingSuggestions" key="loadingMore" class="p-2">Loading...</li>
        </ul>

    </div>
</template>
<script setup lang="ts">
import { addEmoji, getSuggestions } from '~/actions/ai.actions';
import type { ShoppingItem, ShoppingList } from '~/types';

interface Props {
    topics: Array<string>
}

const { topics = ['general'] } = defineProps<Props>();

const items = ref<ShoppingList>([]);
const aiSuggestions = ref<Array<string>>([]);
const inputVal = ref('');
const isLoadingSuggestions = ref(false);

const emit = defineEmits(['submitItem']);

onBeforeMount(() => {
    fetchData();
})

const fetchData = async () => {
    try {
        const response = await $fetch('/api/list-products', { method: 'GET' });
        if (Array.isArray(response)) {
            items.value = response;
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const handleSubmit = (item: ShoppingItem) => {
    emit('submitItem', item)
}

const addToList = async (itemName: string): Promise<ShoppingItem> => {
    const foundItem = Array.from(items.value)?.find(item => item.name === itemName);
    let resultItem = foundItem;
    if (!foundItem) {
        const newItem = await $fetch<ShoppingItem>(`/api/products/add-product?productName=${itemName}&productIcon=noIcon`, { method: 'POST' });
        resultItem = newItem;
    }

    if(!resultItem) {
        throw new Error('Failed to add item to list');
    }

    items.value = [...Array.from(items.value), resultItem];

    return resultItem;
}

const submit = async (e: FormDataEvent) => {
    e.preventDefault();
    const withEmoji = await addEmoji(inputVal.value);
    handleSubmit(await addToList(withEmoji));
    inputVal.value = '';
    aiSuggestions.value = [];
}

const filterList = async (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    inputVal.value = value;
    if (value.length > 2 && !isLoadingSuggestions.value) {
        isLoadingSuggestions.value = true;
        const response = await getSuggestions(inputVal.value, topics);
        aiSuggestions.value = (response.items.map(i => `${i.emoji} ${i.item}`));
        isLoadingSuggestions.value = false;
    }
}

const handleSuggestion = async (suggestion: string) => {
    const item = await addToList(suggestion);
    handleSubmit(item);
    inputVal.value = '';
    aiSuggestions.value = [];
}

</script>
<template>
    <div class="w-full relative">
        <form autoComplete="off" class="flex" @submit="submit">
            <input 
                type="text" name="itemName"
                class="bg-transparent border border-indigo-500 rounded-md p-2 grow mr-2 text-indigo-100"
                :value=inputVal placeholder="Type an item here..." @change="filterList">
            <button 
                type="submit" :disabled="!inputVal"
                class="bg-indigo-500 text-indigo-100 disabled:bg-transparent disabled:border disabled:border-dashed disabled:text-indigo-500 disabled:border-indigo-500 disabled:bg-indigo-500/25 rounded-md px-4 py-2">Add</button>
        </form>

        <ul 
            v-if="aiSuggestions.length || isLoadingSuggestions"
            class="p-2 rounded-md bg-purple-900 mt-2 h-64 overflow-y-auto absolute left-0 right-0">
            <li v-for="(suggestion, index) in aiSuggestions" :key="index" class="mb-1">
                <button
                    class="w-full text-left text-indigo-100 p-2 bg-purple-800 hover:bg-purple-700 active:bg-indigo-700 rounded-md"
                    @click="handleSuggestion(suggestion)">
                    {suggestion}
                </button>
            </li>
           
            <li v-if="isLoadingSuggestions" key="loadingMore" class="p-2">Loading...</li>
        </ul>

    </div>
</template>
<script setup lang="ts">
import { addEmoji, getSuggestions } from '~/actions/ai.actions';
import type { ShoppingItem, ShoppingList } from '~/server/api/products';


interface Props {
    topics: Array<string>
}

const { topics = ['general'] } = defineProps<Props>();

const items = ref<ShoppingList>(new Set());
const aiSuggestions = ref<Array<string>>([]);
const inputVal = ref('');
const isLoadingSuggestions = ref(false);

const emit = defineEmits(['submitItem']);

onBeforeMount(() => {
    fetchData();
})

const fetchData = async () => {
    try {
        // const {response} = await $fetch('/list-products', { method: 'GET'});
        // const { products } = await response.json();
        // items.value = products;

        const aiSuggestionsResponse = await $fetch('/api/ai/getSuggestions', { method: 'GET'});
        console.log(aiSuggestionsResponse);


    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const handleSubmit = (item: ShoppingItem) => {
    emit('submitItem', item)
}

const addToList = async (itemName: string): Promise<ShoppingItem> => {
    const foundItem = Array.from(items.value)?.find(item => item.name === itemName);
    let itemId = foundItem?.id ?? '';
    if (!foundItem) {
        const response = await fetch(`/add-product?productName=${itemName}&productIcon=noIcon`, { method: 'POST' });
        const { id } = await response.json();
        itemId = id;
    }

    const newItem: ShoppingItem = {
        name: foundItem?.name ?? itemName,
        icon: foundItem?.icon ?? '',
        id: itemId,
    };

    items.value = new Set([...Array.from(items.value), newItem]);

    return newItem;
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
        const { object } = await getSuggestions(value, topics);

        for await (const partialObject of readStreamableValue(object)) {
            if (partialObject) {
                aiSuggestions.value = (partialObject);
                isLoadingSuggestions.value = false;
            }
        }

    }
}

const handleSuggestion = async (suggestion: string) => {
    const item = await addToList(suggestion);
    handleSubmit(item);
    inputVal.value = '';
    aiSuggestions.value = [];
}

</script>
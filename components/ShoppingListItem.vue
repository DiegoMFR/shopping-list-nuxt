<template>
    <li class="mb-2">
        <button
            :class="theme === 'added' ? 'bg-indigo-500/25' : 'bg-indigo-800/25 text-indigo-300 border border-indigo-800'"
            class= "rounded-md px-4 py-2 block cursor-pointer w-full text-left`" @click="handleClick">
            {{listItem.name}}
        </button>
    </li>
</template>
<script setup lang="ts">
import type { ShoppingItem } from '~/server/api/products';

interface Props {
    listItem: ShoppingItem
    theme?: 'added' | 'deleted'
};

const emit = defineEmits(['list-item-click'])

const { listItem, theme } = defineProps < Props > ()
const handleClick = () => {
 console.log(listItem)
 emit('list-item-click', listItem);
}
</script>
<template>
    <ul className="w-full p-0 m-0 place-content-center grow">
        <ShoppingListItem
            v-for="item of list" :key="item.id" :list-item="item" :theme="theme"
            @list-item-click="handleClick" />
    </ul>
</template>
<script setup lang="ts">

interface Props {
    list: ShoppingList;
    theme?: 'added' | 'deleted';
}

const { list } = defineProps<Props>();

const emit = defineEmits(['remove-item']);

const handleClick = (item: ShoppingItem) => {
   emit('remove-item', item);
}
</script>
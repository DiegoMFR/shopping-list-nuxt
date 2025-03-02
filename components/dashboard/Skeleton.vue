<template>
    <div class="grid grid-cols-8 auto-rows-max gap-4 content-center">
        <div v-for="item in [1, 2, 3, 4]" :key="item" class="bg-indigo-500/75 rounded-md col-span-2 rounded-md p-4 bg-indigo-900/50 overflow-hidden">
            <div class="animate-pulse flex space-x-4 grow">
                <div class="flex-1 space-y-2 py-4">
                    <div class="h-4 bg-indigo-900 rounded-full w-32"/>
                    <div class="h-4 bg-indigo-900 rounded-full w-16"/>
                </div>
            </div>
        </div>        
    </div>
</template>
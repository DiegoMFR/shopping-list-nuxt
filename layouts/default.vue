<template>
    <div class="h-screen w-screen antialiased bg-gradient-to-br from-indigo-900/75 via-purple-900/75 to-pink-900/75">
        <!-- <AppHeader /> -->
        <main class="grid grid-cols-8 items-center h-full">
            <slot/>
        </main>
        <footer class="row-start-3 flex gap-6 flex-wrap items-center justify-center text-indigo-500">
          Created with love in Almere
        </footer>
    </div>
</template>
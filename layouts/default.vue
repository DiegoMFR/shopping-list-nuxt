<template>
    <div class="h-screen w-screen antialiased bg-gradient-to-br from-indigo-900/75 via-purple-900/75 to-pink-900/75">
        <AppHeader />
        <main>
            <slot />
        </main>
        <AppFooter />
    </div>
</template>
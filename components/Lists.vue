<template>
    <section>
        <H1>Your lists:</H1>
        <pre>{{ data }}</pre>
    </section>
</template>


<script setup lang="ts">
const { data } = await useFetch('/api/lists')
</script>

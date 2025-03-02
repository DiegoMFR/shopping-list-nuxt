<script setup lang="ts">
const { siteName } = useAppConfig();
useHead({
	titleTemplate(title) {
		return title ? `${title} | ${siteName}` : `${siteName}`;
	},
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
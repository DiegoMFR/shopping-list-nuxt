export async function getSuggestions(input: string, topics: string[]) {

    const {response} = await $fetch('/api/ai/get-suggestions', { method: 'POST', body: { input, topics } });
    return JSON.parse(String(response));
}

export async function addEmoji(input: string) {
    return await $fetch('/api/ai/get-emoji', { method: 'POST', body: { input } });
}
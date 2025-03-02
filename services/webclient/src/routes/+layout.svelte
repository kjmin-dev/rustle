<script lang="ts">
    import { browser } from '$app/environment';
    import { i18n } from '$lib/i18n';
    import { ParaglideJS } from '@inlang/paraglide-sveltekit';
    import { onMount } from 'svelte';
    import '../app.css';
    let { children } = $props();

    onMount(() => {
        if (browser === false) {
            return;
        }
        const colorTheme = localStorage.getItem('color-theme');
        const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;

        if (colorTheme === 'dark' || (!colorTheme && systemTheme)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
</script>

<ParaglideJS {i18n}>
    {@render children()}
</ParaglideJS>

<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { i18n } from '$lib/i18n';
    import * as m from '$lib/paraglide/messages.js';
    import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
    import { Alert, Button } from 'flowbite-svelte';

    function switchToLanguage(newLanguage: AvailableLanguageTag) {
        const canonicalPath = i18n.route(page.url.pathname);
        const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
        goto(localisedPath);
    }
</script>

<Alert>
    {m.hello_world({ name: 'SvelteKit User' })}
</Alert>

<div>
    <Button onclick={() => switchToLanguage('en')}>en</Button>
    <Button onclick={() => switchToLanguage('ko')}>ko</Button>
</div>

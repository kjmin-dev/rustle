<script lang="ts">
import TopNav from '../../components/common/TopNav.svelte';
let { children } = $props();
</script>

<TopNav />

{@render children()}

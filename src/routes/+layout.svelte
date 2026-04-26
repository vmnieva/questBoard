<script>
	import favicon from '$lib/assets/favicon.svg';
	import { i18n } from '$lib/services/i18nService.svelte.js';
	import { onMount } from 'svelte';
	import AppFooter from '$lib/components/ui/AppFooter.svelte';

	let { children } = $props();

	onMount(() => {
		i18n.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<AppFooter />

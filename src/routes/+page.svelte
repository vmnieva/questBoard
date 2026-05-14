<script>
  import { resolve } from '$app/paths';
  import { i18n } from '$lib/services/i18nService.svelte.js';
</script>

<main class="container home">
  <h1>QuestBoard</h1>
  <p>{i18n.t('home_description')}</p>

  <a class="btn-primary" href={resolve('/tablero')}>{i18n.t('go_to_editor')}</a>
</main>

<style>
  .home {
    display: grid;
    gap: 1.5rem;
    justify-items: start;
    padding-block: 2rem;
  }

  h1 {
    font-size: 2.5rem;
  }
</style>

<script>
  import { resolve } from '$app/paths';
  import { i18n } from '$lib/services/i18nService.svelte.js';
</script>

<main class="container home">
  <h1>QuestBoard</h1>
  <p>{i18n.t('home_description')}</p>

  <a class="cta" href={resolve('/tablero')}>{i18n.t('go_to_editor')}</a>
</main>

<style>
  .home {
    display: grid;
    gap: 1rem;
    justify-items: start;
    padding-block: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    color: #334155;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    background: #2563eb;
    color: #f8fafc;
    font-weight: 600;
    transition: background 0.2s ease;
  }

  .cta:hover {
    background: #1d4ed8;
  }
</style>

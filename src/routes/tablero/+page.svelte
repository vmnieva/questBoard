<script>
  import Board from '$lib/components/board/Board.svelte';
  import TokenEditor from '$lib/components/characters/TokenEditor.svelte';
  import { i18n } from '$lib/services/i18nService.svelte.js';
</script>

<main class="container tablero-page">
  <h1>{i18n.t('board_editor_title')}</h1>
  <Board />
</main>

<TokenEditor />

<style>
  .tablero-page {
    display: grid;
    gap: 1rem;
    padding-block: 1.25rem;
  }

  h1 {
    font-size: 1.5rem;
  }
</style>

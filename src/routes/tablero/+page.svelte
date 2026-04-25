<script>
  import Board from '$lib/components/board/Board.svelte';
  import TokenEditor from '$lib/components/characters/TokenEditor.svelte';
</script>

<main class="container tablero-page">
  <h1>Editor de tablero</h1>
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

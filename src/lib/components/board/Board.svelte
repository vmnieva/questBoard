<script>
  export let title = 'Tablero';
  import { uuidv4 } from '$lib/utils/uuid.js';
  let id = uuidv4();
</script>

<section class="board">
  <h2>{title}</h2>
  <p>ID: {id}</p>
</section>

<style>
  .board {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 6px;
  }
</style>

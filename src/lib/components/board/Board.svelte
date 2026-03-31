<script>
  import { onMount } from 'svelte';
  import Toolbar from './Toolbar.svelte';
  import {
    addObject,
    createBoard,
    deserialize,
    serialize,
  } from '$lib/services/boardService';

  export let rows = 12;
  export let cols = 16;
  export let cellSize = 48;

  const STORAGE_KEY = 'questboard.board';
  const SAVE_THROTTLE_MS = 250;

  let board = createBoard({ rows, cols, cellSize });
  let saveTimer;

  $: boardWidth = cols * cellSize;
  $: boardHeight = rows * cellSize;
  $: gridCells = Array.from({ length: rows * cols }, (_, index) => index);

  onMount(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed = deserialize(raw);
        if (parsed?.meta && Array.isArray(parsed?.objects)) {
          board = parsed;
        }
      } catch {
        // ignore malformed data and keep default board
      }
    }

    return () => {
      clearTimeout(saveTimer);
    };
  });

  $: if (board) {
    throttleSave();
  }

  function throttleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, serialize(board));
    }, SAVE_THROTTLE_MS);
  }

  function handleAddObject(obj) {
    board = addObject(board, obj);
  }
</script>

<section
  class="board-shell"
  style={`--board-width:${boardWidth}px; --board-height:${boardHeight}px; --cell:${cellSize}px;`}
>
  <div
    class="board-grid"
    style={`grid-template-columns: repeat(${cols}, ${cellSize}px); grid-template-rows: repeat(${rows}, ${cellSize}px);`}
    aria-label="Grid board"
  >
    {#each gridCells as index (index)}
      <span class="grid-cell" aria-hidden="true"></span>
    {/each}

    {#each board.objects as obj (obj.id)}
      <article
        class={`board-object object-${obj.type}`}
        style={`left:${obj.x * cellSize}px; top:${obj.y * cellSize}px; width:${(obj.w ?? 1) * cellSize}px; height:${(obj.h ?? 1) * cellSize}px;`}
      >
        {obj.label ?? obj.type}
      </article>
    {/each}
  </div>

  <Toolbar onAdd={handleAddObject} />
</section>

<style>
  .board-shell {
    position: relative;
    width: calc(var(--board-width) + 2rem);
    max-width: 100%;
    min-height: calc(var(--board-height) + 5rem);
    padding: 1rem 1rem 4.25rem;
    border: 1px solid #cbd5e1;
    border-radius: 1rem;
    background: #ffffff;
    overflow: auto;
  }

  .board-grid {
    position: relative;
    width: var(--board-width);
    height: var(--board-height);
    display: grid;
    border: 1px solid #d5dde9;
    background: #f8fafc;
  }

  .grid-cell {
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
  }

  .board-object {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    border: 1px solid transparent;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    pointer-events: none;
  }

  .object-wall {
    background: #334155;
    color: #f8fafc;
  }

  .object-door {
    background: #b45309;
    color: #fffbeb;
  }

  .object-token {
    background: #1d4ed8;
    color: #eff6ff;
    border-radius: 999px;
  }

  .object-note {
    background: #fef08a;
    color: #713f12;
    border-color: #facc15;
  }
</style>

<script>
  import { createObject } from '$lib/services/boardService';

  let { onAdd, onClear } = $props();

  const TOOL_TYPES = ['wall', 'door', 'token', 'note'];

  function handleAdd(type) {
    onAdd(createObject(type));
  }
</script>

<nav class="toolbar" aria-label="Board toolbar">
  {#each TOOL_TYPES as type (type)}
    <button type="button" class="tool-btn" onclick={() => handleAdd(type)}>
      {type[0].toUpperCase() + type.slice(1)}
    </button>
  {/each}

  <button type="button" class="tool-btn clear-btn" onclick={onClear}>
    Limpiar All
  </button>
</nav>

<style>
  .toolbar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    padding: 0.75rem;
    border-top: 1px solid #dbe4f0;
    background: rgba(248, 250, 252, 0.95);
    backdrop-filter: blur(2px);
  }

  .tool-btn {
    border: 1px solid #cbd5e1;
    background: white;
    color: #0f172a;
    border-radius: 0.5rem;
    padding: 0.45rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
  }

  .tool-btn:hover {
    background: #f8fafc;
  }

  .clear-btn {
    border-color: #ef4444;
    color: #ef4444;
  }
  
  .clear-btn:hover {
    background: #fef2f2;
  }
</style>

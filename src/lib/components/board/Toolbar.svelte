<script>
  export let onAdd = () => {};

  const TOOL_TYPES = ['wall', 'door', 'token', 'note'];

  function createDefaultObject(type) {
    return {
      type,
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      label: type === 'note' ? 'Nota' : undefined,
    };
  }

  function handleAdd(type) {
    onAdd(createDefaultObject(type));
  }
</script>

<nav class="toolbar" aria-label="Board toolbar">
  {#each TOOL_TYPES as type (type)}
    <button type="button" class="tool-btn" on:click={() => handleAdd(type)}>
      {type[0].toUpperCase() + type.slice(1)}
    </button>
  {/each}
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
</style>

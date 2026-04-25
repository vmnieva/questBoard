<script>
  import { createObject } from '$lib/services/boardService.svelte.js';

  let { onAdd, onClear } = $props();

  const TOOL_TYPES = ['wall', 'door', 'token', 'note'];

  let showConfirmClear = $state(false);

  function handleAdd(type) {
    onAdd(createObject(type));
  }

  function handleClearClick() {
    showConfirmClear = true;
  }

  function confirmClear() {
    onClear();
    showConfirmClear = false;
  }

  function cancelClear() {
    showConfirmClear = false;
  }
</script>

<nav class="toolbar" aria-label="Board toolbar">
  {#each TOOL_TYPES as type (type)}
    <button type="button" class="tool-btn" onclick={() => handleAdd(type)}>
      {type[0].toUpperCase() + type.slice(1)}
    </button>
  {/each}

  <button type="button" class="tool-btn clear-btn" onclick={handleClearClick}>
    Limpiar Tablero
  </button>
</nav>

{#if showConfirmClear}
  <div class="confirm-backdrop" onpointerdown={cancelClear} aria-hidden="true"></div>
  <div class="confirm-dialog" role="alertdialog">
    <p>¿Seguro que quieres borrar todas las fichas?</p>
    <div class="confirm-actions">
      <button type="button" class="dialog-btn cancel-btn" onclick={cancelClear}>No</button>
      <button type="button" class="dialog-btn confirm-btn" onclick={confirmClear}>Sí</button>
    </div>
  </div>
{/if}

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

  .confirm-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(4px);
    z-index: 100;
  }

  .confirm-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    z-index: 101;
    width: 90%;
    max-width: 320px;
    text-align: center;
    animation: popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .confirm-dialog p {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #0f172a;
  }

  .confirm-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  }

  .dialog-btn {
    flex: 1;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .dialog-btn.cancel-btn {
    background: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .dialog-btn.cancel-btn:hover {
    background: #e2e8f0;
  }

  .dialog-btn.confirm-btn {
    background: #ef4444;
    color: white;
    border: 1px solid #dc2626;
  }

  .dialog-btn.confirm-btn:hover {
    background: #dc2626;
  }

  @keyframes popIn {
    from {
      opacity: 0;
      transform: translate(-50%, -45%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
</style>

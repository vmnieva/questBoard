<script>
  import { createObject } from '$lib/services/boardService.svelte.js';
  import { i18n } from '$lib/services/i18nService.svelte.js';

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

<nav class="toolbar card" aria-label="Board toolbar">
  <div class="tool-group">
    {#each TOOL_TYPES as type (type)}
      <button type="button" class="tool-btn" onclick={() => handleAdd(type)}>
        {#if type === 'wall'}
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path><path d="M4 16v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"></path><path d="M9 4v4"></path><path d="M15 4v4"></path><path d="M9 16v4"></path><path d="M15 16v4"></path><path d="M4 12h16"></path></svg>
        {:else if type === 'door'}
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22v-4a2 2 0 1 0-4 0v4"></path><path d="M18 22V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v17"></path><path d="M14 12h.01"></path></svg>
        {:else if type === 'token'}
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        {:else}
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        {/if}
        {i18n.t('add_' + type)}
      </button>
    {/each}
  </div>

  <button type="button" class="tool-btn clear-btn" onclick={handleClearClick}>
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
    {i18n.t('clear_board')}
  </button>
</nav>

{#if showConfirmClear}
  <div class="confirm-backdrop" onpointerdown={cancelClear} aria-hidden="true"></div>
  <div class="confirm-dialog card" role="alertdialog">
    <p>{i18n.t('confirm_clear')}</p>
    <div class="confirm-actions">
      <button type="button" class="btn-secondary" onclick={cancelClear}>{i18n.t('no')}</button>
      <button type="button" class="btn-primary" onclick={confirmClear}>{i18n.t('yes')}</button>
    </div>
  </div>
{/if}

<style>
  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.25rem;
    background-color: #f1ebe1; /* Lighter warm shade for the box */
    border: none;
    box-shadow: none;
    border-radius: var(--radius-card);
  }

  .tool-group {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }

  .tool-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--color-surface);
    color: var(--color-text-muted);
    border-radius: var(--radius-btn);
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    border: 1px solid var(--color-border);
    transition: all 0.2s;
  }

  .tool-btn:hover {
    background: var(--color-bg);
    color: var(--color-text-main);
  }

  /* Simulate active state on first child for mockup fidelity */
  .tool-group .tool-btn:first-child {
    background: var(--color-text-main);
    color: var(--color-surface);
    border-color: var(--color-text-main);
  }

  .clear-btn {
    align-self: flex-start;
    border: 1px solid rgba(220, 38, 38, 0.4);
    color: #dc2626;
    background: transparent;
    padding: 0.6rem 1.25rem;
    border-radius: var(--radius-btn);
  }

  .clear-btn:hover {
    background: rgba(254, 242, 242, 0.5);
    border-color: #dc2626;
  }

  .confirm-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(58, 48, 42, 0.4);
    backdrop-filter: blur(4px);
    z-index: 100;
  }

  .confirm-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    color: var(--color-text-main);
  }

  .confirm-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
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

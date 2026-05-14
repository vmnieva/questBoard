<script>
  import {
    uiState,
    boardState,
    deselectToken,
    removeObject,
  } from '$lib/services/boardService.svelte.js';
  import { i18n } from '$lib/services/i18nService.svelte.js';

  // Derivamos el objeto actual (ficha, muro, puerta o nota)
  let selectedToken = $derived(
    boardState.objects.find((obj) => obj.id === uiState.selectedTokenId),
  );

  function getDefaultColor(type) {
    switch (type) {
      case 'wall':
        return '#334155';
      case 'door':
        return '#b45309';
      case 'note':
        return '#fef08a';
      default:
        return '#1d4ed8'; // default token color
    }
  }

  function handleDelete() {
    if (selectedToken) {
      removeObject(selectedToken.id);
      deselectToken();
    }
  }
</script>

{#if selectedToken}
  <!-- Backdrop semi-transparente para cerrar al pulsar fuera -->
  <div class="backdrop" onpointerdown={deselectToken} aria-hidden="true"></div>

  <aside class="token-editor-sheet" aria-label="Token editor">
    <div class="sheet-header">
      <h3>{i18n.t('edit_token')}</h3>
      <button
        type="button"
        class="close-btn"
        onclick={deselectToken}
        aria-label={i18n.t('close_panel')}
      >
        &times;
      </button>
    </div>

    <div class="sheet-body">
      <div class="field">
        <label for="token-label">{i18n.t('initials')}</label>
        <!-- Bind bidireccional reactivo. Actualizarlo fuerza el autoguardado de Svelte 5 -->
        <input
          id="token-label"
          type="text"
          maxlength="3"
          bind:value={selectedToken.label}
          placeholder={i18n.t('eg_p1')}
          autocomplete="off"
        />
      </div>

      <div class="field">
        <label for="token-color">{i18n.t('base_color')}</label>
        <div class="color-picker-wrapper">
          <input
            id="token-color"
            type="color"
            value={selectedToken.color || getDefaultColor(selectedToken.type)}
            oninput={(e) => (selectedToken.color = e.currentTarget.value)}
          />
          <span class="color-hex">{selectedToken.color || i18n.t('default_color')}</span>
        </div>
      </div>
    </div>

    <button type="button" class="delete-full-btn" onclick={handleDelete}>
      🗑️ {i18n.t('delete_token')}
    </button>
  </aside>
{/if}

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(58, 48, 42, 0.4); /* Sahara dark transparent */
    z-index: 40;
    backdrop-filter: blur(2px);
    animation: fadeIn 0.2s ease-out;
  }

  .token-editor-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: var(--color-surface);
    border-radius: 1.5rem 1.5rem 0 0;
    box-shadow: var(--shadow-soft);
    z-index: 150; /* Ensure above BottomNav */
    padding: 1.5rem 1.5rem 2.5rem 1.5rem;
    animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    box-sizing: border-box;
    border-top: 1px solid var(--color-border);
  }

  .sheet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1rem;
  }

  .sheet-header h3 {
    margin: 0;
    font-family: var(--font-heading);
    font-style: italic;
    font-size: 1.5rem;
    color: var(--color-text-main);
    font-weight: 500;
  }

  .close-btn {
    background: transparent;
    border: 1px solid var(--color-border);
    font-size: 1.5rem;
    line-height: 1;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    color: var(--color-text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .close-btn:hover {
    background: var(--color-bg);
    color: var(--color-text-main);
    transform: scale(1.05);
  }

  .sheet-body {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .field label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    font-weight: 700;
  }

  .field input[type='text'] {
    width: 100%;
    padding: 0.875rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-btn);
    font-size: 1.125rem;
    text-align: center;
    text-transform: uppercase;
    font-weight: 800;
    color: var(--color-text-main);
    background: var(--color-surface);
    transition: all 0.2s;
    box-sizing: border-box;
  }

  .field input[type='text']:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  .color-picker-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.35rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-btn);
    background: var(--color-surface);
    box-sizing: border-box;
  }

  .field input[type='color'] {
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    background: transparent;
  }

  .field input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  .field input[type='color']::-webkit-color-swatch {
    border: none;
    border-radius: 0.5rem;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  .color-hex {
    font-family: monospace;
    font-size: 0.95rem;
    color: var(--color-text-muted);
    font-weight: 600;
    text-transform: uppercase;
  }

  .delete-full-btn {
    margin-top: 0.5rem;
    width: 100%;
    padding: 0.875rem;
    background: transparent;
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.4);
    border-radius: var(--radius-btn);
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .delete-full-btn:hover {
    background: rgba(254, 242, 242, 0.5);
    border-color: #ef4444;
    transform: scale(0.98);
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

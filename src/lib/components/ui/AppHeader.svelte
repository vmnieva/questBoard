<script>
  import { i18n } from '$lib/services/i18nService.svelte.js';
</script>

<header class="app-header">
  <button type="button" class="menu-btn" aria-label="Menu">
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  </button>
  
  <h1 class="logo">Sahara RPG</h1>
  
  <!-- Avatar placeholder -->
  <div class="avatar">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  </div>
</header>

<style>
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: var(--color-bg);
  }

  .menu-btn {
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
  }

  .logo {
    font-family: var(--font-heading);
    font-style: italic;
    font-weight: 500;
    font-size: 1.5rem;
    color: var(--color-primary);
    margin: 0;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary);
    overflow: hidden;
  }
  
  .avatar svg {
    width: 20px;
    height: 20px;
    margin-top: 4px;
  }
</style>

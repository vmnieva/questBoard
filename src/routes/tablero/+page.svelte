<script>
  import AppHeader from '$lib/components/ui/AppHeader.svelte';
  import BottomNav from '$lib/components/ui/BottomNav.svelte';
  import Board from '$lib/components/board/Board.svelte';
  import TokenEditor from '$lib/components/characters/TokenEditor.svelte';
  import { i18n } from '$lib/services/i18nService.svelte.js';
</script>

<AppHeader />

<main class="container tablero-page">
  <div class="page-header">
    <h1>Editor de tablero</h1>
    <p class="subtitle">Dungeon: Sands of Time • Session #12</p>
    
    <div class="header-actions">
      <button type="button" class="btn-secondary">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
        Share Board
      </button>
      <button type="button" class="btn-primary">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        Save State
      </button>
    </div>
  </div>

  <Board />

  <section class="assets-section">
    <h2>Assets</h2>
    <div class="assets-grid">
      <div class="asset-card card">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="var(--color-primary)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 22h20L12 2z"></path><path d="M12 12l4 8"></path></svg>
        <span>Terrain</span>
      </div>
      <div class="asset-card card">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="var(--color-primary)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
        <span>Liquid</span>
      </div>
      <div class="asset-card card">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="var(--color-primary)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path></svg>
        <span>Hazards</span>
      </div>
      <div class="asset-card card">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="var(--color-primary)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><circle cx="15.5" cy="8.5" r="1.5"></circle><circle cx="15.5" cy="15.5" r="1.5"></circle><circle cx="8.5" cy="15.5" r="1.5"></circle></svg>
        <span>Props</span>
      </div>
    </div>
  </section>

  <section class="history-section card">
    <h2>History</h2>
    <ul class="history-list">
      <li class="history-item">
        <div class="history-icon type-wall"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path><path d="M4 16v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"></path><path d="M9 4v4"></path><path d="M15 4v4"></path><path d="M9 16v4"></path><path d="M15 16v4"></path><path d="M4 12h16"></path></svg></div>
        <div class="history-content">
          <strong>Azra placed a wall</strong>
          <small>2 minutes ago</small>
        </div>
      </li>
      <li class="history-item">
        <div class="history-icon type-token"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
        <div class="history-content">
          <strong>Drakos moved Token</strong>
          <small>5 minutes ago</small>
        </div>
      </li>
      <li class="history-item">
        <div class="history-icon type-note"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
        <div class="history-content">
          <strong>Added note: "Trap?"</strong>
          <small>12 minutes ago</small>
        </div>
      </li>
    </ul>
  </section>

</main>

<BottomNav />
<TokenEditor />

<style>
  .tablero-page {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-block: 1.5rem 6rem; /* extra padding for bottom nav */
  }

  .page-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .page-header h1 {
    font-size: 2.25rem;
    font-style: italic;
    color: var(--color-text-main);
  }

  .subtitle {
    color: var(--color-text-muted);
    font-size: 0.875rem;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .header-actions button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    padding: 0.65rem 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-style: italic;
    margin-bottom: 1rem;
    color: var(--color-text-main);
  }

  .assets-section {
    display: flex;
    flex-direction: column;
  }

  .assets-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .asset-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 2rem;
    border-radius: var(--radius-card);
    background: transparent;
    cursor: pointer;
    transition: background 0.2s;
  }

  .asset-card:hover {
    background: var(--color-surface);
  }

  .asset-card span {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-main);
  }

  .history-section {
    padding: 1.5rem;
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .history-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 0;
  }

  .history-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .history-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .history-icon.type-wall {
    background: #fdf5f0;
    color: #c2652a;
  }

  .history-icon.type-token {
    background: #fdf5f5;
    color: #8c3c3c;
  }

  .history-icon.type-note {
    background: #e2e8f0;
    color: #3a302a;
  }

  .history-content {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .history-content strong {
    font-size: 0.9rem;
    color: var(--color-text-main);
  }

  .history-content small {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
</style>

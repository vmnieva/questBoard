<script>
  import Toolbar from './Toolbar.svelte';
  import { i18n } from '$lib/services/i18nService.svelte.js';
  import {
    boardState,
    uiState,
    addObject,
    removeObject,
    clearObjects,
    updateObject,
    deselectToken,
    selectToken,
  } from '$lib/services/boardService.svelte.js';

  let { rows = 11, cols = 15, cellSize = 50 } = $props();

  let effectiveCols = $derived(boardState.meta?.cols ?? cols);
  let effectiveRows = $derived(boardState.meta?.rows ?? rows);
  let effectiveCellSize = $derived(boardState.meta?.cellSize ?? cellSize);

  let boardWidth = $derived(effectiveCols * effectiveCellSize);
  let boardHeight = $derived(effectiveRows * effectiveCellSize);

  let gridCells = $derived(
    Array.from({ length: effectiveRows * effectiveCols }, (_, index) => index),
  );

  function getObjectById(objId) {
    return boardState.objects.find((obj) => obj.id === objId);
  }

  function clampObjectPosition(obj, rawX, rawY) {
    const width = (obj.w ?? 1) * effectiveCellSize;
    const height = (obj.h ?? 1) * effectiveCellSize;
    const maxX = Math.max(0, boardWidth - width);
    const maxY = Math.max(0, boardHeight - height);

    return {
      x: Math.min(Math.max(0, rawX), maxX),
      y: Math.min(Math.max(0, rawY), maxY),
    };
  }

  function snapToGrid(objId) {
    const current = getObjectById(objId);

    if (!current) {
      return;
    }

    const snapped = clampObjectPosition(
      current,
      Math.round((current.x ?? 0) / effectiveCellSize) * effectiveCellSize,
      Math.round((current.y ?? 0) / effectiveCellSize) * effectiveCellSize,
    );

    updateObject(objId, snapped);
  }

  function makeObjectDraggable(node, objId) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let initialObjX = 0;
    let initialObjY = 0;

    let lastTapTime = 0;

    function onPointerDown(e) {
      if (!e.isPrimary) return;

      // Capture the pointer to not lose tracking if user drags really fast outside the element
      node.setPointerCapture(e.pointerId);

      const obj = getObjectById(objId);
      if (!obj) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      initialObjX = obj.x ?? 0;
      initialObjY = obj.y ?? 0;
    }

    function onPointerMove(e) {
      if (!isDragging) return;

      lastX = e.clientX;
      lastY = e.clientY;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Es un arrastre -> calcular nueva posición ajustada a grid
      const next = clampObjectPosition(
        getObjectById(objId),
        initialObjX + dx,
        initialObjY + dy,
      );

      updateObject(objId, next);
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      try {
        if (node.hasPointerCapture(e.pointerId)) {
          node.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}

      snapToGrid(objId);

      // Detect tap vs drag
      const distanceX = Math.abs(e.clientX - startX);
      const distanceY = Math.abs(e.clientY - startY);

      if (distanceX <= 5 && distanceY <= 5) {
        const now = Date.now();
        if (now - lastTapTime < 500) {
          // Es un doble tap / click
          selectToken(objId);
          lastTapTime = 0; // Resetear para evitar triples taps
        } else {
          lastTapTime = now;
        }
      }
    }

    node.addEventListener('pointerdown', onPointerDown);
    node.addEventListener('pointermove', onPointerMove);
    node.addEventListener('pointerup', onPointerUp);
    node.addEventListener('pointercancel', onPointerUp);

    return {
      destroy() {
        node.removeEventListener('pointerdown', onPointerDown);
        node.removeEventListener('pointermove', onPointerMove);
        node.removeEventListener('pointerup', onPointerUp);
        node.removeEventListener('pointercancel', onPointerUp);
      },
    };
  }

  function handleAddObject(obj) {
    addObject({
      ...obj,
      x: obj.x ?? 0,
      y: obj.y ?? 0,
    });
  }

  function handleClearAll() {
    clearObjects();
    deselectToken();
  }
</script>

<div class="board-wrapper">
  <section
    class="board-shell card"
    style={`--board-width:${boardWidth}px; --board-height:${boardHeight}px; --cell:${cellSize}px;`}
  >
    <div
      class="board-grid"
      style={`grid-template-columns: repeat(${effectiveCols}, ${effectiveCellSize}px); grid-template-rows: repeat(${effectiveRows}, ${effectiveCellSize}px);`}
      aria-label="Grid board"
    >
      {#each gridCells as index (index)}
        <span class="grid-cell" aria-hidden="true"></span>
      {/each}

      {#each boardState.objects as obj (obj.id)}
        <article
          class={`board-object object-${obj.type} ${uiState.selectedTokenId === obj.id ? 'selected' : ''}`}
          style={`left:${obj.x}px; top:${obj.y}px; width:${(obj.w ?? 1) * effectiveCellSize}px; height:${(obj.h ?? 1) * effectiveCellSize}px; background-color: ${obj.color || ''};`}
          use:makeObjectDraggable={obj.id}
          aria-label={`${i18n.t('add_token')} ${obj.label ?? i18n.t('add_' + obj.type)}`}
        >
          {obj.label ?? i18n.t('add_' + obj.type)}
        </article>
      {/each}
    </div>

    <!-- Mock zoom controls for visual fidelity -->
    <div class="zoom-controls">
      <button class="zoom-btn" type="button" aria-label="Zoom in">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
      <button class="zoom-btn" type="button" aria-label="Zoom out">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
    </div>
  </section>

  <Toolbar onAdd={handleAddObject} onClear={handleClearAll} />
</div>

<style>
  .board-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .board-shell {
    position: relative;
    width: 100%;
    min-height: 300px;
    padding: 0;
    overflow: auto;
    /* Redefine card to have no padding for the map area */
    border-radius: var(--radius-card);
    border: 1px solid var(--color-border);
  }

  .board-grid {
    position: relative;
    box-sizing: content-box;
    width: var(--board-width);
    height: var(--board-height);
    display: grid;
    background: #ffffff;
    touch-action: none;
    margin: 1.5rem; /* Space inside the shell */
    border: 1px solid var(--color-border);
  }

  .grid-cell {
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }

  .board-object {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    border: 1px solid transparent;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: capitalize;
    user-select: none;
    touch-action: none;
    transform: scale(0.97);
    box-shadow: var(--shadow-soft);
  }

  .board-object.selected {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .object-wall {
    background: #3a302a;
    color: #faf5ee;
  }

  .object-door {
    background: #c2652a;
    color: #faf5ee;
  }

  .object-token {
    background: #8c3c3c;
    color: #faf5ee;
    border-radius: 50%;
  }

  .object-note {
    background: #e2dcd2;
    color: #3a302a;
  }

  .zoom-controls {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    box-shadow: var(--shadow-soft);
    padding: 0.25rem;
    z-index: 10;
  }

  .zoom-btn {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-main);
    border-radius: 50%;
    background: transparent;
    transition: background 0.2s;
  }

  .zoom-btn:hover {
    background: var(--color-bg);
  }
</style>

<script>
  import Toolbar from './Toolbar.svelte';
  import {
    boardState,
    uiState,
    addObject,
    removeObject,
    clearObjects,
    updateObject,
    deselectToken,
  } from '$lib/services/boardService.svelte';

  let { rows = 12, cols = 16, cellSize = 50 } = $props();

  let boardWidth = $derived((boardState.meta?.cols ?? cols) * (boardState.meta?.cellSize ?? cellSize));
  let boardHeight = $derived((boardState.meta?.rows ?? rows) * (boardState.meta?.cellSize ?? cellSize));
  let gridCells = $derived(Array.from({ length: (boardState.meta?.rows ?? rows) * (boardState.meta?.cols ?? cols) }, (_, index) => index));

  function getObjectById(objId) {
    return boardState.objects.find((obj) => obj.id === objId);
  }

  function clampObjectPosition(obj, rawX, rawY) {
    const width = (obj.w ?? 1) * cellSize;
    const height = (obj.h ?? 1) * cellSize;
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
      Math.round((current.x ?? 0) / cellSize) * cellSize,
      Math.round((current.y ?? 0) / cellSize) * cellSize,
    );

    updateObject(objId, snapped);
  }

  function makeObjectDraggable(node, objId) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialObjX = 0;
    let initialObjY = 0;
    
    let tapCount = 0;
    let tapTimer = null;

    function onPointerDown(e) {
      if (!e.isPrimary) return;
      
      // Capture the pointer to not lose tracking if user drags really fast outside the element
      node.setPointerCapture(e.pointerId);
      
      const obj = getObjectById(objId);
      if (!obj) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialObjX = obj.x ?? 0;
      initialObjY = obj.y ?? 0;
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Es un arrastre -> calcular nueva posición ajustada a grid
      const next = clampObjectPosition(
        getObjectById(objId),
        initialObjX + dx,
        initialObjY + dy
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

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (Math.abs(dx) <= 3 && Math.abs(dy) <= 3) {
        tapCount++;
        if (tapCount === 1) {
          tapTimer = setTimeout(() => tapCount = 0, 300);
        } else if (tapCount === 2) {
          clearTimeout(tapTimer);
          tapCount = 0;
          uiState.selectedTokenId = objId;
        }
      }

      snapToGrid(objId);
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
        clearTimeout(tapTimer);
      }
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

    {#each boardState.objects as obj (obj.id)}
      <article
        class={`board-object object-${obj.type} ${uiState.selectedTokenId === obj.id ? 'selected' : ''}`}
        style={`left:${obj.x}px; top:${obj.y}px; width:${(obj.w ?? 1) * cellSize}px; height:${(obj.h ?? 1) * cellSize}px; background-color: ${obj.color || ''};`}
        use:makeObjectDraggable={obj.id}
      >
        {obj.label ?? obj.type}
      </article>
    {/each}
  </div>

  <Toolbar onAdd={handleAddObject} onClear={handleClearAll} />
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
    touch-action: none;
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
    user-select: none;
    touch-action: none;
    /* Reducimos su tamaño visual de forma centrada */
    transform: scale(0.97); 
  }

  .board-object.selected {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
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

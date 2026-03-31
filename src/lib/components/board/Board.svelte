<script>
  import { onDestroy, onMount } from 'svelte';
  import Toolbar from './Toolbar.svelte';
  import {
    addObject,
    createBoard,
    deserialize,
    removeObject,
    serialize,
    updateObject,
  } from '$lib/services/boardService';

  let { rows = 12, cols = 16, cellSize = 48 } = $props();

  const STORAGE_KEY = 'questboard.board';
  const SAVE_THROTTLE_MS = 250;

  let board = $state(createBoard({ rows, cols, cellSize }));
  let saveTimer = null;
  let selectedObjectId = $state(null);

  let boardWidth = $derived(cols * cellSize);
  let boardHeight = $derived(rows * cellSize);
  let gridCells = $derived(Array.from({ length: rows * cols }, (_, index) => index));

  onMount(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        const parsed = deserialize(raw);
        if (parsed?.meta && Array.isArray(parsed?.objects)) {
          board = migrateBoardCoordinates(parsed);
        }
      } catch {
        // ignore malformed data and keep default board
      }
    }

    return () => {
      clearTimeout(saveTimer);
    };
  });

  onDestroy(() => {
    clearTimeout(saveTimer);
  });

  $effect(() => {
    if (board) {
      throttleSave();
    }
  });

  function migrateBoardCoordinates(inputBoard) {
    const unit = inputBoard?.meta?.coordinateUnit ?? 'cell';

    if (unit === 'px') {
      return inputBoard;
    }

    return {
      ...inputBoard,
      meta: {
        ...inputBoard.meta,
        coordinateUnit: 'px',
      },
      objects: inputBoard.objects.map((obj) => ({
        ...obj,
        x: (obj.x ?? 0) * cellSize,
        y: (obj.y ?? 0) * cellSize,
      })),
    };
  }

  function throttleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, serialize(board));
    }, SAVE_THROTTLE_MS);
  }

  function getObjectById(objId) {
    return board.objects.find((obj) => obj.id === objId);
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

    board = updateObject(board, objId, snapped);
  }

  function makeObjectDraggable(node, objId) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialObjX = 0;
    let initialObjY = 0;
    
    let holdTimer = null;
    let lastTapTime = 0;

    function onPointerDown(e) {
      if (!e.isPrimary) return;
      
      // Capture the pointer to not lose tracking if user drags really fast outside the element
      node.setPointerCapture(e.pointerId);
      
      const obj = getObjectById(objId);
      if (!obj) return;

      const now = Date.now();
      
      // Double tap to select
      if (now - lastTapTime < 300) {
        selectedObjectId = objId;
      }
      lastTapTime = now;

      // Hold to select
      holdTimer = setTimeout(() => {
        selectedObjectId = objId;
      }, 450);

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

      // Debounce hold: if the pointer moved a bit, the user intends to drag, not hold.
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        clearTimeout(holdTimer);
      }

      const next = clampObjectPosition(
        getObjectById(objId),
        initialObjX + dx,
        initialObjY + dy
      );

      board = updateObject(board, objId, next);
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      clearTimeout(holdTimer);
      try {
        if (node.hasPointerCapture(e.pointerId)) {
          node.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}
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
        clearTimeout(holdTimer);
      }
    };
  }

  function handleAddObject(obj) {
    board = addObject(board, {
      ...obj,
      x: (obj.x ?? 0) * cellSize,
      y: (obj.y ?? 0) * cellSize,
    });
  }

  function handleDeleteSelected() {
    if (!selectedObjectId) {
      return;
    }

    board = removeObject(board, selectedObjectId);
    selectedObjectId = null;
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
        class={`board-object object-${obj.type} ${selectedObjectId === obj.id ? 'selected' : ''}`}
        style={`left:${obj.x}px; top:${obj.y}px; width:${(obj.w ?? 1) * cellSize}px; height:${(obj.h ?? 1) * cellSize}px;`}
        use:makeObjectDraggable={obj.id}
      >
        {obj.label ?? obj.type}

        {#if selectedObjectId === obj.id}
          <button
            class="delete-btn"
            type="button"
            on:click|stopPropagation={handleDeleteSelected}
            aria-label={`Eliminar ${obj.label ?? obj.type}`}
          >
            Eliminar
          </button>
        {/if}
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
  }

  .board-object.selected {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  .delete-btn {
    position: absolute;
    top: -0.55rem;
    right: -0.55rem;
    border: 1px solid #b91c1c;
    background: #ef4444;
    color: #fff;
    border-radius: 999px;
    font-size: 0.625rem;
    padding: 0.125rem 0.35rem;
    cursor: pointer;
    text-transform: none;
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

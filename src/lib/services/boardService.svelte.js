import { uuid } from '$lib/utils/uuid';
import { load, save } from '$lib/services/storageService';

const STORAGE_KEY = 'questboard.board';
const SAVE_THROTTLE_MS = 250;

function migrateBoardCoordinates(inputBoard) {
  const unit = inputBoard?.meta?.coordinateUnit ?? 'cell';
  if (unit === 'px') {
    return inputBoard;
  }
  const cellSize = inputBoard?.meta?.cellSize ?? 50;
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

function createDefaultBoard() {
  return {
    id: uuid(),
    meta: { rows: 12, cols: 16, cellSize: 50, coordinateUnit: 'px' },
    objects: [],
  };
}

// Global reactive state
let rawData = load(STORAGE_KEY, null);
if (rawData && rawData.meta && Array.isArray(rawData.objects)) {
  rawData = migrateBoardCoordinates(rawData);
} else {
  rawData = createDefaultBoard();
}

export const boardState = $state(rawData);

let saveTimer = null;

// UI State (no persistente)
export const uiState = $state({
  selectedTokenId: null
});

export function selectToken(id) {
  uiState.selectedTokenId = id;
}

export function deselectToken() {
  uiState.selectedTokenId = null;
}

function throttleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    save(STORAGE_KEY, boardState);
  }, SAVE_THROTTLE_MS);
}

// Global persistence effect
$effect.root(() => {
  $effect(() => {
    // Traverse the reactive proxy deeply to trigger subscriptions on any nested change
    JSON.stringify(boardState);
    throttleSave();
  });
});

export function createObject(type) {
  return {
    id: uuid(),
    type,
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    color: undefined,
    label: type === 'note' ? 'Nota' : undefined,
  };
}

export function addObject(obj) {
  boardState.objects.push({ id: obj.id ?? uuid(), ...obj });
}

export function updateObject(objId, patch) {
  const index = boardState.objects.findIndex((obj) => obj.id === objId);
  if (index !== -1) {
    Object.assign(boardState.objects[index], patch);
  }
}

export function removeObject(objId) {
  const index = boardState.objects.findIndex((obj) => obj.id === objId);
  if (index !== -1) {
    boardState.objects.splice(index, 1);
  }
}

export function clearObjects() {
  boardState.objects = [];
}

import { uuid } from '$lib/utils/uuid';

export function createObject(type) {
  // Color aleatorio para los tokens (los demás null/undefined para usar el CCS por defecto)
  const randomColor = type === 'token' ? '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0') : undefined;

  return {
    id: uuid(),
    type,
    x: 1, // Posición central por defecto
    y: 1,
    w: 1,
    h: 1,
    color: randomColor,
    label: type === 'note' ? 'Nota' : undefined,
  };
}

export function createBoard({ rows, cols, cellSize }) {
  return {
    id: uuid(),
    meta: { rows, cols, cellSize },
    objects: [],
  };
}

export function addObject(board, obj) {
  const nextObject = { id: obj.id ?? uuid(), ...obj };

  return {
    ...board,
    objects: [...board.objects, nextObject],
  };
}

export function updateObject(board, objId, patch) {
  return {
    ...board,
    objects: board.objects.map((obj) =>
      obj.id === objId ? { ...obj, ...patch } : obj,
    ),
  };
}

export function removeObject(board, objId) {
  return {
    ...board,
    objects: board.objects.filter((obj) => obj.id !== objId),
  };
}

export function clearObjects(board) {
  return {
    ...board,
    objects: []
  };
}

export function serialize(board) {
  return JSON.stringify(board);
}

export function deserialize(data) {
  return typeof data === 'string' ? JSON.parse(data) : data;
}

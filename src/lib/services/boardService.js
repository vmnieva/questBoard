import { uuid } from '$lib/utils/uuid';

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

export function serialize(board) {
  return JSON.stringify(board);
}

export function deserialize(data) {
  return typeof data === 'string' ? JSON.parse(data) : data;
}

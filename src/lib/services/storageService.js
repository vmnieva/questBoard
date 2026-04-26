export function load(key, fallback) {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error('Failed to load from storage', error);
    return fallback;
  }
}

export function save(key, data) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to storage', error);
  }
}

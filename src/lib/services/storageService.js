export function load(key, fallback) {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const jsonString = decodeURIComponent(atob(item));
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn(`Data for key "${key}" was corrupted or in an old format. Returning fallback.`, error);
    return fallback;
  }
}

export function save(key, data) {
  if (typeof localStorage === 'undefined') return;
  try {
    const jsonString = JSON.stringify(data);
    const encodedData = btoa(encodeURIComponent(jsonString));
    localStorage.setItem(key, encodedData);
  } catch (error) {
    console.error('Failed to save to storage', error);
  }
}

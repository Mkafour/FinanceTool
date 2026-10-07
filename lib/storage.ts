/**
 * Generic localStorage helper.
 * Safe against SSR (no `window`) and private-browsing/storage-disabled environments.
 */

export function saveToStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // storage disabled, quota exceeded, or private browsing — fail silently
    }
}

export function loadFromStorage<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
        const raw = window.localStorage.getItem(key);
        if (raw === null) return null;
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

export function removeFromStorage(key: string): void {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.removeItem(key);
    } catch {
        // fail silently
    }
}
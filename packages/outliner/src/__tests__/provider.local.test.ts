import { describe, it, expect, vi } from 'vitest';
import { LocalDocProvider } from '../providers/LocalDocProvider';

describe('LocalDocProvider', () => {
    it('debounces saves ~800ms', async () => {
        vi.useFakeTimers();
        const store: Record<string, string> = {};
        // minimal localStorage mock
        const mockStorage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem' | 'clear' | 'key' | 'length'> = {
            getItem: (k: string) => store[k] ?? null,
            setItem: (k: string, v: string) => { store[k] = v; },
            removeItem: (k: string) => { delete store[k]; },
            clear: () => { Object.keys(store).forEach(k => delete store[k]); },
            key: (i: number) => Object.keys(store)[i] ?? null,
            get length() { return Object.keys(store).length; },
        };
        // @ts-expect-error jsdom may not define localStorage by default
        global.localStorage = mockStorage as Storage;
        const p = new LocalDocProvider('t');
        p.saveDocumentSnapshot?.({ a: 1 });
        p.saveDocumentSnapshot?.({ a: 2 });
        // advance less than debounce
        vi.advanceTimersByTime(799);
        expect(p.getJSONSnapshot()).toBe(null);
        vi.advanceTimersByTime(1);
        const snap = p.getJSONSnapshot();
        expect(snap).toEqual({ a: 2 });
        vi.useRealTimers();
    });
});

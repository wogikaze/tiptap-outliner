import type { DocProvider } from '../types';

export class LocalDocProvider implements DocProvider {
    public id: string;
    private storageKey: string;
    private updateCallbacks = new Set<() => void>();
    private connectionCallbacks = new Set<(s: 'connected' | 'connecting' | 'disconnected') => void>();
    private saveTimeout: ReturnType<typeof setTimeout> | null = null;
    private state: 'connected' | 'connecting' | 'disconnected' = 'disconnected';

    constructor(id: string, storageKey?: string) {
        this.id = id;
        this.storageKey = storageKey || `outliner-${id}`;
    }

    async connect(): Promise<void> {
        this.setState('connecting');
        // simulate immediate availability
        this.setState('connected');
        // hydrate triggers (consumer should call getJSONSnapshot())
        this.notifyUpdate();
    }

    async disconnect(): Promise<void> {
        this.setState('disconnected');
    }

    getJSONSnapshot(): unknown {
        try {
            const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(this.storageKey) : null;
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    }

    saveDocumentSnapshot(docJSON: unknown): void {
        // 800ms debounce per requirements
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(this.storageKey, JSON.stringify(docJSON));
                }
            } catch {
                // ignore persistence errors gracefully
            }
        }, 800);
    }

    onUpdate(cb: () => void): () => void {
        this.updateCallbacks.add(cb);
        return () => this.updateCallbacks.delete(cb);
    }

    getConnectionState(): 'connected' | 'connecting' | 'disconnected' {
        return this.state;
    }

    onConnectionStateChange(cb: (state: 'connected' | 'connecting' | 'disconnected') => void): () => void {
        this.connectionCallbacks.add(cb);
        return () => this.connectionCallbacks.delete(cb);
    }

    private setState(s: 'connected' | 'connecting' | 'disconnected') {
        this.state = s;
        this.connectionCallbacks.forEach(cb => cb(s));
    }

    private notifyUpdate() {
        this.updateCallbacks.forEach(cb => cb());
    }
}

// Placeholder implementation to be completed when Yjs/Hocuspocus are wired.
import type { DocProvider } from '../types';

export class YDocProvider implements DocProvider {
    public id: string;
    constructor(id: string) {
        this.id = id;
    }

    async connect(): Promise<void> {
        // TODO: integrate Y.Doc + HocuspocusProvider
        throw new Error('YDocProvider not implemented yet');
    }

    async disconnect(): Promise<void> {
        // TODO
    }

    getJSONSnapshot(): unknown {
        // TODO: convert Y.Doc to ProseMirror JSON
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdate(_cb: () => void): () => void {
        // TODO: subscribe to y-prosemirror updates
        return () => void 0;
    }

    getConnectionState(): 'connected' | 'connecting' | 'disconnected' {
        return 'disconnected';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onConnectionStateChange(_cb: (state: 'connected' | 'connecting' | 'disconnected') => void): () => void {
        // TODO: wire provider events
        return () => void 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    saveDocumentSnapshot?(_docJSON: unknown): void {
        // Snapshots throttled (10s/~5kB) when implemented
    }
}

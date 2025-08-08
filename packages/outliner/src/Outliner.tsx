import React from 'react';
import { OutlinerContext, defaultCommands } from './context/OutlinerContext';
import type { OutlinerProps } from './types';
import './styles/outliner.css';

export const Outliner: React.FC<OutlinerProps> = ({
    provider,
    initialDoc,
    onChange,
    readOnly,
    className,
    slotRenderers,
    maxDepth = 8,
}) => {
    const [connectionState, setConnectionState] = React.useState<
        'connected' | 'connecting' | 'disconnected'
    >(provider.getConnectionState());
    const [value, setValue] = React.useState<string>(() =>
        typeof initialDoc === 'string'
            ? initialDoc
            : JSON.stringify(initialDoc ?? {}, null, 2),
    );

    React.useEffect(() => {
        const unsubConn = provider.onConnectionStateChange(setConnectionState);
        provider.connect().catch(() => setConnectionState('disconnected'));
        return () => {
            unsubConn?.();
            provider.disconnect?.();
        };
    }, [provider]);

    React.useEffect(() => {
        // Initial hydration via provider snapshot if present
        const snapshot = provider.getJSONSnapshot();
        if (snapshot) {
            const next =
                typeof snapshot === 'string'
                    ? snapshot
                    : JSON.stringify(snapshot, null, 2);
            setValue(next);
            onChange?.(snapshot);
        }
        const unsub = provider.onUpdate(() => {
            const snap = provider.getJSONSnapshot();
            if (snap) {
                setValue(
                    typeof snap === 'string'
                        ? snap
                        : JSON.stringify(snap, null, 2),
                );
                onChange?.(snap);
            }
        });
        return unsub;
    }, [provider, onChange]);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const next = e.target.value;
        setValue(next);
        try {
            const parsed = JSON.parse(next);
            provider.saveDocumentSnapshot?.(parsed);
            onChange?.(parsed);
        } catch {
            // If not valid JSON, persist raw string for now
            provider.saveDocumentSnapshot?.(next);
            onChange?.(next);
        }
    };

    // Placeholder rendering until Tiptap is wired
    return (
        <OutlinerContext.Provider
            value={{
                editor: null,
                commands: defaultCommands,
                provider,
                connectionState,
            }}
        >
            <div
                className={['outliner-root', className]
                    .filter(Boolean)
                    .join(' ')}
                data-connection={connectionState}
            >
                <div
                    style={{
                        padding: 12,
                        border: '1px solid #2a2f3a',
                        borderRadius: 8,
                    }}
                >
                    <div style={{ marginBottom: 8, color: 'var(--ol-muted)' }}>
                        Outliner placeholder (Tiptap not wired yet). Max depth:{' '}
                        {maxDepth}. Readonly: {String(!!readOnly)}
                    </div>
                    <div>
                        {/* TODO: Render Tiptap editor with custom extensions and NodeViews */}
                        <textarea
                            aria-label="Outliner placeholder editor"
                            style={{
                                width: '100%',
                                minHeight: 160,
                                background: 'transparent',
                                color: 'inherit',
                                border: '1px solid #3a4150',
                                borderRadius: 6,
                                padding: 8,
                            }}
                            value={value}
                            onChange={handleChange}
                            readOnly={!!readOnly}
                        />
                    </div>
                    {
                        slotRenderers?.itemSuffix?.(
                            {},
                        ) as unknown as React.ReactNode
                    }
                </div>
            </div>
        </OutlinerContext.Provider>
    );
};

import React from 'react';
import { LocalDocProvider } from '../../../packages/outliner/src/providers/LocalDocProvider';
import { Outliner } from '../../../packages/outliner/src/Outliner';

export const App: React.FC = () => {
    const provider = React.useMemo(() => new LocalDocProvider('demo'), []);
    return (
        <div style={{ padding: 24 }}>
            <h1 style={{ color: '#e6e6e6' }}>Tiptap Outliner Demo</h1>
            <Outliner
                provider={provider}
                initialDoc={{ type: 'doc', content: [] }}
            />
        </div>
    );
};

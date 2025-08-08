import React from 'react';
import type { DocProvider, OutlinerCommands } from '../types';

export type ConnectionState = 'connected' | 'connecting' | 'disconnected';

export interface OutlinerContextValue {
    editor: unknown | null;
    commands: OutlinerCommands;
    provider: DocProvider;
    connectionState: ConnectionState;
}

const noop = () => false;

export const defaultCommands: OutlinerCommands = {
    indentItem: noop,
    outdentItem: noop,
    toggleCollapse: noop,
    moveItemUp: noop,
    moveItemDown: noop,
    moveCursorUp: noop,
    moveCursorDown: noop,
    splitItem: noop,
    joinWithNext: noop,
    joinWithPrev: noop,
    goLineStartSmart: noop,
    goLineEndSmart: noop,
};

export const OutlinerContext = React.createContext<OutlinerContextValue | null>(
    null,
);

export const useOutlinerContext = () => {
    const ctx = React.useContext(OutlinerContext);
    if (!ctx) throw new Error('OutlinerContext not found');
    return ctx;
};

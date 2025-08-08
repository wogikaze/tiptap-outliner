export type JSONContent = unknown;

export interface DocProvider {
  id: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getJSONSnapshot(): JSONContent;
  saveDocumentSnapshot?(docJSON: JSONContent): void;
  onUpdate(cb: () => void): () => void;
  getConnectionState(): 'connected' | 'connecting' | 'disconnected';
  onConnectionStateChange(cb: (state: 'connected' | 'connecting' | 'disconnected') => void): () => void;
}

export interface OutlinerCommands {
  indentItem(): boolean;
  outdentItem(): boolean;
  toggleCollapse(): boolean;
  moveItemUp(): boolean;
  moveItemDown(): boolean;
  moveCursorUp(): boolean;
  moveCursorDown(): boolean;
  splitItem(): boolean;
  joinWithNext(): boolean;
  joinWithPrev(): boolean;
  goLineStartSmart(): boolean;
  goLineEndSmart(): boolean;
}

export interface OutlinerProps {
  provider: DocProvider;
  initialDoc?: JSONContent | string;
  onChange?: (docJSON: JSONContent) => void;
  readOnly?: boolean;
  className?: string;
  slotRenderers?: {
    itemPrefix?(attrs: Record<string, unknown>): unknown;
    itemSuffix?(attrs: Record<string, unknown>): unknown;
  };
  shortcuts?: Partial<Record<string, string>>;
  maxDepth?: number;
}

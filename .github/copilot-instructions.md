## Copilot instructions for this repo

Purpose: Build a production-grade React + Tiptap v3 Outliner component with local and collaborative modes. Source of truth for behavior and architecture is under `.kiro/specs/tiptap-outliner/`:
- requirements.md (feature/acceptance spec)
- design.md (architecture, APIs, extensions, provider contract)
- tasks.md (implementation plan, tooling expectations)

Big picture architecture (see design.md):
- React component library “Outliner” + demo app.
- Provider layer abstracts persistence/collab: `DocProvider` -> `LocalDocProvider` (localStorage, 800ms debounce) and `YDocProvider` (Yjs + Hocuspocus, awareness/presence).
- Tiptap layer: custom extensions `OutlinerItem` (collapsed attribute), `CollapsibleList`, `OutlinerKeymap`, React NodeViews.
- Storage/collab: localStorage + IndexedDB (offline), Y.Doc via y-prosemirror, Hocuspocus server.

Key contracts and conventions:
- `DocProvider` shape (design.md): `id`, `connect()`, `disconnect()`, `getJSONSnapshot()`, optional `saveDocumentSnapshot(doc)`, `onUpdate(cb)`, `getConnectionState()`, `onConnectionStateChange(cb)`.
- Outliner props (design.md): `provider`, `initialDoc`, `onChange`, `readOnly`, `className`, `slotRenderers.itemPrefix/itemSuffix`, `shortcuts`, `maxDepth` (default 8).
- Collapsed state is stored as a list-item/node attribute and rendered to DOM via `data-collapsed`. Item “level” is computed, not stored.
- Keyboard semantics live in `OutlinerKeymap`: Tab/Shift-Tab indent/outdent; Enter/Shift-Enter split/soft-break; Backspace/Delete join; Ctrl+Enter toggle collapse; Arrow keys navigate; Alt/Ctrl+Arrow swap/move subtrees; Home/End smart; Space at absolute line start indents.
- Persistence: local mode saves via debounced `LocalDocProvider` (800ms). Yjs updates are immediate; snapshots are throttled (10s or ~5kB) per requirements.
- Accessibility: dark theme default; disclosure triangle is a button with `aria-expanded`; visible focus; hierarchical structure friendly to screen readers.

Source code structure to follow (tasks.md):
- Monorepo: `packages/outliner` (library) and `apps/demo` (Vite app). TypeScript, ESLint/Prettier (4-space indent).
- Extensions: `OutlinerItem`, `CollapsibleList`, `OutlinerKeymap`; React NodeView for list item with prefix/suffix “slots”.
- Tests: Vitest (unit), React Testing Library (integration), Playwright (E2E, two-browser collab scenarios).

Developer workflows (expected; wire up scripts accordingly when scaffolding package.json):
- Dev: Vite dev server for `apps/demo`.
- Test: Vitest for unit; RTL for components; Playwright for E2E (spawn two contexts; `/demo?room=<id>` for collab).
- Lint/format: ESLint + Prettier (4 spaces).
- CI: run build, lint, unit/integration, then E2E. Use TDD: write failing tests from requirements, then implement.

Implementation guardrails (stick to these patterns):
- Public API: keep `OutlinerProps` and `OutlinerContext` as in design.md; expose `commands` for programmatic control.
- Level computation is derived (plugin/transaction), not persisted; no-ops at boundaries (level 0, maxDepth) with no error flashes.
- Use `data-*` attributes for collapsed/level, and CSS to hide collapsed children; keep NodeView lean and memoized.
- In Yjs mode, ensure collapsed state is part of node attrs so it CRDT-replicates; conflicts resolve last-writer-wins per spec.
- Debounce local saves; do not debounce Yjs transport; coalesce presence updates.

Exemplars (see design.md for snippets):
- `DocProvider` interface and both providers’ key methods.
- NodeView: `<li data-collapsed data-level>`, disclosure button, `NodeViewContent/Wrapper`, slot renderers.
- Test helpers: `createTestDoc`, `createTestEditor(MockDocProvider)`; Playwright two-context collab test.

Performance & a11y budgets to honor:
- Render and interactions under the latencies in tasks.md (e.g., collapse/expand <50ms; 500 items load <2s target).
- WCAG AA contrast, screen-reader announcements, full keyboard operation.

If you scaffold new files, mirror the names and API shapes from design.md/requirements.md and wire tests first. When adding scripts, prefer: dev (Vite), build, test (Vitest), e2e (Playwright), lint, format.


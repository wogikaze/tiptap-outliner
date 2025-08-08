# Tiptap Outliner Monorepo

This repo contains:
- `packages/outliner`: React + Tiptap Outliner component (library)
- `apps/demo`: Vite demo app showcasing the component

Specs live under `.kiro/specs/tiptap-outliner/`.

Dev workflow (after installing deps):
- npm run dev (starts demo)
- npm run build (build all workspaces)
- npm run test (Vitest)
- npm run e2e (Playwright)

Note: External deps (Tiptap, Yjs) are not installed yet.

# Implementation Plan

## MVP Definition & Priorities

**MVP Goal**: Functional local outliner with basic keyboard shortcuts and persistence
**Success Criteria**: Single user can create, edit, and persist hierarchical lists with collapse functionality

**Priority Levels**:

- **P0 (Critical Path)**: Blocks all other work
- **P1 (High)**: Core functionality, blocks user testing
- **P2 (Medium)**: Enhanced UX, can be done in parallel
- **P3 (Low)**: Polish and optimization

## Sprint 1: Foundation & Core Architecture (2 weeks)

### Critical Path Tasks (P0)

- [ ] 1.1 Project infrastructure setup
  - **Estimate**: 3 days
  - **Owner**: DevOps/Lead
  - **Acceptance**: Build system works, tests run, CI/CD configured
  - **Quality Gate**: Code review + automated tests pass
  - Create monorepo with packages/outliner and apps/demo
  - Configure Vite, Vitest, Playwright with proper TypeScript setup
  - Set up ESLint/Prettier with 4-space indentation
  - **Blockers**: None
  - _Requirements: 1.1, 8.1, 8.2, 8.3_

- [ ] 1.2 DocProvider interface and LocalDocProvider
  - **Estimate**: 2 days
  - **Owner**: Backend Dev
  - **Acceptance**: LocalDocProvider persists to localStorage with 800ms debounce
  - **Quality Gate**: Unit tests + code review + QA manual testing
  - **Performance**: Must handle 100 saves/sec without blocking UI
  - **Error Handling**: Graceful fallback when localStorage unavailable
  - Write failing tests first, implement interface, test error scenarios
  - **Depends on**: 1.1
  - _Requirements: 9.1, 9.2, 5.1, 5.2, 5.7_

- [ ] 1.3 Basic Outliner component with Tiptap integration
  - **Estimate**: 3 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Component renders, accepts props, provides context
  - **Quality Gate**: Integration tests + code review + accessibility audit
  - **Performance**: Initial render <200ms for 50 items
  - **Error Handling**: Graceful degradation when provider fails
  - Implement OutlinerProps interface and OutlinerProvider context
  - **Depends on**: 1.1, 1.2
  - _Requirements: 1.1, 1.2, 1.5, 1.6_

### Parallel Tasks (P1)

- [ ] 1.4 Test utilities and mocks
  - **Estimate**: 1 day
  - **Owner**: QA/Test Engineer
  - **Acceptance**: Comprehensive test helpers for all scenarios
  - **Quality Gate**: Code review + documentation
  - Create createTestDoc, createTestEditor, MockDocProvider
  - **Can start**: After 1.1
  - _Requirements: 8.1, 8.6_

- [ ] 1.5 Dark theme CSS foundation
  - **Estimate**: 1 day
  - **Owner**: UI/UX Dev
  - **Acceptance**: WCAG AA contrast ratios, focus indicators
  - **Quality Gate**: Accessibility audit + code review
  - **Accessibility**: Screen reader testing required
  - Create base outliner.css with dark theme defaults
  - **Can start**: After 1.1
  - _Requirements: 7.1, 7.3, 7.6_

## Sprint 2: Core Outliner Functionality (2 weeks)

### Critical Path Tasks (P0)

- [ ] 2.1 OutlinerItem extension with collapse
  - **Estimate**: 4 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Items can collapse/expand, state persists in JSON
  - **Quality Gate**: Unit tests + integration tests + code review
  - **Performance**: Collapse/expand <50ms, level computation optimized
  - **Error Handling**: Invalid states handled gracefully
  - Implement collapsed attribute, parseHTML/renderHTML
  - **Depends on**: 1.3
  - _Requirements: 2.1, 2.2, 2.3, 6.3_

- [ ] 2.2 OutlinerItemNodeView with React rendering
  - **Estimate**: 3 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Disclosure triangles, ARIA attributes, dynamic levels
  - **Quality Gate**: Integration tests + accessibility audit + code review
  - **Accessibility**: Screen reader announces hierarchy correctly
  - **Performance**: NodeView render <16ms per item
  - Implement ReactNodeView with proper ARIA support
  - **Depends on**: 2.1
  - _Requirements: 2.6, 2.7, 7.2, 7.4_

- [ ] 2.3 Basic indent/outdent commands
  - **Estimate**: 3 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Tab/Shift+Tab work, respect maxDepth/level boundaries
  - **Quality Gate**: Unit tests + integration tests + code review
  - **Performance**: Indent/outdent <50ms for 100-item subtree
  - **Error Handling**: No-op at boundaries, no error indication
  - Implement indentItem/outdentItem with boundary checking
  - **Depends on**: 2.2
  - _Requirements: 6.1, 6.2, 3.2, 3.3, 3.16, 3.17_

### Parallel Tasks (P1)

- [ ] 2.4 CollapsibleList extension
  - **Estimate**: 2 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Lists handle collapsed children, CSS hiding works
  - **Quality Gate**: Unit tests + code review
  - Implement toggleCollapse command and CSS classes
  - **Can start**: After 2.1
  - _Requirements: 2.3, 2.4, 2.5_

### Quality Assurance (P1)

- [ ] 2.5 Sprint 2 QA and integration testing
  - **Estimate**: 2 days
  - **Owner**: QA Engineer
  - **Acceptance**: All P0/P1 features work end-to-end
  - **Quality Gate**: Manual testing + automated E2E tests
  - **Accessibility**: Full keyboard navigation testing
  - Test collapse/expand, indent/outdent, error scenarios
  - **Depends on**: 2.1, 2.2, 2.3, 2.4

## Sprint 3: Keyboard Navigation & Commands (2 weeks)

### Critical Path Tasks (P0)

- [ ] 3.1 Core keyboard shortcuts (Enter, Backspace, Delete)
  - **Estimate**: 4 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Enter splits items, Backspace/Delete join items
  - **Quality Gate**: Unit tests + integration tests + code review
  - **Performance**: Split/join operations <50ms
  - **Error Handling**: Edge cases with empty items handled
  - Implement splitItem, joinWithNext, joinWithPrev commands
  - **Depends on**: 2.3
  - _Requirements: 6.9, 6.10, 6.11, 3.4, 3.6, 3.7_

- [ ] 3.2 Smart navigation (Arrow keys, Home/End)
  - **Estimate**: 3 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Navigation skips collapsed items, smart Home/End
  - **Quality Gate**: Unit tests + integration tests + code review
  - **Performance**: Navigation <16ms per key press
  - Implement moveCursorUp/Down, goLineStartSmart/EndSmart
  - **Depends on**: 3.1
  - _Requirements: 6.6, 6.7, 6.12, 6.13, 3.9, 3.14, 3.15_

- [ ] 3.3 OutlinerKeymap extension
  - **Estimate**: 2 days
  - **Owner**: Frontend Dev
  - **Acceptance**: All keyboard shortcuts work, Space-at-start indents
  - **Quality Gate**: Integration tests + code review + manual testing
  - **Performance**: Keymap lookup <1ms
  - Implement complete keyboard shortcut mapping
  - **Depends on**: 3.2
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

### Parallel Tasks (P2)

- [ ] 3.4 Item movement commands (Ctrl+Arrow, Alt+Arrow)
  - **Estimate**: 3 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Move subtrees up/down, swap siblings
  - **Quality Gate**: Unit tests + code review
  - **Performance**: Movement <100ms for 50-item subtree
  - Implement moveSubtreeUp/Down, swapWithPrevious/Next
  - **Can start**: After 2.3
  - _Requirements: 6.4, 6.5, 3.10, 3.18, 3.19_

### Quality Assurance (P1)

- [ ] 3.5 Sprint 3 QA and keyboard testing
  - **Estimate**: 2 days
  - **Owner**: QA Engineer
  - **Acceptance**: All keyboard shortcuts work correctly
  - **Quality Gate**: Manual testing + E2E tests + accessibility audit
  - **Accessibility**: Full keyboard-only navigation testing
  - Test every keyboard shortcut, edge cases, error scenarios
  - **Depends on**: 3.1, 3.2, 3.3

## Sprint 4: Bulk Operations & Demo (2 weeks)

### Critical Path Tasks (P1)

- [ ] 4.1 Bulk selection and operations
  - **Estimate**: 3 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Shift+Arrow selects ranges, Tab/Shift+Tab on selection
  - **Quality Gate**: Integration tests + code review + manual testing
  - **Performance**: Bulk operations <200ms for 20 selected items
  - **Error Handling**: Boundary conditions respected in bulk mode
  - Implement range selection and bulk indent/outdent
  - **Depends on**: 3.3
  - _Requirements: 4.1, 4.2, 4.3, 4.5, 3.12, 3.13_

- [ ] 4.2 Demo application MVP
  - **Estimate**: 3 days
  - **Owner**: Frontend Dev
  - **Acceptance**: Demo showcases all features, localStorage persistence
  - **Quality Gate**: E2E tests + code review + UX review
  - **Performance**: Demo loads <1s, smooth interaction
  - Create Vite demo with feature showcase and keyboard cheatsheet
  - **Depends on**: 4.1
  - _Requirements: 13.1, 13.2, 13.3, 13.4_

### Parallel Tasks (P2)

- [ ] 4.3 Slot renderers and customization
  - **Estimate**: 2 days
  - **Owner**: Frontend Dev
  - **Acceptance**: itemPrefix/itemSuffix work, checkbox example
  - **Quality Gate**: Integration tests + code review
  - Implement slot renderer support via context
  - **Can start**: After 2.2
  - _Requirements: 1.7, 13.7_

### Quality Assurance (P0)

- [ ] 4.4 MVP integration testing and bug fixes
  - **Estimate**: 3 days
  - **Owner**: QA Engineer + All Devs
  - **Acceptance**: All P0/P1 features work reliably
  - **Quality Gate**: Full regression testing + performance testing
  - **Performance**: 500 items load <2s, all operations <100ms
  - **Accessibility**: WCAG AA compliance verified
  - End-to-end testing, bug fixes, performance optimization
  - **Depends on**: 4.1, 4.2

## Phase 2: Collaborative Features (4 weeks)

### Sprint 5-6: Yjs Integration (2 weeks)

- [ ] 5.1 YDocProvider and Yjs setup
  - **Estimate**: 5 days
  - **Owner**: Backend Dev + Frontend Dev
  - **Acceptance**: YDocProvider connects to Hocuspocus, syncs documents
  - **Quality Gate**: Unit tests + integration tests + code review
  - **Performance**: Connection <2s, sync latency <100ms
  - **Error Handling**: Connection failures, reconnection logic
  - Implement Y.Doc integration with Tiptap via y-prosemirror
  - **Depends on**: MVP completion
  - _Requirements: 9.3, 9.4, 9.5, 9.6, 10.9_

- [ ] 5.2 Two-client synchronization
  - **Estimate**: 3 days
  - **Owner**: Frontend Dev + QA Engineer
  - **Acceptance**: Real-time sync of text, structure, collapse state
  - **Quality Gate**: E2E tests with two browser contexts
  - **Performance**: Sync latency <200ms, no conflicts
  - Set up test Hocuspocus server, implement E2E tests
  - **Depends on**: 5.1
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 12.1, 12.2, 12.3, 12.4_

### Sprint 7-8: Presence & Offline (2 weeks)

- [ ] 6.1 Presence indicators
  - **Estimate**: 3 days
  - **Owner**: Frontend Dev
  - **Acceptance**: User cursors visible, color-coded, real-time updates
  - **Quality Gate**: E2E tests + code review + UX review
  - **Performance**: Presence updates <50ms, no UI blocking
  - Implement awareness integration for cursors and selections
  - **Depends on**: 5.2
  - _Requirements: 10.5, 12.6_

- [ ] 6.2 Offline editing and reconnection
  - **Estimate**: 4 days
  - **Owner**: Backend Dev + Frontend Dev
  - **Acceptance**: Offline edits merge on reconnection, no data loss
  - **Quality Gate**: E2E tests + stress testing + code review
  - **Performance**: Merge <1s for 100 offline changes
  - **Error Handling**: Conflict resolution, connection state UI
  - Implement y-indexeddb, reconnection logic, conflict resolution
  - **Depends on**: 6.1
  - _Requirements: 10.6, 10.7, 10.8, 11.4, 11.5_

## Risk Mitigation & Quality Gates

### Code Review Process

- **All P0 tasks**: 2 reviewers required, including tech lead
- **All P1 tasks**: 1 reviewer + automated checks
- **Performance requirements**: Must be verified before merge
- **Accessibility requirements**: Must pass automated + manual audit

### Testing Strategy

- **Unit tests**: 90% coverage for all commands and utilities
- **Integration tests**: All React components and user interactions
- **E2E tests**: Critical user journeys and collaborative scenarios
- **Performance tests**: Automated benchmarks for all operations
- **Accessibility tests**: Automated + manual screen reader testing

### Definition of Done

1. All acceptance criteria met
2. Tests written and passing (TDD approach)
3. Code reviewed and approved
4. Performance requirements verified
5. Accessibility requirements verified
6. Documentation updated
7. QA sign-off received

### Estimated Timeline

- **MVP (Sprints 1-4)**: 8 weeks
- **Collaborative (Sprints 5-8)**: 4 weeks
- **Total**: 12 weeks with 3-4 developers

### Critical Dependencies

- **External**: Hocuspocus server setup and hosting
- **Internal**: Design system and accessibility guidelines
- **Skills**: ProseMirror expertise for complex commands
- **Infrastructure**: CI/CD pipeline for automated testing

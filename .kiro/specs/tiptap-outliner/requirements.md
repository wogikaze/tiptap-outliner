# Requirements Document

## Introduction

This feature involves building a production-grade, reusable Outliner component using React + Tiptap v3 with test-driven development. The Outliner is a hierarchical list editor that supports collapsible items, keyboard navigation, bulk operations, and persistence. It will be designed with collaborative editing in mind using a provider abstraction that supports both local-only and real-time collaborative modes via Yjs + Hocuspocus. It will be delivered as a reusable component library with a demo application, following TDD principles where tests are written before implementation.

## Requirements

### Requirement 1

**User Story:** As a developer, I want a reusable React Outliner component library, so that I can integrate hierarchical list editing functionality into my applications.

#### Acceptance Criteria

1. WHEN the component is imported THEN it SHALL provide a clean public API with configurable props
2. WHEN initialDoc prop is provided THEN the component SHALL render the initial document structure
3. WHEN onChange callback is provided THEN it SHALL be called with document JSON on every change
4. WHEN storageKey is provided THEN it SHALL override initialDoc with localStorage content if available
5. WHEN readOnly is true THEN the component SHALL prevent all editing operations
6. WHEN className is provided THEN it SHALL be applied to the root component element
7. WHEN slotRenderers are provided THEN they SHALL render custom content for item prefix/suffix

### Requirement 2

**User Story:** As a user, I want to create and edit hierarchical lists with collapsible items, so that I can organize content in a structured way.

#### Acceptance Criteria

1. WHEN I type content THEN it SHALL create list items with proper nesting structure
2. WHEN I click a disclosure triangle THEN the item SHALL toggle between collapsed/expanded states
3. WHEN an item is collapsed THEN its children SHALL be visually hidden but remain in document
4. WHEN I navigate with arrow keys THEN collapsed children SHALL be skipped
5. WHEN I expand a collapsed item THEN its children SHALL become visible again
6. IF an item has children THEN it SHALL display a disclosure triangle (▶/▼)
7. IF an item has no children THEN it SHALL not display a disclosure triangle

### Requirement 3

**User Story:** As a user, I want comprehensive keyboard shortcuts for efficient editing, so that I can work quickly without using the mouse.

#### Acceptance Criteria

1. WHEN I press Space at line start THEN the item SHALL indent (only if cursor at absolute start)
2. WHEN I press Tab THEN the current item SHALL indent one level
3. WHEN I press Shift+Tab THEN the current item SHALL outdent one level
4. WHEN I press Enter THEN it SHALL create a new item or split current item
5. WHEN I press Shift+Enter THEN it SHALL create a soft break within the item
6. WHEN I press Backspace at item start THEN it SHALL outdent or merge with previous item
7. WHEN I press Delete at item end THEN it SHALL merge with next item
8. WHEN I press Ctrl+Enter THEN it SHALL toggle collapse on current item
9. WHEN I press Arrow Up/Down THEN it SHALL move between visible items, skipping collapsed children
10. WHEN I press Ctrl+Arrow Up/Down THEN it SHALL move current item block up/down including children
11. WHEN I press Alt+Arrow Up/Down THEN it SHALL move cursor-and-below selection or sibling swap
12. WHEN I press Shift+Arrow Up/Down THEN it SHALL create range selection
13. WHEN I have range selection and press Tab/Shift+Tab THEN it SHALL bulk indent/outdent selected items
14. WHEN I press Home THEN it SHALL move cursor to first non-whitespace, non-bullet character, or absolute start if already there
15. WHEN I press End THEN it SHALL move cursor to last non-whitespace content, or absolute end if already there
16. WHEN I try to indent beyond maxDepth (default 8) THEN it SHALL be a no-op with no error indication
17. WHEN I try to outdent at level 0 THEN it SHALL be a no-op with no error indication
18. WHEN I press Alt+Arrow Up/Down THEN it SHALL swap current item with previous/next sibling
19. WHEN I press Ctrl+Arrow Up/Down THEN it SHALL move current subtree up/down across boundaries when legal

### Requirement 4

**User Story:** As a user, I want bulk operations on multiple selected items, so that I can efficiently modify large sections of content.

#### Acceptance Criteria

1. WHEN I select multiple items THEN they SHALL be visually highlighted
2. WHEN I press Tab on selection THEN all selected items SHALL indent one level
3. WHEN I press Shift+Tab on selection THEN all selected items SHALL outdent one level
4. WHEN I move selected items THEN their subtrees SHALL move with them
5. WHEN I perform bulk operations THEN the selection SHALL be maintained after the operation

### Requirement 5

**User Story:** As a user, I want my content to persist automatically, so that I don't lose my work when I close and reopen the application.

#### Acceptance Criteria

1. WHEN storageKey is provided THEN content SHALL be saved to localStorage with 800ms debounced saves
2. WHEN the component mounts THEN it SHALL hydrate from localStorage if storageKey exists
3. WHEN content changes THEN it SHALL automatically save after a debounce delay
4. WHEN I reload the page THEN my content SHALL be restored from localStorage
5. WHEN Yjs updates occur THEN they SHALL be sent immediately without debouncing
6. WHEN collaborative snapshots are taken THEN they SHALL be throttled to 10s or 5kB intervals
7. IF localStorage is not available THEN the component SHALL gracefully fallback without persistence

### Requirement 6

**User Story:** As a developer, I want comprehensive programmatic commands, so that I can control the editor behavior from external code.

#### Acceptance Criteria

1. WHEN indentItem command is called THEN the current item SHALL indent one level
2. WHEN outdentItem command is called THEN the current item SHALL outdent one level
3. WHEN toggleCollapse command is called THEN the current item SHALL toggle its collapsed state
4. WHEN moveItemUp command is called THEN the current item SHALL move up with its subtree
5. WHEN moveItemDown command is called THEN the current item SHALL move down with its subtree
6. WHEN moveCursorUp command is called THEN cursor SHALL move to previous visible item
7. WHEN moveCursorDown command is called THEN cursor SHALL move to next visible item
8. WHEN toggleCheckbox command is called THEN checkbox state SHALL toggle (if checkbox renderer exists)
9. WHEN splitItem command is called THEN current item SHALL split at cursor position
10. WHEN joinWithNext command is called THEN current item SHALL merge with next item
11. WHEN joinWithPrev command is called THEN current item SHALL merge with previous item
12. WHEN goLineStartSmart command is called THEN cursor SHALL move to smart line start
13. WHEN goLineEndSmart command is called THEN cursor SHALL move to smart line end

### Requirement 7

**User Story:** As a user, I want a dark theme interface with proper accessibility, so that I can use the editor comfortably in low-light conditions and with assistive technologies.

#### Acceptance Criteria

1. WHEN the component renders THEN it SHALL use a dark theme by default
2. WHEN disclosure triangles are rendered THEN they SHALL have proper ARIA attributes (role="button", aria-expanded)
3. WHEN items are focused THEN they SHALL display visible focus rings with sufficient contrast
4. WHEN using keyboard navigation THEN all interactive elements SHALL be accessible
5. WHEN screen readers are used THEN the hierarchical structure SHALL be properly announced
6. IF custom colors are used THEN they SHALL meet WCAG contrast requirements

### Requirement 8

**User Story:** As a developer, I want comprehensive test coverage with TDD approach, so that I can be confident in the component's reliability and behavior.

#### Acceptance Criteria

1. WHEN tests are written THEN they SHALL be created before implementation (TDD approach)
2. WHEN unit tests run THEN they SHALL cover all commands and transforms
3. WHEN integration tests run THEN they SHALL cover React component behavior
4. WHEN E2E tests run THEN they SHALL cover every keyboard scenario from behavior spec
5. WHEN all tests run THEN they SHALL pass with 100% coverage of critical paths
6. WHEN edge cases occur THEN they SHALL be covered by tests with proper assertions
7. WHEN localStorage persistence is tested THEN it SHALL include page reload scenarios

### Requirement 9

**User Story:** As a developer, I want a provider abstraction for different storage and collaboration modes, so that I can use the same component for local-only and collaborative scenarios.

#### Acceptance Criteria

1. WHEN DocProvider interface is defined THEN it SHALL abstract storage and transport concerns
2. WHEN LocalDocProvider is used THEN it SHALL provide single-user localStorage persistence
3. WHEN YDocProvider is used THEN it SHALL enable real-time collaborative editing via Yjs
4. WHEN provider is switched THEN the Outliner component SHALL work without code changes
5. WHEN provider connects THEN it SHALL handle connection lifecycle and error states
6. WHEN provider disconnects THEN it SHALL gracefully handle offline scenarios
7. IF Yjs provider is used THEN collapsed state SHALL be stored as listItem attributes for replication

### Requirement 10

**User Story:** As multiple users, I want real-time collaborative editing with presence indicators, so that I can work together on the same document simultaneously.

#### Acceptance Criteria

1. WHEN multiple users connect to same roomId THEN they SHALL see each other's changes in real-time
2. WHEN I type content THEN other users SHALL see my changes immediately
3. WHEN I indent/outdent items THEN the changes SHALL sync to all connected users
4. WHEN I collapse/expand items THEN the state SHALL be shared across all users
5. WHEN users have cursors/selections THEN they SHALL be visible with different colors
6. WHEN I go offline and edit THEN changes SHALL merge automatically when reconnected
7. WHEN conflicts occur THEN Yjs CRDT SHALL resolve them deterministically using last-writer-wins for collapsed state
8. WHEN collapsed state conflicts occur THEN the most recent update SHALL win based on Yjs Lamport clocks
9. IF Hocuspocus server is used THEN it SHALL handle WebSocket connections and room management

### Requirement 11

**User Story:** As a developer, I want proper data persistence for collaborative scenarios, so that document state is preserved and can be restored.

#### Acceptance Criteria

1. WHEN Yjs updates occur THEN they SHALL be persisted in append-only fashion on server
2. WHEN server restarts THEN document state SHALL be restored from persisted updates
3. WHEN periodic snapshots are taken THEN they SHALL be stored as JSON for search/export
4. WHEN y-indexeddb is used THEN offline changes SHALL be cached locally
5. WHEN connection is restored THEN local cache SHALL merge with server state
6. IF authentication is required THEN JWT tokens SHALL be validated by Hocuspocus
7. IF authorization is needed THEN roomId access SHALL be controlled per user

### Requirement 12

**User Story:** As a developer, I want comprehensive E2E testing for collaborative features, so that I can ensure multi-user scenarios work correctly.

#### Acceptance Criteria

1. WHEN E2E tests run THEN they SHALL spawn two browser contexts connected to same roomId
2. WHEN user A types THEN user B SHALL see the changes in real-time
3. WHEN user A indents items THEN user B SHALL see the structural changes
4. WHEN user A collapses items THEN user B SHALL see the collapsed state
5. WHEN user B goes offline and edits THEN changes SHALL merge when reconnected
6. WHEN presence is enabled THEN user cursors/selections SHALL be visible to others
7. WHEN Hocuspocus server is used in tests THEN it SHALL be started/stopped automatically

### Requirement 13

**User Story:** As a developer, I want a demo application, so that I can see the component in action and understand how to integrate it.

#### Acceptance Criteria

1. WHEN the demo app runs THEN it SHALL showcase all major features of the Outliner
2. WHEN I interact with the demo THEN it SHALL demonstrate keyboard shortcuts and commands
3. WHEN I view the demo code THEN it SHALL provide clear integration examples
4. WHEN localStorage is enabled in demo THEN it SHALL persist content across sessions
5. WHEN ?room=xxx URL parameter is used THEN it SHALL switch to collaborative mode
6. WHEN collaborative mode is active THEN multiple browser tabs SHALL sync in real-time
7. IF slot renderers are used THEN the demo SHALL show examples of custom prefix/suffix content
# Project Goals

This is a React component library designed to showcase frontend architecture,
design patterns, and technical craftsmanship. It serves as a portfolio piece
demonstrating production-grade engineering standards.

## GitHub Visibility Standards

- Continuous, consistent commits over time (not bulk dumps)
- Architectural thinking must be evident in project structure
- Clear documentation: setup instructions, decision rationale, usage examples
- Live deployment link for hands-on exploration
- Comprehensive test coverage

## Code Architecture & Structure

- Abstract logic into modular, reusable pieces — never copy-paste
- Avoid deep nesting; flatten control flow and component hierarchies
- Build components that scale: composable, configurable, independent
- Separate concerns cleanly: data fetching, state, presentation, styling
- Every abstraction should earn its place — solve a real repeated pattern

## Code Quality & Clean Code

- Readability over cleverness — a team member should navigate the code without context
- Consistent naming conventions across files, components, props, and utilities
- Small, focused files with a single responsibility
- Meaningful prop APIs: intuitive names, sensible defaults, minimal required props
- No dead code, no commented-out blocks, no TODO debris in main branch

## Robustness

- Handle edge cases: empty states, loading, errors, overflow, missing data
- Clear separation between data and presentation layers
- Type safety everywhere — strict TypeScript, no `any` escapes
- Accessible by default (keyboard navigation, ARIA attributes, screen reader support)
- Tested: unit tests for logic, component tests for behavior, visual regression where useful

## Design Patterns to Demonstrate

- Compound components (e.g., `<Tabs>` + `<Tabs.Panel>`)
- Render props and headless patterns for maximum flexibility
- Custom hooks that encapsulate complex behavior cleanly
- Controlled & uncontrolled component patterns
- Polymorphic components (`as` prop)
- Context-based theming and configuration

## Basic rules

- Before writing any code, describe your approach and wait for approval.
- If the requirements I give you are ambiguous, ask clarifying questions before writing any code.
- After you finish writing any code, list the edge cases and suggest test cases to cover them.
- If a task requires changes to more than 3 files, stop and break it into smaller tasks first.
- When there's a bu, start by writing a test than reproduces it, then fix it until the test passes.
- Every time I correct you, reflect on what you did wrong and come up with a plan to never make the same mistake again.

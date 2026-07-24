# Controller ownership note

This workspace follows the documented architecture layering model:

- `css/` owns global and shared component styles.
- `js/data/` owns seed data and static catalog definitions.
- `js/services/` owns business logic and persistence orchestration.
- `js/pages/` is the page/controller entry point for page-specific event binding.
- `js/ui/` owns rendering helpers, modal, and toast components.
- `js/utils/` owns validators and shared helpers.
- `js/tests/` owns browser-test harnesses and page-level smoke checks.

The page controller entry points remain in `js/pages/` so the existing project structure continues to load cleanly while still honoring the architecture intent.

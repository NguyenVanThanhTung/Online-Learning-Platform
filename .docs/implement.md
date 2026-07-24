# LearnHub Implementation Roadmap

## 0. Git Workflow Guidelines
### 0.1. Branch Naming Rules
Always create new branches from ` `main``. Branch names should be in lowercase, separated by hyphens `-`, and include the GitHub issue ID.

**Syntax:** `<type>/<issue-id>-<short-name>`

 **Main`types`:**

| Type | Purpose |
| --- | --- |
| `feat` | New feature |
| `Fix` | Bug Fix |
| `Hotfix` | Urgent bug fix on production |
| `chore` | Configure, install libraries |
| `docs` | Update documentation |

**Example:**

- `feat/12-seat-booking` — Seat booking feature, Issue #12
- `fix/15-ui-checkout` — Fix checkout UI bug, Issue #15
- `hotfix/20-payment-crash` — Urgent fix for payment crash, Issue #20

### 0.2. Commit Message Guidelines
Use English, keep it concise. Do not capitalize the first letter after the colon. Each commit should do **exactly one thing**.

**Syntax:** `<type>(<scope/optional>): <message>`

**Common`types`:**

| Type | Purpose |
| --- | --- |
| `feat` | Add a new feature |
| `Fix` | Fix |
| `refactor` | Rewrite code to be more concise without changing functionality |
| `Chore` | Configuration (Docker, package.json...) |
| `docs` | Update documentation, README |
| `test` | Write or edit tests |
| `style` | Format code, lint (without changing the logic) |
| `CI` | Configure CI/CD pipeline |
| `perf` | Optimize performance |

**Example:**

- `feat(api): add row locking for booking`
- `fix(ui): fix seat map not updating on mobile`
- `chore: add LavinMQ to Docker Compose`
- `docs: update API endpoint in README`

### 0.3. Workflow (Team Workflow)

#### Step 1 — Create a new branch
Always ensure `the main branch` is up to date before creating a branch.

```
git checkout main
git pull origin main
git checkout -b feat/12-seat-booking
```

#### Step 2 — Code & Commit
Once a feature (or part of a feature) is complete, commit it. One commit per task, with a clear message.

### Step 3 — Sync `the main` branch before creating a PR
Before pushing, always update `the main branch` to the latest version to avoid conflicts:
```
git checkout main
git pull origin main
git checkout feat/12-seat-booking
git rebase main
```
Resolve any conflicts (if present), then push to GitHub.

### Step 4 — Create a Pull Request (PR)
Push the branch to GitHub and create a PR to merge into `the main branch`. Describe the PR using the template:

- **What changed?** — Brief description
- **Related issue** — Note " `Closes #12` " to automatically close the issue upon merge
- **Checklist:**
    - [ ]  Tested locally
    - [ ]  No console.log / extra code
    - [ ]  Rebased to the latest main branch

### Step 5 — Review & Merge
- Requires at least **one other member** to approve before merging.
- **No one should merge their own PR.**
- Use **Squash and Merge** to keep the history clean.
- **Delete the branch** after merging (check "Delete branch after merge" on GitHub).

## 1. Project Overview

LearnHub is a responsive static learning platform built with HTML5, CSS3, Bootstrap 5 CDN, vanilla ES6+ JavaScript, and browser `localStorage`. There is no backend or external database. The three pages are `index.html` (course listing), `course-detail.html` (lesson player and quizzes), and `admin.html` (course catalogue management).

The implementation follows the documented flow `Page -> Controller -> Service -> Storage`. HTML files contain layout only; UI components render received data; services own business rules; and only `StorageService` accesses `localStorage`. All feature issues include their own functional tests, responsive UI checks, and bug fixing. No standalone testing issues are created.

## 2. Development Phases

| Phase | Scope | Issues |
|---|---|---|
| Phase 1 - Foundation | Project conventions, data model, storage, state and test harness | FE-001 to FE-003 |
| Phase 2 - Shared UI | Shared shell, renderers, interaction primitives | FE-004 to FE-006 |
| Phase 3 - Course Listing | Static listing, search/filter/sort, page integration | FE-007 to FE-010 |
| Phase 4 - Course Detail | Detail shell, lesson progress, quizzes, integration | FE-011 to FE-014 |
| Phase 5 - Admin Panel | Admin shell, CRUD, querying/pagination, validation and integration | FE-015 to FE-018 |
| Phase 6 - Integration | Cross-page verification, accessibility, responsive polish and release | FE-019 to FE-020 |

## 3. Recommended Team Allocation

Use five parallel workstreams when five developers are available. With four developers, Developer E joins Developer D during feature work and owns integration during the final phase.

| Phase | Developer A | Developer B | Developer C | Developer D | Developer E |
|---|---|---|---|---|---|
| Foundation | Data model and services | Storage and tests | State and app bootstrap | Shared review/support | CI-free browser test harness |
| Shared UI | Shared navbar/footer | Course renderers | Modal, toast, filters | Responsive CSS | Review and integration support |
| Listing | Listing layout | Search/filter/sort logic | Listing controller | Listing acceptance testing | Defect support |
| Detail | Detail layout | Lesson progress | Quiz feature | Detail controller/integration | Cross-page review |
| Admin | Admin layout | CRUD service/controller | Search/filter/pagination | Modal validation | Admin acceptance testing |
| Final | Cross-page defects | Responsive/accessibility audit | Persistence and regression audit | Packaging and README | Release coordination |

To minimize conflicts, each developer owns the files named in their issue, avoids unrelated formatting, branches from updated `main`, and submits one focused PR per issue using the documented Git Flow and commit conventions.

## 4. Implementation Roadmap

### Parallelization Strategy

FE-001 is the only initial blocker. FE-002 follows it, then FE-003 completes the shared service contract. After FE-006, listing, detail, and admin work can proceed in parallel because each page has a separate controller and HTML entry point. FE-019 begins after all three page tracks are integrated; FE-020 is the release gate.

### Issue Dependency Summary

| Issue | Depends on |
|---|---|
| FE-001 | None |
| FE-002 | FE-001 |
| FE-003 | FE-002 |
| FE-004 | FE-002 |
| FE-005 | FE-002, FE-003 |
| FE-006 | FE-002, FE-004 |
| FE-007 | FE-001, FE-004, FE-006 |
| FE-008 | FE-002, FE-003, FE-007 |
| FE-009 | FE-005, FE-007 |
| FE-010 | FE-008, FE-009 |
| FE-011 | FE-001, FE-004, FE-006 |
| FE-012 | FE-002, FE-003, FE-011 |
| FE-013 | FE-002, FE-003, FE-011 |
| FE-014 | FE-012, FE-013 |
| FE-015 | FE-001, FE-004, FE-006 |
| FE-016 | FE-002, FE-003, FE-015 |
| FE-017 | FE-003, FE-005, FE-015 |
| FE-018 | FE-016, FE-017 |
| FE-019 | FE-010, FE-014, FE-018 |
| FE-020 | FE-019 |

## 5. Implementation Issues

### FE-001 - Establish project foundation and conventions

## 🎯 Mục tiêu
Create the shared project baseline so all developers use the same folders, script loading order, naming conventions, Bootstrap 5 integration, and page-level entry points.

## 📄 Yêu cầu chi tiết
- Confirm the documented `css/`, `js/data/`, `js/services/`, `js/controllers/`, `js/ui/`, `js/utils/`, `js/tests/` and `images/` ownership model.
- Keep HTML as layout skeletons and use `addEventListener`, never inline handlers or inline styles.
- Define shared script/module loading order and responsive Bootstrap breakpoints.
- Add a minimal browser test-runner convention compatible with the existing test files.

## 🧱 Các file liên quan
- `index.html`, `course-detail.html`, `admin.html`: shared page skeletons and script references.
- `css/style.css`, `css/components.css`: global and component styling entry points.
- `js/app.js`: common bootstrap entry point.
- `tests/test-runner.html`: browser test harness baseline.

## ⚙️ Chi tiết triển khai
- Work from `main` on `chore/fe-001-project-foundation`.
- Establish stable DOM IDs and `data-*` attributes for controller bindings.
- Load Bootstrap CSS/JS from the approved CDN and verify page scripts execute without errors.
- Document the local run and test workflow in `README.md` without changing the architecture.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] All three pages open directly in a browser at desktop, tablet and mobile widths.
- [ ] No inline styles or inline event handlers are introduced.
- [ ] Naming and folder conventions match architecture.md.
- [ ] Test runner loads without uncaught errors.
- [ ] Functional smoke test and UI verification are recorded in the PR.

## 🔗 Liên kết
Depends on: none. Unblocks FE-002 and FE-003.

## 📚 Ghi chú / Tham khảo
Reference: architecture.md sections 1-3 and requirement.md sections 1-3.

### FE-002 - Define domain seed data and storage contract

## 🎯 Mục tiêu
Create one canonical set of at least six courses and a safe `StorageService` contract that supports static listing plus persistent detail and admin workflows.

## 📄 Yêu cầu chi tiết
- Model `Course`, `Section`, `Lesson`, and `Quiz` using the fields in architecture.md.
- Include at least six courses across Web Dev, Design, Data Science and/or Marketing, with three lessons/quiz-capable sections where detail data is needed.
- Implement `load`, `save`, `remove`, `exists`, and `seed`; seed admin storage only when empty.
- Keep all localStorage access inside `StorageService` and use stable keys for courses, lesson progress, and quiz results.

## 🧱 Các file liên quan
- `js/data/courses.js`: canonical seed data.
- `js/services/storage-service.js`: storage abstraction and seed behavior.
- `tests/storage-service.test.js`: storage contract tests.
- `tests/course-service.test.js`: seed shape checks where appropriate.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-002-domain-storage` after FE-001.
- Normalize numeric price/rating and preserve `status`, thumbnail, description, curriculum, sections and quizzes.
- Handle missing, malformed and empty stored values without crashing the pages.
- Test round trips, removal, existence, first-run seeding and reload-equivalent reads.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Seed data satisfies every required course field and category coverage.
- [ ] No service, controller or renderer calls `localStorage` directly.
- [ ] Storage tests pass for normal and empty/missing keys.
- [ ] Data remains JSON-safe and can be consumed by all three pages.
- [ ] Functional persistence and regression checks are complete.

## 🔗 Liên kết
Depends on: FE-001. Unblocks FE-003, FE-004, FE-007, FE-011 and FE-015.

## 📚 Ghi chú / Tham khảo
Reference: architecture.md sections 4-5 and requirement.md sections 4.1, 4.3 and 4.4b.

### FE-003 - Implement business services, validation and application state

## 🎯 Mục tiêu
Provide the shared business layer and state contract that page controllers can use without duplicating filtering, persistence, validation or progress calculations.

## 📄 Yêu cầu chi tiết
- Implement CourseService retrieval, search, category/status filtering, sorting, pagination and CRUD.
- Implement LessonService progress toggling/calculation and QuizService score, pass threshold, result and retake behavior.
- Implement Validator rules for required text, title minimum, price, lesson count and rating.
- Define AppState fields for keyword, category, status, sort, current page, filtered courses and display courses.

## 🧱 Các file liên quan
- `js/services/course-service.js`, `lesson-service.js`, `quiz-service.js`: business rules.
- `js/utils/validator.js`, `js/utils/helper.js`: reusable validation and formatting.
- `js/store/app-state.js`: page state shape and reset behavior.
- Existing service test files: focused behavior coverage.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-003-business-layer` after FE-002.
- Services accept data and return data; they do not render UI or access the DOM.
- Keep pagination at five items where admin needs it, while exposing a reusable service method.
- Cover empty input, boundary values, missing course IDs, 70% quiz pass threshold and stable ID generation.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Service tests cover happy paths, boundaries and invalid inputs.
- [ ] Search matches title and instructor case-insensitively.
- [ ] Sort options preserve default order and correctly compare numeric values.
- [ ] Lesson and quiz persistence delegates to StorageService.
- [ ] No UI or DOM dependency exists in the business layer.

## 🔗 Liên kết
Depends on: FE-002. Unblocks FE-005, FE-008, FE-012, FE-013, FE-016 and FE-017.

## 📚 Ghi chú / Tham khảo
Reference: architecture.md sections 3-6 and requirement.md sections 4.2-4.4.

### FE-004 - Build shared navigation, footer and global responsive shell

## 🎯 Mục tiêu
Deliver consistent LearnHub branding, navigation, footer and responsive page chrome across listing, detail and admin pages.

## 📄 Yêu cầu chi tiết
- Build collapsible Bootstrap navbar with logo, Courses, About, Contact, search slot and Login/Admin actions as applicable.
- Build the three-column footer and copyright line consistently on public pages.
- Create global typography, spacing, colors, focus states and mobile/tablet/desktop layout rules.
- Keep page-specific content outside the shared shell.

## 🧱 Các file liên quan
- `index.html`, `course-detail.html`, `admin.html`: shared shell markup.
- `css/style.css`: global responsive styles.
- `js/ui/shared-renderer.js` or the existing shared UI location: reusable shell rendering if needed.
- `images/`, `assets/`: local logo and approved assets.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-004-shared-shell` after FE-002.
- Use Bootstrap grid/utilities and CSS classes; do not add inline styling.
- Verify keyboard focus, navbar collapse, link targets and footer wrapping at <576, 768-991 and >=992 px.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Public pages share the same navbar and footer structure.
- [ ] Navbar collapses and remains usable on mobile.
- [ ] No horizontal overflow appears at required breakpoints.
- [ ] Assets load locally and no console errors occur.
- [ ] Visual smoke checks and accessibility focus checks pass.

## 🔗 Liên kết
Depends on: FE-002. Unblocks FE-006, FE-007, FE-011 and FE-015.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md sections 1, 2 and 4.1a.

### FE-005 - Build reusable course, feedback and interaction UI components

## 🎯 Mục tiêu
Create presentation-only components used by listing, detail and admin flows, with clear input/output contracts and no storage knowledge.

## 📄 Yêu cầu chi tiết
- Build course card/table renderers, filter/search controls and pagination renderer.
- Build modal, confirmation modal and toast behavior with accessible labels and close actions.
- Build progress, accordion/lesson and quiz rendering primitives needed by detail.
- Ensure renderers accept data/state and emit DOM events for controllers.

## 🧱 Các file liên quan
- `js/ui/course-renderer.js`, `admin-renderer.js`: course cards and table output.
- `js/ui/modal.js`, `toast.js`: feedback and modal primitives.
- `css/components.css`: component styling.
- `js/utils/helper.js`: display formatting only.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-005-shared-components` after FE-002 and FE-003.
- Preserve architecture naming even where the current repository uses `ui/` rather than `components/`.
- Use event delegation or returned event hooks so controllers own behavior.
- Test empty states, long titles, validation messages, modal reset and responsive table/card layouts.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Components render valid markup from supplied data only.
- [ ] “No courses found” and “No results” states are supported.
- [ ] Modal, confirmation and toast states are keyboard and mouse usable.
- [ ] Components do not access localStorage or call services.
- [ ] Component-level functional and responsive checks pass.

## 🔗 Liên kết
Depends on: FE-002 and FE-003. Unblocks FE-006, FE-008, FE-012 and FE-017.

## 📚 Ghi chú / Tham khảo
Reference: architecture.md sections 3.2 and 5.6.

### FE-006 - Integrate application bootstrap and shared component contracts

## 🎯 Mục tiêu
Connect shared services, state, UI components and page entry points through `app.js` without creating a second architecture.

## 📄 Yêu cầu chi tiết
- Establish the common initialization sequence and page detection strategy.
- Verify shared renderers, modal, toast, helpers and services expose stable interfaces.
- Remove duplicate bootstrap logic and identify console errors before feature work.
- Provide a lightweight integration smoke path for each page.

## 🧱 Các file liên quan
- `js/app.js`: common bootstrap and dependency wiring.
- `js/pages/index.js`, `course-detail.js`, `admin.js`: entry-point handoff.
- `js/ui/`, `js/services/`, `js/store/`: interface alignment.
- `tests/test-runner.html`: smoke-test hooks.

## ⚙️ Chi tiết triển khai
- Work from `main` on `chore/fe-006-app-bootstrap` after FE-002 and FE-004.
- Keep controllers responsible for events and state; keep app bootstrap free of feature rules.
- Open all pages from a static server and directly from the browser where supported.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Each page initializes once with the correct controller.
- [ ] Shared dependencies load in a deterministic order.
- [ ] No duplicate listeners appear after refresh or re-entry.
- [ ] Smoke checks pass with no uncaught errors.

## 🔗 Liên kết
Depends on: FE-002 and FE-004. Unblocks FE-007 and shared feature integration.

## 📚 Ghi chú / Tham khảo
Reference: architecture.md section 7.

### FE-007 - Build the static course listing experience

## 🎯 Mục tiêu
Deliver the complete static course listing shell with hero, category tabs, responsive cards and navigation to course detail.

## 📄 Yêu cầu chi tiết
- Render at least six seeded courses across at least three categories.
- Build hero section with Browse Courses and Learn More actions.
- Render cards with thumbnail, title, rating, instructor, lesson count, price/Free and Enroll action.
- Provide responsive Bootstrap grid: 3 columns large, 2 medium, 1 small.

## 🧱 Các file liên quan
- `index.html`: listing layout and stable hooks.
- `js/pages/index.js`: listing initialization/controller entry.
- `js/ui/course-renderer.js`: card and empty-state rendering.
- `css/style.css`, `css/components.css`: listing presentation.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-007-course-listing-shell` after FE-001 and FE-004.
- Consume canonical data through CourseService; do not duplicate the seed array in the page.
- Make course links carry a stable course ID to `course-detail.html`.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Six or more courses render with correct metadata.
- [ ] Cards and hero match the requirement at all breakpoints.
- [ ] Enroll/detail links identify the selected course.
- [ ] Missing image or malformed optional text does not break the grid.
- [ ] Static listing functional and UI checks pass.

## 🔗 Liên kết
Depends on: FE-001 and FE-004. Unblocks FE-008 and FE-009.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md section 4.1a.

### FE-008 - Implement live course search, category filtering and sorting

## 🎯 Mục tiêu
Add real-time, combined search/filter/sort behavior to the listing without page reloads or data duplication.

## 📄 Yêu cầu chi tiết
- Match search against title and instructor, case-insensitively.
- Support All, Web Dev, Design, Data Science and Marketing tabs with active state.
- Combine keyword and category criteria; support clear icon and empty input reset.
- Support Default, price ascending, price descending and rating descending sorts.
- Display “No courses found” when the result set is empty.

## 🧱 Các file liên quan
- `js/pages/index.js`: CourseController event handling and AppState updates.
- `js/services/course-service.js`: query composition and sorting delegation.
- `js/ui/course-renderer.js`: rerender and empty state.
- `index.html`, `css/components.css`: controls and active/empty styles.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-008-course-discovery` after FE-002, FE-003 and FE-007.
- Keep query state in AppState and reset current page if pagination is later shared.
- Use `addEventListener` and ensure clearing the input immediately restores the list.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Search, category and sort work independently and in combination.
- [ ] Cards not matching are hidden or rerendered consistently without stale cards.
- [ ] Active tab and empty state are correct.
- [ ] Keyboard input and clear action update immediately.
- [ ] Functional matrix and responsive UI checks pass; defects are fixed.

## 🔗 Liên kết
Depends on: FE-002, FE-003 and FE-007. Unblocks FE-010 and FE-019.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md section 4.2.

### FE-009 - Build the course listing controller and state integration

## 🎯 Mục tiêu
Connect listing controls to CourseService, AppState and CourseRenderer using the documented event flow.

## 📄 Yêu cầu chi tiết
- Initialize state, render the default list and bind search, tabs, sort and course actions.
- Route course selection to the detail page with the selected ID.
- Keep controllers free of filtering algorithms and renderers free of business logic.
- Handle missing or invalid course IDs with a user-visible fallback.

## 🧱 Các file liên quan
- `js/pages/index.js`: controller and event flow.
- `js/store/app-state.js`: listing state lifecycle.
- `js/services/course-service.js`: data access/query calls.
- `js/ui/course-renderer.js`: final view updates.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-009-listing-controller` after FE-005 and FE-007.
- Use one render path after every state change to avoid stale UI.
- Verify browser refresh, direct detail navigation and back navigation behavior.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Event flow is Page -> Controller -> Service -> State -> Renderer.
- [ ] Every supported control updates the visible list.
- [ ] No localStorage or DOM business logic leaks into services.
- [ ] Direct navigation and invalid selection have defined behavior.
- [ ] Controller functional and UI smoke checks pass.

## 🔗 Liên kết
Depends on: FE-005 and FE-007. Unblocks FE-010 and FE-019.

## 📚 Ghi chú / Tham khảo
Reference: architecture.md sections 3.3, 3.5 and 6.1.

### FE-010 - Complete and polish course listing acceptance slice

## 🎯 Mục tiêu
Harden the listing page as one demonstrable feature slice, resolving integration defects across layout, data, controls and navigation.

## 📄 Yêu cầu chi tiết
- Exercise all combinations of search, category, sort, clear and empty state.
- Verify prices, ratings, lesson counts, thumbnails, links and seeded data.
- Check responsive grid, navbar search placement, focus order, button labels and overflow.
- Fix only listing-related defects and preserve service/component contracts.

## 🧱 Các file liên quan
- `index.html`, `css/style.css`, `css/components.css`: listing defects and polish.
- `js/pages/index.js`, `js/ui/course-renderer.js`: integration fixes.
- `tests/course-service.test.js`, `tests/validator.test.js`: regression additions where relevant.

## ⚙️ Chi tiết triển khai
- Work from `main` on `fix/fe-010-listing-acceptance` after FE-008 and FE-009.
- Test in a clean browser profile and with an empty result set.
- Record known limitations rather than changing unrelated pages.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Listing requirements are demonstrable end to end.
- [ ] No console errors or stale result states remain.
- [ ] Responsive and keyboard checks pass at all required widths.
- [ ] Relevant tests pass and defects found in this slice are fixed.

## 🔗 Liên kết
Depends on: FE-008 and FE-009. Unblocks FE-019.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md sections 4.1a and 4.2.

### FE-011 - Build the course detail layout and curriculum shell

## 🎯 Mục tiêu
Deliver the responsive course detail page with course summary, sticky purchase panel, learning outcomes, description and Bootstrap curriculum accordion.

## 📄 Yêu cầu chi tiết
- Resolve a course from the URL ID and render title, banner/thumbnail, instructor, rating, students, price and description.
- Render four learning outcomes and sidebar inclusions: lessons, lifetime access, certificate and mobile access.
- Render sections and lessons from course data in a Bootstrap accordion.
- Provide a clear missing-course state and return-to-courses navigation.

## 🧱 Các file liên quan
- `course-detail.html`: two-column detail layout and accordion hooks.
- `js/pages/course-detail.js`: detail controller initialization.
- `js/ui/course-renderer.js`: detail/accordion rendering additions.
- `css/style.css`, `css/components.css`: sticky sidebar and responsive layout.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-011-course-detail-shell` after FE-001 and FE-004.
- Consume CourseService.getById and keep all rendering in UI functions.
- Ensure sticky behavior is disabled or naturally stacked on small screens.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Valid course IDs render complete detail content.
- [ ] Invalid or absent IDs show a usable fallback.
- [ ] Accordion sections open independently and are responsive.
- [ ] Sidebar and content do not overlap at any required width.
- [ ] Detail functional and UI smoke checks pass.

## 🔗 Liên kết
Depends on: FE-001 and FE-004. Unblocks FE-012, FE-013 and FE-014.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md section 4.1b and architecture.md sections 4.2-4.4.

### FE-012 - Implement persistent lesson progress and lesson-player behavior

## 🎯 Mục tiêu
Allow learners to mark lessons complete, restore progress after reload, and see aggregate and per-section completion in the detail page.

## 📄 Yêu cầu chi tiết
- Render a checkbox for every lesson and a simulated video/player area for the selected lesson.
- Store completed lesson IDs in localStorage through LessonService/StorageService.
- Render “X / Y lessons completed” and proportional progress bar.
- Show a completion badge when all lessons in a section are complete.
- Preserve progress per course and avoid progress leakage between courses.

## 🧱 Các file liên quan
- `js/services/lesson-service.js`: toggle, load, save and calculation rules.
- `js/pages/course-detail.js`: LessonController event handling.
- `js/ui/course-renderer.js`: lesson and progress rendering.
- `js/ui/progress-bar.js` or existing UI location, `tests/lesson-service.test.js`.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-012-lesson-progress` after FE-002, FE-003 and FE-011.
- Use stable course/section/lesson IDs and restore state before first render.
- Keep checkbox events in the controller and progress calculations in LessonService.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Checking/unchecking persists immediately.
- [ ] Reload restores every checkbox and aggregate progress value.
- [ ] Section badge appears only when its lessons are complete.
- [ ] Progress is isolated by course and handles zero/complete cases.
- [ ] Service tests, functional tests and responsive UI checks pass.

## 🔗 Liên kết
Depends on: FE-002, FE-003 and FE-011. Unblocks FE-014 and FE-019.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md section 4.3a and architecture.md event flow 6.4.

### FE-013 - Implement section quizzes, results and persistence

## 🎯 Mục tiêu
Deliver section quizzes with hardcoded multiple-choice questions, scoring, inline result feedback, pass/fail persistence and retake/continue flows.

## 📄 Yêu cầu chi tiết
- Render a Take Quiz button after each section’s lessons and an inline panel with at least three questions and three or four options.
- Calculate and display score and per-question correct/incorrect results.
- Pass at >=70% with Continue to next section; fail below 70% with Retake Quiz.
- Save quiz outcome per course and section and restore it safely.
- Validate unanswered questions with a clear user-facing response.

## 🧱 Các file liên quan
- `js/services/quiz-service.js`: submit, score, pass, retake and save result.
- `js/pages/course-detail.js`: QuizController event handling.
- `js/ui/course-renderer.js`, `js/ui/modal.js`: quiz and feedback rendering.
- `tests/quiz-service.test.js`, `css/components.css`: quiz states.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-013-section-quizzes` after FE-002, FE-003 and FE-011.
- Keep answer keys in data/service inputs and never expose grading logic through UI state.
- Continue opens the next Bootstrap accordion panel and handles the final section gracefully.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Every section has at least three valid questions and options.
- [ ] Scores and per-question feedback are accurate.
- [ ] Pass, fail, retake and continue states behave as required.
- [ ] Outcomes survive reload and remain isolated by course/section.
- [ ] Quiz service tests and detail UI/functional checks pass.

## 🔗 Liên kết
Depends on: FE-002, FE-003 and FE-011. Unblocks FE-014 and FE-019.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md section 4.3b and architecture.md event flow 6.5.

### FE-014 - Integrate and accept the course detail learning flow

## 🎯 Mục tiêu
Combine detail rendering, lesson progress, quiz behavior and navigation into a complete learner journey.

## 📄 Yêu cầu chi tiết
- Verify course selection from listing opens the correct detail page.
- Verify lesson completion updates progress and section status before and after reload.
- Verify each quiz can be opened, submitted, passed, failed, retaken and continued.
- Verify sticky sidebar, accordion, player simulation and feedback work together on mobile and desktop.

## 🧱 Các file liên quan
- `course-detail.html`, `js/pages/course-detail.js`: integrated flow fixes.
- `js/services/lesson-service.js`, `quiz-service.js`: defect fixes only.
- `js/ui/course-renderer.js`, `css/components.css`: integrated UI states.
- Relevant lesson/quiz tests: regression coverage.

## ⚙️ Chi tiết triển khai
- Work from `main` on `fix/fe-014-detail-acceptance` after FE-012 and FE-013.
- Use a clean storage namespace for repeatable manual scenarios and test refresh explicitly.
- Do not introduce page-to-page direct localStorage access.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Full detail learning journey meets all Problem 03 acceptance requirements.
- [ ] No state is lost when switching sections or refreshing.
- [ ] No overlapping controls or inaccessible feedback appears at required widths.
- [ ] Relevant automated and manual regression checks pass.

## 🔗 Liên kết
Depends on: FE-012 and FE-013. Unblocks FE-019.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md sections 4.1b and 4.3.

### FE-015 - Build the admin panel shell and course management workspace

## 🎯 Mục tiêu
Create the responsive admin page structure with navigation, sidebar, course management toolbar, table region and modal hooks.

## 📄 Yêu cầu chi tiết
- Build admin navbar with LearnHub, Admin Panel, Admin and Logout controls.
- Build sidebar links for Dashboard, Courses, Instructors and Reports, with Courses active by default.
- Build management heading, Add New Course action, search/filter controls, table and pagination regions.
- Support row actions, selection checkboxes and no-results state in the presentation contract.

## 🧱 Các file liên quan
- `admin.html`: admin layout and stable hooks.
- `js/pages/admin.js`: controller entry and view initialization.
- `js/ui/admin-renderer.js`: table, empty state and toolbar rendering.
- `css/style.css`, `css/components.css`: dashboard/sidebar/table responsiveness.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-015-admin-shell` after FE-001 and FE-004.
- Use CourseService data through the controller and keep the table renderer storage-agnostic.
- Make wide tables usable on mobile through responsive overflow or a deliberate compact layout.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Admin shell matches the required information architecture.
- [ ] Courses view is active and usable by default.
- [ ] Table, controls, actions and pagination have stable controller hooks.
- [ ] Sidebar, table and modal triggers are usable at all required widths.
- [ ] Admin shell smoke and UI checks pass.

## 🔗 Liên kết
Depends on: FE-001 and FE-004. Unblocks FE-016 and FE-017.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md section 4.4a and architecture.md section 3.1.

### FE-016 - Implement admin course CRUD with localStorage persistence

## 🎯 Mục tiêu
Deliver create, read, update and delete operations in the admin panel with immediate persistence and user feedback.

## 📄 Yêu cầu chi tiết
- Seed the same course catalogue when storage is empty and read it on page load.
- Create courses with generated IDs and all required catalogue fields.
- Edit using the same modal prefilled with current data.
- Delete through confirmation, close an affected edit modal and show created/updated/deleted toasts.
- Rerender the table after each successful mutation.

## 🧱 Các file liên quan
- `js/pages/admin.js`: AdminController events and CRUD orchestration.
- `js/services/course-service.js`: add/update/delete usage and persistence.
- `js/ui/admin-renderer.js`, `js/ui/modal.js`, `toast.js`: forms, confirmation and feedback.
- `admin.html`, `tests/course-service.test.js`, `tests/storage-service.test.js`: hooks and regression tests.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-016-admin-crud` after FE-002, FE-003 and FE-015.
- Keep validation in Validator and persistence behind CourseService/StorageService.
- Ensure reload after each mutation shows the same catalogue and deleting the last page returns to a valid page.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Create, read, update and delete work end to end.
- [ ] Every mutation persists immediately and survives refresh.
- [ ] Confirmation and toast messages are accurate.
- [ ] Generated IDs do not collide with existing courses.
- [ ] CRUD functional, persistence and UI checks pass.

## 🔗 Liên kết
Depends on: FE-002, FE-003 and FE-015. Unblocks FE-018 and FE-019.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md sections 4.4b, 4.4e, 4.4f and 4.4g.

### FE-017 - Implement admin validation, combined filters and pagination

## 🎯 Mục tiêu
Complete the admin catalogue workflow with required-field validation, simultaneous search/category/status filters and five-row pagination.

## 📄 Yêu cầu chi tiết
- Validate title required/minimum five characters, instructor required, lesson count 1-100, price >=0 and rating 1.0-5.0.
- Support Web Dev, Design, Data Science, Marketing and Other categories plus Published/Draft status.
- Filter title search, category and status together; show no-results row.
- Render five courses per page with page numbers, Prev and Next.
- Reset page to one whenever search or filters change and preserve valid page after mutations.

## 🧱 Các file liên quan
- `js/utils/validator.js`: field rules and messages.
- `js/services/course-service.js`: combined filtering and pagination calls.
- `js/pages/admin.js`: filter/page state and events.
- `js/ui/admin-renderer.js`, `js/ui/pagination.js`, `admin.html`: form/table output.
- `tests/validator.test.js`, `tests/course-service.test.js`: boundary and query tests.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-017-admin-query-validation` after FE-003, FE-005 and FE-015.
- Keep filter state in AppState or the documented admin controller state.
- Prevent invalid submission without losing valid form values and display errors near fields.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] All specified validation boundaries and error states are covered.
- [ ] Search/category/status filters compose correctly.
- [ ] Pagination shows five rows per page and correct disabled states.
- [ ] Filter changes reset to page one and empty results are clear.
- [ ] Functional, boundary, responsive and regression tests pass.

## 🔗 Liên kết
Depends on: FE-003, FE-005 and FE-015. Unblocks FE-018 and FE-019.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md sections 4.4c-4.4e.

### FE-018 - Integrate admin workflows and optional bonus capabilities

## 🎯 Mục tiêu
Accept the admin panel as a complete management feature and implement the specified bonus capabilities when the core workflow is stable.

## 📄 Yêu cầu chi tiết
- Integrate CRUD, validation, combined filters, pagination, modal lifecycle and toast feedback.
- Implement bulk delete with row checkboxes and Delete Selected confirmation if time permits.
- Implement filtered-list CSV export using a JavaScript Blob if time permits.
- Ensure bulk actions and export use the current filtered data and do not bypass services unexpectedly.

## 🧱 Các file liên quan
- `admin.html`, `js/pages/admin.js`: integrated controls and event flow.
- `js/services/course-service.js`: bulk deletion/export data contract as needed.
- `js/ui/admin-renderer.js`, `modal.js`, `toast.js`, `pagination.js`: final UI states.
- `css/components.css`, service and validator tests: polish and regressions.

## ⚙️ Chi tiết triển khai
- Work from `main` on `feat/fe-018-admin-acceptance` after FE-016 and FE-017.
- Treat CRUD, validation, filters and pagination as mandatory; gate bonus work behind them.
- Confirm delete actions are explicit and export escapes commas, quotes and newlines correctly.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Mandatory admin requirements pass end to end after refresh.
- [ ] No stale modal, page, filter or selection state remains.
- [ ] Bulk delete, when delivered, confirms and persists all selected IDs.
- [ ] CSV export, when delivered, contains the current filtered catalogue.
- [ ] Admin functional, UI, persistence and regression checks pass.

## 🔗 Liên kết
Depends on: FE-016 and FE-017. Unblocks FE-019.

## 📚 Ghi chú / Tham khảo
Reference: requirement.md sections 4.4 and 4.5.

### FE-019 - Perform cross-page integration and responsive accessibility audit

## 🎯 Mục tiêu
Verify that listing, detail and admin pages work together as one platform and that shared contracts do not regress across feature branches.

## 📄 Yêu cầu chi tiết
- Test listing-to-detail navigation for every course and invalid IDs.
- Verify admin-created/updated/deleted catalogue data is visible consistently where persistence is intended.
- Verify lesson progress and quiz results persist independently from catalogue changes.
- Audit responsive behavior at desktop >=992 px, tablet 768-991 px and mobile <576 px.
- Audit keyboard navigation, labels, focus, color/status feedback, empty states and console cleanliness.

## 🧱 Các file liên quan
- All three HTML pages and shared CSS: cross-page defects.
- `js/app.js`, page controllers and services: contract or initialization defects.
- `tests/test-runner.html` and all `tests/*.test.js`: regression execution.
- `README.md`: verified run/test instructions.

## ⚙️ Chi tiết triển khai
- Work from `main` on `fix/fe-019-cross-page-integration` after FE-010, FE-014 and FE-018.
- Use a clean storage profile plus a seeded profile; repeat refresh and navigation scenarios.
- Fix integration defects at the owning layer and avoid page-specific workarounds that violate architecture.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] All mandatory requirements have a passing end-to-end scenario.
- [ ] Cross-page storage keys and IDs behave consistently.
- [ ] No layout overlap, horizontal overflow or unusable control exists at required widths.
- [ ] Automated tests, browser tests and accessibility smoke checks pass.
- [ ] All discovered release-blocking defects are fixed and retested.

## 🔗 Liên kết
Depends on: FE-010, FE-014 and FE-018. Unblocks FE-020.

## 📚 Ghi chú / Tham khảo
Reference: all sections of architecture.md and requirement.md.

### FE-020 - Final hardening, packaging and delivery readiness

## 🎯 Mục tiêu
Prepare the finished platform for grading and delivery as a clean, documented zip-ready project.

## 📄 Yêu cầu chi tiết
- Run the full test runner and repeat critical manual scenarios from a clean browser profile.
- Remove debug output, dead code, broken links, unused assets and accidental generated files.
- Verify local assets, CDN references, naming conventions, comments and README group information.
- Confirm the project folder can be compressed as one required project directory without hidden dependencies.
- Record any intentionally omitted bonus item without changing mandatory scope.

## 🧱 Các file liên quan
- Entire project: final defects and release checks.
- `README.md`: setup, test, team and delivery notes.
- `tests/test-runner.html`, `tests/*.test.js`: final verification.
- `index.html`, `course-detail.html`, `admin.html`: final links and script audit.

## ⚙️ Chi tiết triển khai
- Work from `main` on `chore/fe-020-release-readiness` after FE-019.
- Rebase on the latest `main`, run the browser test harness, inspect the console and verify all target widths.
- Review the final diff for unrelated changes before creating the delivery archive; do not commit generated archives into the source branch unless requested.

## ✅ Tiêu chí hoàn thành (Definition of Done)
- [ ] Full automated and manual acceptance checks pass.
- [ ] Mandatory requirements and architecture boundaries are satisfied.
- [ ] No console errors, debug logs, inline handlers or inline styles remain.
- [ ] README and project structure are delivery-ready.
- [ ] Final PR checklist, review and rebase requirements are complete.

## 🔗 Liên kết
Depends on: FE-019. This is the release gate.

## 📚 Ghi chú / Tham khảo
Reference: implement.md roadmap, architecture.md, requirement.md and the team Git Flow rules.

## 6. Milestones

| Milestone | Exit criteria | Target sequence |
|---|---|---|
| M1 Foundation ready | Shared structure, canonical data, storage, services and tests are stable | FE-001 to FE-003 |
| M2 Shared UI ready | Shell, renderers, modal/toast/filter primitives and bootstrap work | FE-004 to FE-006 |
| M3 Listing complete | Static listing plus combined search/filter/sort is accepted | FE-007 to FE-010 |
| M4 Learning complete | Detail page, lesson persistence and quiz flow are accepted | FE-011 to FE-014 |
| M5 Admin complete | CRUD, validation, filters and pagination persist correctly | FE-015 to FE-018 |
| M6 Release candidate | Cross-page, responsive, accessibility and regression checks pass | FE-019 |
| M7 Delivery ready | Final hardening, documentation and packaging checks pass | FE-020 |

Each milestone closes only after its issue-level acceptance criteria, functional tests, UI verification and defect fixes are complete. PRs should be merged with squash-and-merge after review, and every branch should be rebased on the latest `main` before submission.
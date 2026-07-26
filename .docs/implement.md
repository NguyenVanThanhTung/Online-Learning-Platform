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
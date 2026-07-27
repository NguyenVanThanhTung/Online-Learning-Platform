# Task summary: Essentials — Online Learning Platform
Final Group Exam | Group of 6 | Take-home

## 1. Working Tools & Delivery Requirements
- Working tools: Visual Studio Code (recommended). Any text editor is acceptable.
- Delivery: Source code in a compressed archive (.zip extension required).
- Project name: GroupX_fee.finalexam.t01 — all files inside this single folder.
- Suggested file structure:
```
[ PROJECT STRUCTURE ]
GroupX_fee.finalexam.t01/
├── index.html ← Course Listing page (Problem 01 + 02)
├── course-detail.html ← Course Detail + Lesson Player (Problem 03)
├── admin.html ← Admin CRUD Panel (Problem 04)
├── style.css ← Shared styles
├── app.js ← Shared JS (data, utility functions)
├── admin.js ← Admin page logic
├── detail.js ← Detail/quiz page logic
├── images/ ← Any image assets
└── README.txt ← Group members list
```

## 2. Working Tools & Delivery Requirements
- HTML5, CSS3, Bootstrap 5 (CDN — no npm). Bootstrap Icons allowed.
- Vanilla JavaScript (ES6+). No jQuery, no React, no Vue.
- localStorage — required for Problems 03 and 04 to persist data across page refreshes.
- Chart.js (CDN) — optional, only if used for the admin dashboard widget in Problem 04.
- All assets (images, fonts) must be included in the project folder — no remote CDN for images.\

## 3. Technical Requirements
- All pages must be fully responsive: correct layout on desktop (≥ 992 px), tablet (768–991 px), and mobile (< 576 px).
- Follow standard naming convention: lowercase filenames, class names in kebab-case (e.g. course-card), JS variables in camelCase.
- No inline style="..." attributes. Use CSS classes only. No inline onclick="..." — use addEventListener.
- Code must be readable and well-commented. Each JavaScript function must have a one-line comment describing its purpose.

## 4. Problem
### 4.1. Problem 01 — Course Listing & Detail Pages (Static) [25%]
**Overview:** Build the visual shell of the platform: a Course Listing page (index.html) and a Course Detail page (course-detail.html). In this problem, data is hardcoded in a JS array — no user interaction yet.

#### a> Layout Structure
- **Shared Navbar & Footer**
```
[ SHARED NAVBAR ]
┌──────────────────────────────────────────────────────────────┐
│ [Logo] LearnHub | Courses About Contact [ Search]  | Login   │
└──────────────────────────────────────────────────────────────┘
Collapses to hamburger (☰) on mobile. “Login” is a button styled with Bootstrap.
```
The Footer spans full width: 3 columns (About LearnHub | Quick Links | Contact), copyright line at bottom. Consistent on both pages.

- **Course Listing Page (index.html)**
```
[ COURSE LISTING PAGE ]
Hero Section:
┌────────────────────────────────────────────────────────┐
│ Grow Your Skills with LearnHub                         │
│ “Explore 100+ expert-led courses at your own pace.”    │
│ [Browse Courses ▶] [Learn More]                       │
└────────────────────────────────────────────────────────┘
Category Tabs (below hero):
[ All ] [ Web Dev ] [ Design ] [ Data Science ] [ Marketing ]
Course Cards Grid (Bootstrap: 3 cols on lg, 2 on md, 1 on sm):
┌─────────────────┐ ┌────────────────┐ ┌────────────────┐
│ [Thumbnail]     │ │ [Thumbnail]    │ │ [Thumbnail]    │
│ Course Title    │ │ Course Title   │ │ Course Title   │
│ ⭐4.8 (120)    │ │ ⭐ 4.5 (89)    │ │ ⭐ 4.9 (240)  │
│ �Instructor    │ │ � Instructor  │ │ �� Instructor │
│ �12 lessons    │ │ � 8 lessons   │ │ �� 20 lessons │
│ $49 [Enroll]    │ │ FREE [Enroll]  │ │ $89 [Enroll]   │
└─────────────────┘ └────────────────┘ └────────────────┘
Show at least 6 hardcoded courses across 3 categories.
```

- **Course Detail Page (course-detail.html)**
```
[ COURSE DETAIL PAGE ]
Left (col-lg-8): Right (col-lg-4) — sticky sidebar:
┌───────────────────────────────┐ ┌──────────────────────┐
│ [Video/Image Banner]          │ │ [Course Thumbnail]   │
│ Course Title (h1)             │ │ $49                  │
│ ⭐ 4.8 • 1,200 students      │ │ [Enroll Now ▶]       │
│ By: Instructor Name           │ │ This course includes:│
├───────────────────────────────┤ │ ✅ 12 video lessons  │
│ What You’ll Learn (4 bullets) │ │ ✅ Lifetime access  │
├───────────────────────────────┤ │ ✅ Certificate      │
│ Course Description (2 paras)  │ │ ✅ Mobile-friendly  │
├───────────────────────────────┤ └──────────────────────┘
│ Curriculum (Accordion):       │
│ ▶ Section 1 — 3 lessons      │
│ ▶ Section 2 — 4 lessons      │
│ ▶ Section 3 — 5 lessons      │
└───────────────────────────────┘
Use Bootstrap Accordion for the curriculum. Data is hardcoded.
```

### 4.2. Problem 02 — Interactive Course Search & Filtering [20%]
**Overview:** Make the course listing page interactive. All filtering is done in JavaScript on the hardcoded courses array — no page reload.

#### a> Search + Live Filter
Add a live search input in the navbar or above the course grid:
- As the user types, filter the course cards in real time. Match against Course Title and Instructor Name (case-insensitive).
- Cards that do not match are hidden (not removed from the DOM). Show a “No courses found” message if the filtered result is empty.
- Clicking the clear (✕) icon or deleting all text resets the list immediately.

#### b> Category Filter Tabs
The category tabs above the course grid are interactive:
- “All” shows every course. Clicking a specific category shows only courses in that category.
- Search and category filters work together: if the user has searched for “JavaScript” and clicks” Web Dev”, only Web Dev courses matching “JavaScript” are shown.
- The active tab is visually highlighted (Bootstrap nav-link active class or custom style).

#### c> Sort Dropdown 
A dropdown above the grid (e.g. "Sort by"):
- "Default" — original order.
- "Price: Low to High" / "Price: High to Low" — re-render cards sorted by price.
- "Rating: High to Low" — re-render sorted by star rating descending.

### 4.3. Problem 03 — Lesson Player & Quiz Feature [25%]
**Overview:** Add interactivity to course-detail.html: a lesson video player simulation and a quiz at the end of a section. Progress is saved to localStorage.

#### a> Lesson Progress Tracker
- Each lesson in the curriculum accordion has a checkbox (✅). When the user ticks a checkbox, mark that lesson as complete (store in localStorage as an array of completed lesson IDs).
- Show a progress bar at the top of the curriculum section: “X / Y lessons completed”; fills proportionally.
- When the page reloads, the checkboxes and progress bar must restore from localStorage.
- If all lessons in a section are complete, the section header shows a ✅ badge.

#### b> Section Quiz
After the last lesson of each accordion section, show a “Take Quiz” button. Clicking it reveals an inline quiz panel:
- Each section must have at least 3 multiple-choice questions with 3–4 options. Answers are hardcoded in the JS.
- On “Submit Quiz”: calculate the score (e.g. “2 / 3 correct”). Show each question result inline: correct answer in green, wrong in red.
- If the score ≥ 70%, show a pass message and a “Continue to next section” button that opens the next accordion panel. Save the pass/fail to localStorage.
- If score < 70%, show a fail message and a “Retake Quiz” button that resets the form.

### 4.4 Problem 04 — Admin Panel — Full CRUD + localStorage
**Overview:** Build a separate admin.html page where an admin can manage the course catalogue. Data is
stored in localStorage and must persist across page refreshes.

#### a> Admin Page Layout
```
[ ADMIN PANEL (admin.html) ]
Top: Navbar with [Logo] | "Admin Panel" | [Admin] [Logout]
Left sidebar (fixed, same pattern as Problem 01 dashboard): Dashboard | Courses | Instructors |  Reports
Main area — default active view: Courses Management
┌────────────────────────────────────────────────────────┐
│ Courses Management                  [+ Add New Course] │
│ [Search courses...] [Category ▼] [Status ▼]            │
│                                                        │
│ ┌────┬──────────────────┬──────────┬───────┬──────────┐│
│ │ #  │ Title            │ Category │ Price │ Actions  ││
│ ├────┼──────────────────┼──────────┼───────┼──────────┤│
│ │ 1  │ HTML Fundamentals│ Web Dev  │ FREE  │ ✏️      ││
│ │ 2  │ CSS Mastery      │ Design   │ $49   │ ✏️      ││
│ └────┴──────────────────┴──────────┴───────┴──────────┘│
│ Pagination: [◀ Prev] 1 2 3 [Next ▶] (5 per page)      │
└───────────────────────────────────── ──────────────────┘
```

#### b> localStorage Persistence
On page load, admin.js reads the course list from localStorage. If nothing is stored, seed it with the same 6 hardcoded courses from Problem 01. Every Create/Update/Delete operation must immediately update localStorage.

#### c> READ + Search + Filter
Render the courses in the table. Search bar filters by title (live, as the user types). Category and Status dropdowns filter the table. Show a “No results” row if empty. Apply all filters simultaneously.

#### d> Pagination
Display 5 courses per page. Show page numbers at the bottom. “Prev”/ “Next” buttons. When search/filter changes the result set, reset to page 1.

#### e> CREATE
Add New Course button opens a Bootstrap modal with:
– Title (text, required, min 5 characters)
– Category (select: Web Dev / Design / Data Science / Marketing / Other)
– Instructor Name (text, required)
– Lesson Count (number, required, 1–100)
– Price (number, ≥ 0 — enter 0 for Free)
– Rating (number, 1.0–5.0)
– Status (select: Published / Draft)
**On submit:** validate, generate an ID, push to the array, save to localStorage, re-render table, close modal, show toast “Course created”

#### f> UPDATE
(Edit) button opens the same modal pre-filled with the course’s current data. On save: update the object in the array, save to localStorage, re-render, show toast “Course updated.”

#### g> DELETE
(Delete) button shows confirmation modal. On confirm: remove from array, save to localStorage, re-render. If deleted course was being edited, close the edit modal first. Show toast “Course deleted.”

### 4.5. Bonus (+5% extra)
(a) Bulk delete: checkboxes on each row + “Delete Selected” button. 
(b) Export to CSV: a button that downloads the current filtered course list as a .csv file using JavaScript Blob.
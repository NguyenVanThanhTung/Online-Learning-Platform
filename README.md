# Online-Learning-Platform

## Frontend foundation and local workflow

### Ownership model
- `css/` owns shared global and component stylesheet entry points.
- `js/data/` owns static seed data.
- `js/services/` owns business logic and persistence helpers.
- `js/controllers/` owns page bootstrap logic and DOM event wiring.
- `js/ui/` owns renderer and UI helper modules.
- `js/utils/` owns validators and utility helpers.
- `js/tests/` owns browser-runner and smoke test files.
- `images/` and `assets/` store static media and supporting assets.

### Script loading order
1. Bootstrap CSS from the approved CDN.
2. Shared `css/style.css` and `css/components.css`.
3. Bootstrap JS bundle from the approved CDN.
4. Shared `js/app.js` bootstrap.
5. Page controller module from `js/controllers/`.
6. Page script from `js/pages/`.

### Responsive breakpoints
- `sm`: 576px
- `md`: 768px
- `lg`: 992px
- `xl`: 1200px

### Local run and test workflow
- Open the project root with a static file server, for example:
  - `python -m http.server 8000`
- Browse to the page directly in the browser, for example:
  - `http://127.0.0.1:8000/index.html`
  - `http://127.0.0.1:8000/course-detail.html`
  - `http://127.0.0.1:8000/admin.html`
- Open the browser test runner at:
  - `http://127.0.0.1:8000/js/tests/test-runner.html`

### Notes
- HTML remains a layout skeleton only.
- All interaction handlers use `addEventListener` and no inline event attributes are introduced.
- Stable DOM IDs and `data-*` attributes are reserved for controller bindings.

```
STT	| MSSV		    | Họ và tên		        | Ghi chú   |
1	| 23020600	    | Lưu Minh Đức		    |           |
2	| 23020177	    | Nguyễn Hoàng Vũ	    |	        |
3	| B22DCCN479	| Nguyễn Đức Lâm	    |	        |
4	| 23021716	    | Nguyễn Văn Thanh Tùng	| (C)       |
5	| B22DCKH083	| Phạm Tiến Nghĩa		|           |
```
(function () {
    const ITEMS_PER_PAGE = 5;
    const STORAGE_KEY = 'learnhub_courses';

    let courses = [];
    let filteredCourses = [];
    let currentPage = 1;
    let editingCourseId = null;
    let courseModal;
    let deleteModal;
    let courseToDeleteId = null;

    function initAdmin() {
        const tbody = document.getElementById('courses-tbody');
        if (!tbody) return;

        const courseModalElement = document.getElementById('courseModal');
        const deleteModalElement = document.getElementById('deleteConfirmModal');
        const courseForm = document.getElementById('courseForm');
        const addButton = document.getElementById('btn-add-course');
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const statusFilter = document.getElementById('status-filter');
        const deleteConfirmButton = document.getElementById('btn-confirm-delete');


        courseModal = new bootstrap.Modal(courseModalElement);
        deleteModal = new bootstrap.Modal(deleteModalElement);

        loadCourses();

        if (addButton) {
            addButton.addEventListener('click', openCreateModal);
        }

        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                updateFilters();
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (event) => {
                updateFilters();
            });
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', (event) => {
                updateFilters();
            });
        }

        if (courseForm) {
            courseForm.addEventListener('submit', handleCourseSubmit);
        }

        if (deleteConfirmButton) {
            deleteConfirmButton.addEventListener('click', handleDeleteConfirmed);
        }

        if (courseModalElement) {
            courseModalElement.addEventListener('hidden.bs.modal', resetCourseForm);
        }

        if (deleteModalElement) {
            deleteModalElement.addEventListener('hidden.bs.modal', () => {
                courseToDeleteId = null;
            });
        }

        tbody.addEventListener('click', (event) => {
            const editButton = event.target.closest('.btn-edit');
            if (editButton) {
                const courseId = Number(editButton.getAttribute("editId"));
                openEditModal(courseId);
                return;
            }

            const deleteButton = event.target.closest('.btn-delete');
            if (deleteButton) {
                const courseId = Number(deleteButton.getAttribute("deleteId"));
                openDeleteModal(courseId);
            }
        });



        renderCourses();
    }

    function loadCourses() {
        if (typeof getCourses === 'function') {
            courses = getCourses();
        } else {
            const storedCourses = localStorage.getItem(STORAGE_KEY);
            courses = storedCourses ? JSON.parse(storedCourses) : [];
        }


    }

    function saveCourses(courseList) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courseList));
    }

    function updateFilters() {
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const statusFilter = document.getElementById('status-filter');

        const filters = {
            search: searchInput ? searchInput.value.trim().toLowerCase() : '',
            category: categoryFilter ? categoryFilter.value : 'All',
            status: statusFilter ? statusFilter.value : 'All'
        };

        currentPage = 1;
        renderCourses(filters);
    }

    function getFilteredCourses(filters = null) {
        const search = (filters && filters.search !== undefined ? filters.search : document.getElementById('search-input')?.value || '').trim().toLowerCase();
        const category = filters && filters.category !== undefined ? filters.category : document.getElementById('category-filter')?.value || 'All';
        const status = filters && filters.status !== undefined ? filters.status : document.getElementById('status-filter')?.value || 'All';

        return courses.filter((course) => {
            const matchesSearch = !search || course.title.toLowerCase().includes(search);
            const matchesCategory = category === 'All' || course.category === category;
            const matchesStatus = status === 'All' || course.status === status;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }

    function renderCourses(filters = null) {
        const tbody = document.getElementById('courses-tbody');
        const showingLabel = document.getElementById('showing-records-label');

        filteredCourses = getFilteredCourses(filters);
        const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));

        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const visibleCourses = filteredCourses.slice(start, start + ITEMS_PER_PAGE);

        if (!tbody) return;

        if (!visibleCourses.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="10" class="text-center py-5 text-muted">
                        <i class="bi bi-search fs-3 d-block mb-2"></i>
                        <div class="fw-semibold">No results found</div>
                        <div class="small">Try changing the search or filters.</div>
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = visibleCourses.map((course, index) => {
                const rowNumber = start + index + 1;
                const priceDisplay = course.price === 0
                    ? '<span class="fw-semibold text-success">FREE</span>'
                    : `<span class="fw-semibold text-dark">$${course.price}</span>`;
                const statusClass = course.status === 'Draft'
                    ? 'status-badge status-badge-draft'
                    : 'status-badge status-badge-published';

                return `
                    <tr data-course-id="${course.id}">
                        <td>
                            <input type="checkbox" class="form-check-input row-checkbox" data-id="${course.id}">
                        </td>
                        <td class="text-muted fw-semibold">${rowNumber}</td>
                        <td>
                            <div class="fw-bold text-dark">${course.title}</div>
                        </td>
                        <td><span class="badge bg-secondary-subtle text-secondary px-2.5 py-1.5 fw-semibold" style="font-size: 0.8rem;">${course.category}</span></td>
                        <td>${priceDisplay}</td>
                        <td>${course.lessonsCount || course.lessonCount || 0}</td>
                        <td>${course.instructor}</td>
                        <td><span class="${statusClass}">${course.status || 'Published'}</span></td>
                        <td class="text-end text-nowrap">
                            <button class="btn-action-edit btn-edit" editId="${course.id}" aria-label="Edit Course"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn-action-delete btn-delete" deleteId="${course.id}" aria-label="Delete Course"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        if (showingLabel) {
            const from = filteredCourses.length === 0 ? 0 : start + 1;
            const to = filteredCourses.length === 0 ? 0 : Math.min(start + visibleCourses.length, filteredCourses.length);
            showingLabel.textContent = `Showing ${from} to ${to} of ${filteredCourses.length} courses`;
        }

        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        const paginationList = document.querySelector('.pagination');
        if (!paginationList) return;

        let pages = '';

        for (let i = 1; i <= totalPages; i++) {
            pages += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">
                        ${i}
                    </a>
                </li>
            `;
        }

        paginationList.innerHTML = `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-action="prev">
                    &laquo; Prev
                </a>
            </li>

            ${pages}

            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-action="next">
                    Next &raquo;
                </a>
            </li>
        `;

        paginationList.addEventListener('click', (event) => {
            event.preventDefault();

            const link = event.target.closest('a');

            if (!link) return;


            const page = link.getAttribute('data-page');
            const action = link.getAttribute('data-action');


          
            if (page !== null) {
                currentPage = Number(page);
            }


          
            if (action === 'prev' && currentPage > 1) {
                currentPage--;
            }


            if (action === 'next' && currentPage < totalPages) {
                currentPage++;
            }


            renderCourses();
        });
    }

    function openCreateModal() {
        editingCourseId = null;
        const modalTitle = document.getElementById('courseModalLabel');
        const hiddenId = document.getElementById('courseId');
        const submitButton = document.getElementById('btn-save-course');
        if (modalTitle) modalTitle.textContent = 'Add New Course';
        if (submitButton) submitButton.textContent = 'Save Course';
        if (hiddenId) hiddenId.value = '';
        resetCourseForm();
        courseModal.show();
    }

    function openEditModal(courseId) {
        const course = courses.find((item) => item.id === courseId);
        if (!course) return;

        editingCourseId = courseId;
        const modalTitle = document.getElementById('courseModalLabel');
        const hiddenId = document.getElementById('courseId');
        const submitButton = document.getElementById('btn-save-course');
        if (modalTitle) modalTitle.textContent = 'Edit Course';
        if (submitButton) submitButton.textContent = 'Update Course';
        if (hiddenId) hiddenId.value = course.id;

        document.getElementById('courseTitle').value = course.title || '';
        document.getElementById('courseCategory').value = course.category || '';
        document.getElementById('courseInstructor').value = course.instructor || '';
        document.getElementById('courseLessons').value = course.lessonsCount || course.lessonCount || '';
        document.getElementById('coursePrice').value = course.price ?? 0;
        document.getElementById('courseStatus').value = course.status || 'Published';

        courseModal.show();
    }

    function resetCourseForm() {
        const form = document.getElementById('courseForm');
        if (form) {
            form.reset();
            form.classList.remove('was-validated');
        }
        const hiddenId = document.getElementById('courseId');
        if (hiddenId) hiddenId.value = '';
        editingCourseId = null;
        const modalTitle = document.getElementById('courseModalLabel');
        if (modalTitle) modalTitle.textContent = 'Add New Course';
        const submitButton = document.getElementById('btn-save-course');
        if (submitButton) submitButton.textContent = 'Save Course';
    }

    function handleCourseSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const title = document.getElementById('courseTitle').value.trim();
        const category = document.getElementById('courseCategory').value;
        const instructor = document.getElementById('courseInstructor').value.trim();
        const lessonsCount = Number(document.getElementById('courseLessons').value);
        const price = Number(document.getElementById('coursePrice').value);
        const status = document.getElementById('courseStatus').value;

        const existingCourse = courses.find((course) => course.id === editingCourseId);

        if (existingCourse) {
            existingCourse.title = title;
            existingCourse.category = category;
            existingCourse.instructor = instructor;
            existingCourse.lessonsCount = lessonsCount;
            existingCourse.price = price;
            existingCourse.status = status;
            saveCourses(courses);
            renderCourses();
            courseModal.hide();
            showToast('Course updated.');
        } else {
            const newCourse = {
                id: getNextCourseId(),
                title,
                category,
                instructor,
                lessonsCount,
                price,
                rating: 0,
                status,
                reviewsCount: 0,
                duration: '6 hours',
                image: getDefaultImage(category),
                description: `${title} is now available in the admin catalog.`
            };

            courses.push(newCourse);
            saveCourses(courses);
            renderCourses();
            courseModal.hide();
            showToast('Course created.');
        }
    }

    function getNextCourseId() {
        const ids = courses.map((course) => course.id);
        return ids.length ? Math.max(...ids) + 1 : 1;
    }

    function getDefaultImage(category) {
        const imageMap = {
            'Web Dev': 'images/javascript.svg',
            'Design': 'images/uiux.svg',
            'Data Science': 'images/python.svg',
            'Marketing': 'images/marketing.svg'
        };
        return imageMap[category] || 'images/html.svg';
    }

    function openDeleteModal(courseId) {
        const course = courses.find((item) => item.id === courseId);
        if (!course) return;

        courseToDeleteId = courseId;
        const deleteTargetName = document.getElementById('delete-target-name');
        if (deleteTargetName) {
            deleteTargetName.textContent = course.title;
        }
        deleteModal.show();
    }

    function handleDeleteConfirmed() {
        if (!courseToDeleteId) return;

        if (editingCourseId === courseToDeleteId) {
            courseModal.hide();
        }

        courses = courses.filter((course) => course.id !== courseToDeleteId);
        saveCourses(courses);
        renderCourses();
        deleteModal.hide();
        showToast('Course deleted.');
    }

    function showToast(message) {
        const toastElement = document.getElementById('appToast');
        const toastMessage = document.getElementById('toast-message');
        if (!toastElement || !toastMessage) return;

        toastMessage.textContent = message;
        const toast = new bootstrap.Toast(toastElement, { delay: 2200 });
        toast.show();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdmin);
    } else {
        initAdmin();
    }
})();

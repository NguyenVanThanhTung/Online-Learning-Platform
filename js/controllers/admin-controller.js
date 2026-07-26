window.LearnHubApp = window.LearnHubApp || {};

window.LearnHubApp.startAdminPage = function startAdminPage() {
  const searchInput = document.querySelector('[data-admin-search]');
  const categorySelect = document.querySelector('[data-admin-category]');
  const statusSelect = document.querySelector('[data-admin-status]');
  const adminTable = document.querySelector('[data-admin-table]');
  const paginationContainer = document.getElementById('admin-pagination');
  const courseForm = document.getElementById('course-form');
  const modalTitle = document.getElementById('course-modal-title');
  const courseIdInput = document.getElementById('course-id');
  const titleInput = document.getElementById('course-title-input');
  const categoryInput = document.getElementById('course-category-input');
  const instructorInput = document.getElementById('course-instructor-input');
  const lessonsInput = document.getElementById('course-lessons-input');
  const priceInput = document.getElementById('course-price-input');
  const ratingInput = document.getElementById('course-rating-input');
  const statusInput = document.getElementById('course-status-input');

  let currentPage = 1;
  const itemsPerPage = 5;

  function renderAdminTable() {
    let courses = window.LearnHubApp.storage.getCourses();

    // Lọc theo từ khóa
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (query) {
      courses = courses.filter(c => c.title.toLowerCase().includes(query) || c.instructor.toLowerCase().includes(query));
    }

    // Lọc theo danh mục
    const catVal = categorySelect ? categorySelect.value : 'all';
    if (catVal !== 'all') {
      courses = courses.filter(c => c.category === catVal);
    }

    // Lọc theo trạng thái
    const statusVal = statusSelect ? statusSelect.value : 'all';
    if (statusVal !== 'all') {
      courses = courses.filter(c => c.status === statusVal);
    }

    // Phân trang
    const totalPages = Math.ceil(courses.length / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);

    // Render bảng
    if (adminTable) {
      if (courses.length === 0) {
        adminTable.innerHTML = `<div class="p-3 text-center text-muted">No courses found in admin management.</div>`;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
      }

      adminTable.innerHTML = `
        <table class="table table-striped align-middle mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Status</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedCourses.map(c => `
              <tr>
                <td>#${c.id}</td>
                <td class="fw-bold">${c.title}</td>
                <td><span class="badge bg-secondary">${c.category}</span></td>
                <td>${c.instructor}</td>
                <td>${c.price === 0 ? 'Free' : '$' + c.price}</td>
                <td><span class="badge ${c.status === 'published' ? 'bg-success' : 'bg-warning'}">${c.status}</span></td>
                <td class="text-end">
                  <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${c.id}" data-bs-toggle="modal" data-bs-target="#course-modal">Edit</button>
                  <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${c.id}">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      // Gắn sự kiện cho nút Edit và Delete
      adminTable.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = parseInt(this.dataset.id);
          const courseToEdit = courses.find(c => c.id === id);
          if (courseToEdit) {
            modalTitle.textContent = 'Edit Course';
            courseIdInput.value = courseToEdit.id;
            titleInput.value = courseToEdit.title;
            categoryInput.value = courseToEdit.category;
            instructorInput.value = courseToEdit.instructor;
            lessonsInput.value = courseToEdit.lessonsCount;
            priceInput.value = courseToEdit.price;
            ratingInput.value = courseToEdit.rating;
            statusInput.value = courseToEdit.status;
          }
        });
      });

      adminTable.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = parseInt(this.dataset.id);
          if (confirm('Are you sure you want to delete this course?')) {
            let allCourses = window.LearnHubApp.storage.getCourses();
            allCourses = allCourses.filter(c => c.id !== id);
            window.LearnHubApp.storage.saveCourses(allCourses);
            renderAdminTable();
          }
        });
      });
    }

    // Render phân trang
    if (paginationContainer) {
      let pagesHtml = '';
      for (let i = 1; i <= totalPages; i++) {
        pagesHtml += `
          <li class="page-item ${i === currentPage ? 'active' : ''}">
            <button class="page-link page-num-btn" data-page="${i}">${i}</button>
          </li>
        `;
      }
      paginationContainer.innerHTML = pagesHtml;

      paginationContainer.querySelectorAll('.page-num-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          currentPage = parseInt(this.dataset.page);
          renderAdminTable();
        });
      });
    }
  }

  // Reset form khi bấm nút Add New Course
  const addButton = document.getElementById('add-course-button');
  if (addButton) {
    addButton.addEventListener('click', function() {
      modalTitle.textContent = 'Add New Course';
      courseForm.reset();
      courseIdInput.value = '';
    });
  }

  // Xử lý submit form (Thêm mới hoặc Cập nhật)
  if (courseForm) {
    courseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const allCourses = window.LearnHubApp.storage.getCourses();
      const editId = courseIdInput.value;

      const courseData = {
        id: editId ? parseInt(editId) : Date.now(),
        title: titleInput.value,
        category: categoryInput.value,
        instructor: instructorInput.value,
        lessonsCount: parseInt(lessonsInput.value),
        price: parseFloat(priceInput.value),
        rating: parseFloat(ratingInput.value),
        status: statusInput.value,
        description: "Newly managed course entry.",
        curriculum: []
      };

      if (editId) {
        const index = allCourses.findIndex(c => c.id === parseInt(editId));
        if (index !== -1) {
          allCourses[index] = { ...allCourses[index], ...courseData };
        }
      } else {
        allCourses.unshift(courseData);
      }

      window.LearnHubApp.storage.saveCourses(allCourses);
      
      // Đóng modal Bootstrap
      const modalEl = document.getElementById('course-modal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.hide();

      renderAdminTable();
    });
  }

  // Lắng nghe sự kiện tìm kiếm và lọc
  if (searchInput) searchInput.addEventListener('input', () => { currentPage = 1; renderAdminTable(); });
  if (categorySelect) categorySelect.addEventListener('change', () => { currentPage = 1; renderAdminTable(); });
  if (statusSelect) statusSelect.addEventListener('change', () => { currentPage = 1; renderAdminTable(); });

  // Khởi chạy render lần đầu
  renderAdminTable();
};
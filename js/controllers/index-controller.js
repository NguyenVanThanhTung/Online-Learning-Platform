window.LearnHubApp = window.LearnHubApp || {};

window.LearnHubApp.startIndexPage = function startIndexPage() {
  const searchInput = document.querySelector('[data-search-input]');
  const clearButton = document.getElementById('clear-search');
  const categoryTabs = document.querySelectorAll('[data-category]');
  const sortSelect = document.querySelector('[data-sort-select]');
  const courseGrid = document.querySelector('[data-course-grid]');
  const emptyState = document.querySelector('[data-empty-state]');

  if (!searchInput || !clearButton || !categoryTabs.length || !sortSelect || !courseGrid || !emptyState) {
    return;
  }

  // Hàm render danh sách khóa học ra HTML
  function renderCourses() {
    const query = searchInput.value.trim().toLowerCase();
    
    // Lấy danh mục đang active
    const activeTab = Array.from(categoryTabs).find(tab => tab.classList.contains('active'));
    const category = activeTab ? activeTab.dataset.category : 'all';
    
    // Lấy kiểu sắp xếp
    const sortMode = sortSelect.value;

    // Lấy toàn bộ khóa học từ storage contract
    let courses = window.LearnHubApp.storage.getCourses();

    // 1. Lọc theo danh mục
    if (category !== 'all') {
      courses = courses.filter(course => course.category === category);
    }

    // 2. Lọc theo từ khóa tìm kiếm (tiêu đề hoặc mô tả)
    if (query) {
      courses = courses.filter(course => 
        course.title.toLowerCase().includes(query) || 
        (course.description && course.description.toLowerCase().includes(query))
      );
    }

    // 3. Sắp xếp khóa học
    if (sortMode === 'price-asc') {
      courses.sort((a, b) => a.price - b.price);
    } else if (sortMode === 'price-desc') {
      courses.sort((a, b) => b.price - a.price);
    } else if (sortMode === 'rating-desc') {
      courses.sort((a, b) => b.rating - a.rating);
    }

    // 4. Hiển thị lên giao diện
    if (courses.length === 0) {
      emptyState.classList.remove('d-none');
      courseGrid.innerHTML = '';
      return;
    }

    emptyState.classList.add('d-none');
    
    // Tạo HTML cho từng thẻ khóa học
    courseGrid.innerHTML = courses.map(course => `
      <div class="col-md-4">
        <div class="page-card card-hover h-100 d-flex flex-column p-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="status-pill">${course.category}</span>
            <span class="fw-bold text-primary">${course.price === 0 ? 'FREE' : '$' + course.price}</span>
          </div>
          <h3 class="h5 mb-2">${course.title}</h3>
          <p class="text-muted small mb-3 flex-grow-1">${course.description || ''}</p>
          <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
            <small class="text-muted">⭐ ${course.rating} (${course.lessonsCount} lessons)</small>
            <a href="course-detail.html?id=${course.id}" class="btn btn-sm btn-outline-primary">View Details</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Lắng nghe sự kiện tìm kiếm
  searchInput.addEventListener('input', renderCourses);

  // Nút clear tìm kiếm
  clearButton.addEventListener('click', function handleClearSearch() {
    searchInput.value = '';
    renderCourses();
  });

  // Xử lý chuyển tab danh mục
  categoryTabs.forEach(function bindCategoryTab(button) {
    button.addEventListener('click', function handleCategoryClick() {
      categoryTabs.forEach(function updateTab(tab) {
        tab.classList.remove('active', 'btn-primary');
        tab.classList.add('btn-outline-primary');
      });
      button.classList.add('active', 'btn-primary');
      button.classList.remove('btn-outline-primary');
      renderCourses();
    });
  });

  // Xử lý thay đổi sắp xếp
  sortSelect.addEventListener('change', renderCourses);

  // Gọi render lần đầu khi tải trang
  renderCourses();
};
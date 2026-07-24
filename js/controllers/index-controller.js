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

  searchInput.addEventListener('input', function handleSearchInput() {
    const query = searchInput.value.trim().toLowerCase();
    const activeState = Array.from(categoryTabs).find(function findActiveButton(button) {
      return button.classList.contains('active');
    });
    const category = activeState ? activeState.dataset.category : 'all';

    if (!query && category === 'all') {
      emptyState.classList.add('d-none');
      courseGrid.innerHTML = '';
      return;
    }

    emptyState.classList.remove('d-none');
    courseGrid.innerHTML = '<div class="col-12"><div class="empty-state">No courses found.</div></div>';
  });

  clearButton.addEventListener('click', function handleClearSearch() {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  });

  categoryTabs.forEach(function bindCategoryTab(button) {
    button.addEventListener('click', function handleCategoryClick() {
      categoryTabs.forEach(function updateTab(tab) {
        tab.classList.remove('active');
        tab.classList.remove('btn-primary');
        tab.classList.add('btn-outline-primary');
      });
      button.classList.add('active');
      button.classList.add('btn-primary');
      button.classList.remove('btn-outline-primary');
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  sortSelect.addEventListener('change', function handleSortChange() {
    courseGrid.dataset.sortMode = sortSelect.value;
  });
};

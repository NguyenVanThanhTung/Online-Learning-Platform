window.LearnHubApp = window.LearnHubApp || {};

window.LearnHubApp.startAdminPage = function startAdminPage() {
  const addButton = document.getElementById('add-course-button');
  const searchInput = document.querySelector('[data-admin-search]');
  const categorySelect = document.querySelector('[data-admin-category]');
  const statusSelect = document.querySelector('[data-admin-status]');

  if (addButton) {
    addButton.addEventListener('click', function handleAddCourse() {
      addButton.textContent = 'Add New Course';
    });
  }

  [searchInput, categorySelect, statusSelect].forEach(function bindFilter(control) {
    if (control) {
      control.addEventListener('input', function handleFilterInput() {
        control.dataset.filtered = 'true';
      });
    }
  });
};

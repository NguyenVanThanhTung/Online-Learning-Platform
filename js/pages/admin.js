window.LearnHubApp = window.LearnHubApp || {};
window.LearnHubApp.registerPage('admin', function initAdminPage() {
  if (typeof window.LearnHubApp.startAdminPage === 'function') {
    window.LearnHubApp.startAdminPage();
  }
});

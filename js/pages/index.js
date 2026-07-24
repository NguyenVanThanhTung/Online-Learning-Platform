window.LearnHubApp = window.LearnHubApp || {};
window.LearnHubApp.registerPage('index', function initIndexPage() {
  if (typeof window.LearnHubApp.startIndexPage === 'function') {
    window.LearnHubApp.startIndexPage();
  }
});

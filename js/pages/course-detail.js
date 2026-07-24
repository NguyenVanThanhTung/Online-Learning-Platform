window.LearnHubApp = window.LearnHubApp || {};
window.LearnHubApp.registerPage('course-detail', function initCourseDetailPage() {
  if (typeof window.LearnHubApp.startCourseDetailPage === 'function') {
    window.LearnHubApp.startCourseDetailPage();
  }
});

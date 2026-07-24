window.LearnHubApp = window.LearnHubApp || {};

window.LearnHubApp.startCourseDetailPage = function startCourseDetailPage() {
  const enrollButton = document.getElementById('enroll-button');
  const progressFill = document.querySelector('[data-progress-fill]');

  if (enrollButton) {
    enrollButton.addEventListener('click', function handleEnrollment() {
      enrollButton.textContent = 'Enrolled';
      enrollButton.disabled = true;
    });
  }

  if (progressFill) {
    progressFill.setAttribute('aria-valuenow', '0');
    progressFill.style.width = '0%';
  }
};

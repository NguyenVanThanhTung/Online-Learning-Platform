window.LearnHubApp = window.LearnHubApp || {};

window.LearnHubApp.startCourseDetailPage = function startCourseDetailPage() {
  const enrollButton = document.getElementById('enroll-button');
  const progressFill = document.querySelector('[data-progress-fill]');
  const progressText = document.getElementById('lesson-progress');
  const courseTitleEl = document.getElementById('detail-course-title');
  const courseMetaEl = document.getElementById('detail-course-meta');
  const accordionContainer = document.querySelector('[data-curriculum-accordion]');

  // Lấy ID khóa học từ URL (ví dụ: course-detail.html?id=1)
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = parseInt(urlParams.get('id')) || 1;

  // Lấy dữ liệu khóa học từ storage
  const courses = window.LearnHubApp.storage.getCourses();
  const course = courses.find(c => c.id === courseId) || courses[0];

  if (!course) return;

  // 1. Hiển thị thông tin tiêu đề và mô tả khóa học
  if (courseTitleEl) courseTitleEl.textContent = course.title;
  if (courseMetaEl) {
    courseMetaEl.textContent = `${course.description || ''} • Instructor: ${course.instructor} • Rating: ⭐ ${course.rating}`;
  }

  // 2. Render danh sách bài học dạng Accordion tích hợp tính năng hoàn thành bài học
  if (accordionContainer && course.curriculum) {
    let completedLessons = window.LearnHubApp.storage.getCompletedLessons();

    function updateProgressUI() {
      // Đếm tổng số bài học trong khóa
      let totalLessons = 0;
      course.curriculum.forEach(sec => {
        if (sec.lessons) totalLessons += sec.lessons.length;
      });

      // Đếm số bài đã hoàn thành
      const completedCount = completedLessons.filter(id => {
        return course.curriculum.some(sec => sec.lessons && sec.lessons.some(l => l.id === id));
      }).length;

      const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      if (progressText) {
        progressText.textContent = `${completedCount} / ${totalLessons} lessons completed`;
      }
      if (progressFill) {
        progressFill.style.width = `${percent}%`;
        progressFill.setAttribute('aria-valuenow', percent);
      }
    }

    // Tạo HTML cho Accordion
    accordionContainer.innerHTML = course.curriculum.map((section, index) => {
      const sectionId = `section-${index}`;
      const isExpanded = index === 0 ? 'show' : '';
      const buttonCollapsed = index === 0 ? '' : 'collapsed';

      const lessonsHtml = section.lessons ? section.lessons.map(lesson => {
        const isChecked = completedLessons.includes(lesson.id) ? 'checked' : '';
        return `
          <div class="list-group-item d-flex justify-content-between align-items-center py-2">
            <div class="form-check">
              <input class="form-check-input lesson-checkbox" type="checkbox" value="${lesson.id}" id="lesson-${lesson.id}" ${isChecked}>
              <label class="form-check-label" for="lesson-${lesson.id}">${lesson.title}</label>
            </div>
            <span class="badge bg-light text-dark">Lesson</span>
          </div>
        `;
      }).join('') : '';

      // Phần Quiz nếu có
      let quizHtml = '';
      if (section.quiz) {
        quizHtml = `
          <div class="p-3 bg-light border-top">
            <h6 class="fw-bold">${section.quiz.title}</h6>
            <div class="small text-muted mb-2">Complete the lessons above to test your knowledge.</div>
            <button class="btn btn-sm btn-outline-primary take-quiz-btn" data-section-index="${index}">Take Quiz</button>
          </div>
        `;
      }

      return `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading-${sectionId}">
            <button class="accordion-button ${buttonCollapsed}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${sectionId}" aria-expanded="${index === 0}" aria-controls="collapse-${sectionId}">
              ${section.sectionTitle}
            </button>
          </h2>
          <div id="collapse-${sectionId}" class="accordion-collapse collapse ${isExpanded}" aria-labelledby="heading-${sectionId}" data-bs-parent="#curriculum-accordion">
            <div class="accordion-body p-0">
              <div class="list-group list-group-flush">
                ${lessonsHtml}
              </div>
              ${quizHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    updateProgressUI();

    // Lắng nghe sự kiện click check hoàn thành bài học
    accordionContainer.querySelectorAll('.lesson-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const lessonId = parseInt(this.value);
        if (this.checked) {
          if (!completedLessons.includes(lessonId)) completedLessons.push(lessonId);
        } else {
          completedLessons = completedLessons.filter(id => id !== lessonId);
        }
        window.LearnHubApp.storage.saveCompletedLessons(completedLessons);
        updateProgressUI();
      });
    });

    // Xử lý nút bấm Take Quiz
    accordionContainer.querySelectorAll('.take-quiz-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const sIndex = this.dataset.sectionIndex;
        const quiz = course.curriculum[sIndex].quiz;
        alert(`Starting quiz: ${quiz.title}\nQuestions count: ${quiz.questions.length}`);
      });
    });
  }

  // 3. Xử lý nút Enroll
  if (enrollButton) {
    enrollButton.addEventListener('click', function handleEnrollment() {
      enrollButton.textContent = 'Enrolled Successfully';
      enrollButton.classList.remove('btn-primary');
      enrollButton.classList.add('btn-success');
      enrollButton.disabled = true;
    });
  }
};
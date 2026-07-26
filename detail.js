/**
 * Lesson progress tracking & dynamic quiz handler for multiple sections
 */

const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id') || '1';

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initProgress();
        initQuiz();
    }, 100);
});

// Retrieve completed lessons array from localStorage
function getCompletedLessons() {
    return JSON.parse(localStorage.getItem(`completedLessons_${courseId}`)) || [];
}

// Save completed lessons array to localStorage
function saveCompletedLessons(lessons) {
    localStorage.setItem(`completedLessons_${courseId}`, JSON.stringify(lessons));
}

// Update global progress bar and check section completion badges
function updateProgressBar() {
    const lessonCheckboxes = document.querySelectorAll(".lesson-checkbox");
    const totalLessons = lessonCheckboxes.length > 0 ? lessonCheckboxes.length : 1;
    const completed = getCompletedLessons().length;
    const percentage = Math.round((completed / totalLessons) * 100);

    const progressBar = document.getElementById("progress-bar-fill");
    const progressText = document.getElementById("progress-text");

    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${completed} / ${totalLessons} lessons completed (${percentage}%)`;

    const sections = new Set(Array.from(lessonCheckboxes).map(cb => cb.getAttribute("data-section")));
    sections.forEach(sectionId => checkSectionCompletion(sectionId));
}

// Check if all lessons in a section are checked, display badge if true
function checkSectionCompletion(sectionId) {
    const checkboxes = document.querySelectorAll(`.lesson-checkbox[data-section="${sectionId}"]`);
    const badge = document.getElementById(`badge-section-${sectionId}`);

    if (checkboxes.length === 0 || !badge) return;

    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    badge.style.display = allChecked ? "inline-block" : "none";
}

// Initialize lesson checkboxes event listeners and state
function initProgress() {
    const lessonCheckboxes = document.querySelectorAll(".lesson-checkbox");
    const completed = getCompletedLessons();

    lessonCheckboxes.forEach(cb => {
        const lessonId = cb.getAttribute("data-lesson-id");
        if (completed.includes(lessonId)) cb.checked = true;

        cb.addEventListener("change", function(e) {
            let currentCompleted = getCompletedLessons();
            const id = e.target.getAttribute("data-lesson-id");

            if (e.target.checked) {
                if (!currentCompleted.includes(id)) currentCompleted.push(id);
            } else {
                currentCompleted = currentCompleted.filter(item => item !== id);
            }

            saveCompletedLessons(currentCompleted);
            updateProgressBar();
        });
    });

    updateProgressBar();
}

// Initialize quiz toggle and submit form event listeners
function initQuiz() {
    const quizTriggers = document.querySelectorAll(".btn-quiz-trigger");

    quizTriggers.forEach(btn => {
        btn.addEventListener("click", function() {
            const sectionId = this.getAttribute("data-section");
            const panel = document.getElementById(`quiz-panel-${sectionId}`);
            if (panel) {
                panel.style.display = (panel.style.display === "none" || panel.style.display === "") ? "block" : "none";
            }
        });
    });

    document.addEventListener("submit", function(e) {
        if (e.target && e.target.classList.contains("quiz-form")) {
            e.preventDefault();
            const sectionId = e.target.getAttribute("data-section");
            submitQuiz(sectionId, e.target);
        }
    });
}

// Calculate score, apply style classes (.answer-correct, .answer-incorrect) and handle pass/fail rules (>= 70%)
function submitQuiz(sectionId, form) {
    const feedbackBox = document.getElementById(`quiz-feedback-${sectionId}`);
    const questionBlocks = form.querySelectorAll(".quiz-question-block");
    let score = 0;
    const totalQuestions = questionBlocks.length;

    questionBlocks.forEach(block => {
        const correctVal = block.getAttribute("data-correct");
        const selectedInput = block.querySelector("input[type='radio']:checked");
        const optionItems = block.querySelectorAll(".quiz-option-item");

        // Reset previous feedback classes
        optionItems.forEach(item => {
            item.classList.remove("answer-correct", "answer-incorrect");
            const radioInput = item.querySelector("input[type='radio']");
            if (radioInput && radioInput.value === correctVal) {
                item.classList.add("answer-correct");
            }
        });

        if (selectedInput) {
            const parentItem = selectedInput.closest(".quiz-option-item");
            if (selectedInput.value === correctVal) {
                score++;
            } else {
                if (parentItem) parentItem.classList.add("answer-incorrect");
            }
        }
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    const submitBtn = document.getElementById(`btn-quiz-submit-${sectionId}`);
    const retakeBtn = document.getElementById(`btn-quiz-retake-${sectionId}`);
    const nextBtn = document.getElementById(`btn-quiz-next-${sectionId}`);

    if (feedbackBox) {
        feedbackBox.style.display = "block";

        // Logic dùng chung cho nút Retake khi làm lại bài
        const handleRetake = function() {
            form.reset();
            feedbackBox.style.display = "none";
            retakeBtn.style.display = "none";
            if (nextBtn) nextBtn.style.display = "none";
            if (submitBtn) submitBtn.style.display = "inline-block";
            questionBlocks.forEach(block => {
                block.querySelectorAll(".quiz-option-item").forEach(item => {
                    item.classList.remove("answer-correct", "answer-incorrect");
                });
            });
        };

        if (percentage >= 70) {
            feedbackBox.className = "quiz-feedback-box p-3 mt-3 alert alert-success pass";
            feedbackBox.innerHTML = `<h6 class="fw-bold mb-1"><i class="bi bi-check-circle-fill me-1"></i> Score: ${score} / ${totalQuestions} correct — You passed! (${percentage}% ≥ 70%)</h6>`;
            if (submitBtn) submitBtn.style.display = "none";
            
            // Giữ lại nút Retake quiz ngay cả khi đã vượt qua bài quiz
            if (retakeBtn) {
                retakeBtn.style.display = "inline-block";
                retakeBtn.onclick = handleRetake;
            }
            
            const nextSectionId = parseInt(sectionId) + 1;
            const nextCollapse = document.getElementById(`collapse-${nextSectionId}`);

            if (nextBtn) {
                if (nextCollapse) {
                    nextBtn.style.display = "inline-block";
                    nextBtn.className = "btn btn-success btn-sm";
                    nextBtn.innerHTML = `Continue to next section <i class="bi bi-arrow-right"></i>`;
                    nextBtn.onclick = function() {
                        new bootstrap.Collapse(nextCollapse, { toggle: true });
                        nextCollapse.scrollIntoView({ behavior: 'smooth' });
                    };
                } else {
                    nextBtn.style.display = "inline-block";
                    nextBtn.className = "btn btn-dark btn-sm";
                    nextBtn.innerHTML = `<i class="bi bi-trophy-fill me-1"></i> Course Completed!`;
                    nextBtn.onclick = null;
                }
            }
        } else {
            feedbackBox.className = "quiz-feedback-box p-3 mt-3 alert alert-danger fail";
            feedbackBox.innerHTML = `<h6 class="fw-bold mb-1"><i class="bi bi-x-circle-fill me-1"></i> Score: ${score} / ${totalQuestions} correct — Failed (${percentage}% < 70%)</h6><p class="mb-0 small">Please review the material and try again.</p>`;
            if (submitBtn) submitBtn.style.display = "none";
            if (nextBtn) nextBtn.style.display = "none";
            if (retakeBtn) {
                retakeBtn.style.display = "inline-block";
                retakeBtn.onclick = handleRetake;
            }
        }
    }
}
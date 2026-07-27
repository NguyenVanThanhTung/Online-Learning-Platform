const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id') || '1';

document.addEventListener("DOMContentLoaded", () => {
    initDetailPage();
    initProgress();
    initQuiz();
});

// Helper fuction: Escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Get completed lessons array from localStorage
function getCompletedLessons() {
    return JSON.parse(localStorage.getItem(`completedLessons_${courseId}`)) || [];
}

// Save completed lessons array to localStorage
function saveCompletedLessons(lessons) {
    localStorage.setItem(`completedLessons_${courseId}`, JSON.stringify(lessons));
}

// Get sections that passed the quiz from localStorage
function getPassedQuizzes() {
    return JSON.parse(localStorage.getItem(`passedQuizzes_${courseId}`)) || [];
}

// Save passed quiz section to localStorage
function savePassedQuiz(sectionId) {
    const passed = getPassedQuizzes();
    const secStr = String(sectionId);
    if (!passed.includes(secStr)) {
        passed.push(secStr);
        localStorage.setItem(`passedQuizzes_${courseId}`, JSON.stringify(passed));
    }
}

// Remove section from passed list when retaking
function removePassedQuiz(sectionId) {
    let passed = getPassedQuizzes();
    passed = passed.filter(id => id !== String(sectionId));
    localStorage.setItem(`passedQuizzes_${courseId}`, JSON.stringify(passed));
}

// Get saved quiz options selected by user
function getSavedAnswers(sectionId) {
    return JSON.parse(localStorage.getItem(`quizAnswers_${courseId}_sec${sectionId}`)) || {};
}

// Save selected quiz options to localStorage
function saveQuizAnswers(sectionId, answers) {
    localStorage.setItem(`quizAnswers_${courseId}_sec${sectionId}`, JSON.stringify(answers));
}

// Remove saved quiz options from localStorage
function removeSavedAnswers(sectionId) {
    localStorage.removeItem(`quizAnswers_${courseId}_sec${sectionId}`);
}

// Render dynamic course content on detail page
function initDetailPage() {
    const videoPlaceholder = document.getElementById('video-thumbnail-placeholder');
    const sidebarThumbnail = document.getElementById('course-sidebar-thumbnail');
    if (!videoPlaceholder && !sidebarThumbnail) return;

    const courses = getCourses();
    const course = courses.find(c => String(c.id) === String(courseId) || String(c.id) === `c${courseId}`);

    if (course) {
        const updateText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        updateText("course-detail-title", course.title);
        updateText("course-title-crumb", course.title);
        updateText("course-category-crumb", course.category);
        updateText("course-instructor-name", course.instructor);
        updateText("video-player-title", course.title);
        updateText("course-sidebar-price", course.price === 0 ? "FREE" : `$${course.price}`);
        
        let totalLessonsCount = 0;
        if (course.sections) {
            course.sections.forEach(sec => totalLessonsCount += sec.lessons.length);
        }
        updateText("sidebar-lessons", totalLessonsCount || course.lessonsCount || 6);

        const ratingEl = document.getElementById("course-rating-avg");
        if (ratingEl) ratingEl.innerHTML = `<i class="bi bi-star-fill"></i> ${course.rating}`;

        if (course.reviewsCount) {
            updateText("course-rating-count", `(${course.reviewsCount} ratings)`);
        }

        const descContainer = document.getElementById("course-description-content");
        if (descContainer && course.description) {
            descContainer.innerHTML = `<p>${course.description}</p>`;
        }

        const learnListContainer = document.getElementById("learning-outcomes");
        if (learnListContainer && course.whatYouWillLearn) {
            learnListContainer.innerHTML = course.whatYouWillLearn.map(item => `
                <div class="learning-bullet-item">
                    <i class="bi bi-check-circle-fill"></i>
                    <span>${escapeHtml(item)}</span>
                </div>
            `).join('');
        }

        const accordionContainer = document.getElementById("courseCurriculum");
        if (accordionContainer && course.sections) {
            accordionContainer.innerHTML = course.sections.map((sec, index) => {
                const isShow = index === 0 ? "show" : "";
                const isCollapsed = index === 0 ? "" : "collapsed";
                const ariaExpanded = index === 0 ? "true" : "false";

                const lessonsHTML = sec.lessons.map(lesson => `
                    <div class="lesson-list-item" data-lesson-id="${lesson.id}">
                        <div class="lesson-left">
                            <input type="checkbox" class="lesson-checkbox me-2" id="chk-${lesson.id}" data-lesson-id="${lesson.id}" data-section="${sec.sectionId}">
                            <label for="chk-${lesson.id}" class="mb-0 cursor-pointer">${escapeHtml(lesson.title)}</label>
                        </div>
                        <span class="lesson-duration">${lesson.duration}</span>
                    </div>
                `).join('');

                const questionsHTML = sec.quiz.questions.map(q => `
                    <div class="quiz-question-block mb-4 pb-3 border-bottom" data-qid="${q.id}" data-correct="${q.correct}">
                        <p class="quiz-question-text fw-bold mb-2">${escapeHtml(q.text)}</p>
                        <div class="quiz-options">
                            ${q.options.map(opt => `
                                <div class="quiz-option-item">
                                    <label class="quiz-option-label" for="sec${sec.sectionId}-${q.id}-${opt.value}">
                                        <input type="radio" name="sec${sec.sectionId}-${q.id}" id="sec${sec.sectionId}-${q.id}-${opt.value}" value="${opt.value}">
                                        <span class="ms-2"><strong class="me-1">${opt.value.toUpperCase()}.</strong> ${escapeHtml(opt.label)}</span>
                                    </label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('');

                return `
                    <div class="accordion-item mb-3 border rounded overflow-hidden shadow-sm" id="accordion-section-${sec.sectionId}">
                        <h2 class="accordion-header" id="heading-${sec.sectionId}">
                            <button class="accordion-button ${isCollapsed} d-flex justify-content-between align-items-center bg-light text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${sec.sectionId}" aria-expanded="${ariaExpanded}">
                                <span class="d-flex align-items-center gap-2">
                                    ${escapeHtml(sec.title)} (${sec.lessons.length} lessons)
                                    <span class="badge-section-completed badge bg-success ms-2" id="badge-section-${sec.sectionId}" style="display: none;"><i class="bi bi-check-circle-fill"></i> Done</span>
                                </span>
                            </button>
                        </h2>
                        <div id="collapse-${sec.sectionId}" class="accordion-collapse collapse ${isShow}" data-bs-parent="#courseCurriculum">
                            <div class="accordion-body p-0">
                                <div class="lesson-list p-3">
                                    ${lessonsHTML}
                                </div>
                                <div class="quiz-section-trigger-wrapper p-3 bg-white text-end border-top">
                                    <button class="btn btn-outline-secondary btn-sm btn-quiz-trigger fw-semibold disabled" data-section="${sec.sectionId}" disabled title="Complete all lessons in this section to unlock the quiz">
                                        <i class="bi bi-patch-question-fill me-1"></i> Take Quiz: ${escapeHtml(sec.title)}
                                    </button>
                                </div>
                                <div class="quiz-panel-inline p-4 bg-white border-top" id="quiz-panel-${sec.sectionId}" style="display: none;">
                                    <div class="quiz-header mb-3">
                                        <h5 class="quiz-title fw-bold">${escapeHtml(sec.quiz.title)}</h5>
                                    </div>
                                    <div class="quiz-body">
                                        <form class="quiz-form" data-section="${sec.sectionId}">
                                            ${questionsHTML}
                                            <div class="quiz-feedback-box mb-3" id="quiz-feedback-${sec.sectionId}" style="display: none;"></div>
                                            <div class="quiz-footer d-flex gap-2">
                                                <button type="submit" class="btn btn-primary btn-sm" id="btn-quiz-submit-${sec.sectionId}">Submit Quiz</button>
                                                <button type="button" class="btn btn-secondary btn-sm" id="btn-quiz-retake-${sec.sectionId}" style="display: none;">Retake Quiz</button>
                                                <button type="button" class="btn btn-success btn-sm" id="btn-quiz-next-${sec.sectionId}" style="display: none;">Continue to next section <i class="bi bi-arrow-right"></i></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        const imagePath = course.image || course.thumbnail || "images/javascript.svg";

        if (videoPlaceholder) {
            videoPlaceholder.src = imagePath;
            videoPlaceholder.onerror = function() {
                this.src = 'images/javascript.svg';
            };
        }

        if (sidebarThumbnail) {
            sidebarThumbnail.src = imagePath;
            sidebarThumbnail.onerror = function() {
                this.src = 'images/javascript.svg';
            };
        }
    }
}

// Update progress bar UI and section completion badges/quiz button lock
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

// Check section completion to display badge and enable/disable quiz button
function checkSectionCompletion(sectionId) {
    const checkboxes = document.querySelectorAll(`.lesson-checkbox[data-section="${sectionId}"]`);
    const badge = document.getElementById(`badge-section-${sectionId}`);
    const quizBtn = document.querySelector(`.btn-quiz-trigger[data-section="${sectionId}"]`);
    const quizPanel = document.getElementById(`quiz-panel-${sectionId}`);

    if (checkboxes.length === 0) return;

    const allChecked = Array.from(checkboxes).every(cb => cb.checked);

    if (badge) badge.style.display = allChecked ? "inline-block" : "none";

    if (quizBtn) {
        if (allChecked) {
            quizBtn.removeAttribute("disabled");
            quizBtn.classList.remove("disabled", "btn-outline-secondary");
            quizBtn.classList.add("btn-outline-primary");
            quizBtn.title = "Click to start quiz";
        } else {
            quizBtn.setAttribute("disabled", "true");
            quizBtn.classList.add("disabled", "btn-outline-secondary");
            quizBtn.classList.remove("btn-outline-primary");
            quizBtn.title = "Complete all lessons in this section to unlock the quiz";
            if (quizPanel) quizPanel.style.display = "none";
        }
    }
}

// Initialize lesson checkboxes and attach change listeners
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

// Initialize quiz triggers, submit listener, and restore saved state
function initQuiz() {
    const quizTriggers = document.querySelectorAll(".btn-quiz-trigger");

    quizTriggers.forEach(btn => {
        btn.addEventListener("click", function() {
            if (this.hasAttribute("disabled")) return;
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

    restorePassedQuizzes();
}

// Restore UI, selected options, and feedback colors for previously passed quizzes
function restorePassedQuizzes() {
    const passedQuizzes = getPassedQuizzes();
    
    passedQuizzes.forEach(sectionId => {
        const feedbackBox = document.getElementById(`quiz-feedback-${sectionId}`);
        const submitBtn = document.getElementById(`btn-quiz-submit-${sectionId}`);
        const retakeBtn = document.getElementById(`btn-quiz-retake-${sectionId}`);
        const nextBtn = document.getElementById(`btn-quiz-next-${sectionId}`);
        const form = document.querySelector(`.quiz-form[data-section="${sectionId}"]`);

        const savedAnswers = getSavedAnswers(sectionId);
        if (form && savedAnswers) {
            const questionBlocks = form.querySelectorAll(".quiz-question-block");
            
            questionBlocks.forEach(block => {
                const qId = block.getAttribute("data-qid");
                const correctVal = block.getAttribute("data-correct");
                const selectedVal = savedAnswers[qId];

                if (selectedVal) {
                    const radioInput = block.querySelector(`input[name="sec${sectionId}-${qId}"][value="${selectedVal}"]`);
                    if (radioInput) {
                        radioInput.checked = true;
                        const parentItem = radioInput.closest(".quiz-option-item");
                        if (parentItem) {
                            if (selectedVal === correctVal) {
                                parentItem.classList.add("answer-correct");
                            } else {
                                parentItem.classList.add("answer-incorrect");
                            }
                        }
                    }
                }
            });
        }

        if (feedbackBox) {
            feedbackBox.style.display = "block";
            feedbackBox.className = "quiz-feedback-box p-3 mt-3 alert alert-success pass";
            feedbackBox.innerHTML = `<h6 class="fw-bold mb-1"><i class="bi bi-check-circle-fill me-1"></i> You have already passed this quiz!</h6>`;
            
            if (submitBtn) submitBtn.style.display = "none";
            
            if (retakeBtn) {
                retakeBtn.style.display = "inline-block";
                retakeBtn.onclick = function() {
                    if (form) form.reset();
                    removePassedQuiz(sectionId);
                    removeSavedAnswers(sectionId);
                    feedbackBox.style.display = "none";
                    retakeBtn.style.display = "none";
                    if (nextBtn) nextBtn.style.display = "none";
                    if (submitBtn) submitBtn.style.display = "inline-block";
                    
                    if (form) {
                        form.querySelectorAll(".quiz-option-item").forEach(item => {
                            item.classList.remove("answer-correct", "answer-incorrect");
                        });
                    }
                };
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
        }
    });
}

// Evaluate quiz answers, highlight user selections, and persist score
function submitQuiz(sectionId, form) {
    const feedbackBox = document.getElementById(`quiz-feedback-${sectionId}`);
    const questionBlocks = form.querySelectorAll(".quiz-question-block");
    let score = 0;
    const totalQuestions = questionBlocks.length;
    const userAnswers = {};

    questionBlocks.forEach(block => {
        const qId = block.getAttribute("data-qid");
        const correctVal = block.getAttribute("data-correct");
        const selectedInput = block.querySelector("input[type='radio']:checked");
        const optionItems = block.querySelectorAll(".quiz-option-item");

        optionItems.forEach(item => {
            item.classList.remove("answer-correct", "answer-incorrect");
        });

        if (selectedInput) {
            userAnswers[qId] = selectedInput.value;
            const parentItem = selectedInput.closest(".quiz-option-item");
            if (selectedInput.value === correctVal) {
                score++;
                if (parentItem) parentItem.classList.add("answer-correct");
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

        const handleRetake = function() {
            form.reset();
            removePassedQuiz(sectionId);
            removeSavedAnswers(sectionId);
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
            savePassedQuiz(sectionId);
            saveQuizAnswers(sectionId, userAnswers);

            feedbackBox.className = "quiz-feedback-box p-3 mt-3 alert alert-success pass";
            feedbackBox.innerHTML = `<h6 class="fw-bold mb-1"><i class="bi bi-check-circle-fill me-1"></i> Score: ${score} / ${totalQuestions} correct — You passed! (${percentage}% ≥ 70%)</h6>`;
            if (submitBtn) submitBtn.style.display = "none";
            
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
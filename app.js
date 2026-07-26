/**
 * Shared state management & course rendering logic with multi-section support
 */

const DEFAULT_COURSES = [
    {
        id: 1,
        title: "HTML5 & CSS3 Fundamentals for Beginners",
        category: "Web Dev",
        instructor: "John Doe",
        price: 0,
        rating: 4.5,
        reviewsCount: 89,
        lessonsCount: 6,
        duration: "8 hours",
        image: "images/html.svg",
        description: "Learn core foundations of web development with semantic HTML5 and modern CSS3.",
        whatYouWillLearn: [
            "HTML5 semantic tags and structure",
            "Form validation and input types",
            "CSS3 styling, flexbox and animations",
            "Building responsive web layouts"
        ],
        sections: [
            {
                sectionId: 1,
                title: "Section 1 — HTML5 Basics",
                lessons: [
                    { id: "1-1", title: "Lesson 1: Introduction to HTML5", duration: "15 mins" },
                    { id: "1-2", title: "Lesson 2: Semantic Elements", duration: "20 mins" },
                    { id: "1-3", title: "Lesson 3: Forms and Inputs", duration: "25 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 1 — HTML5 Basics",
                    questions: [
                        {
                            id: "q1",
                            text: "Q1. What does HTML stand for?",
                            options: [
                                { value: "a", label: "HyperText Markup Language" },
                                { value: "b", label: "HighText Machine Language" },
                                { value: "c", label: "Hyperlink Text Markup Language" }
                            ],
                            correct: "a"
                        },
                        {
                            id: "q2",
                            text: "Q2. Which tag defines a paragraph?",
                            options: [
                                { value: "a", label: "<para>" },
                                { value: "b", label: "<p>" },
                                { value: "c", label: "<text>" }
                            ],
                            correct: "b"
                        },
                        {
                            id: "q3",
                            text: "Q3. Which tag creates a hyperlink?",
                            options: [
                                { value: "a", label: "<a>" },
                                { value: "b", label: "<link>" },
                                { value: "c", label: "<href>" }
                            ],
                            correct: "a"
                        }
                    ]
                }
            },
            {
                sectionId: 2,
                title: "Section 2 — CSS3 Styling",
                lessons: [
                    { id: "2-1", title: "Lesson 1: CSS Selectors", duration: "20 mins" },
                    { id: "2-2", title: "Lesson 2: Flexbox Layout", duration: "25 mins" },
                    { id: "2-3", title: "Lesson 3: Grid System", duration: "30 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 2 — CSS3 Styling",
                    questions: [
                        {
                            id: "q1",
                            text: "Q1. What does CSS stand for?",
                            options: [
                                { value: "a", label: "Colorful Style Sheets" },
                                { value: "b", label: "Cascading Style Sheets" },
                                { value: "c", label: "Computer Style Sheets" }
                            ],
                            correct: "b"
                        },
                        {
                            id: "q2",
                            text: "Q2. Which property defines text color?",
                            options: [
                                { value: "a", label: "font-color" },
                                { value: "b", label: "color" },
                                { value: "c", label: "text-style" }
                            ],
                            correct: "b"
                        },
                        {
                            id: "q3",
                            text: "Q3. How do you select an element with id 'demo'?",
                            options: [
                                { value: "a", label: "#demo" },
                                { value: "b", label: ".demo" },
                                { value: "c", label: "demo" }
                            ],
                            correct: "a"
                        }
                    ]
                }
            }
        ]
    },
    {
        id: 2,
        title: "JavaScript Essentials & ES6+ Concepts",
        category: "Web Dev",
        instructor: "Jane Smith",
        price: 49,
        rating: 4.8,
        reviewsCount: 120,
        lessonsCount: 6,
        duration: "12 hours",
        image: "images/javascript.svg",
        description: "Master modern JavaScript, asynchronous programming, and ES6+ features.",
        whatYouWillLearn: [
            "ES6+ modern JavaScript syntax",
            "DOM manipulation and events",
            "Async / Await and Fetch API",
            "Build real projects from scratch"
        ],
        sections: [
            {
                sectionId: 1,
                title: "Section 1 — JavaScript Basics",
                lessons: [
                    { id: "1-1", title: "Lesson 1: Variables and Data Types", duration: "15 mins" },
                    { id: "1-2", title: "Lesson 2: Operators and Logic", duration: "20 mins" },
                    { id: "1-3", title: "Lesson 3: Functions and Scope", duration: "25 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 1 — JavaScript Basics",
                    questions: [
                        {
                            id: "q1",
                            text: "Q1. What keyword declares a block-scoped variable?",
                            options: [
                                { value: "a", label: "var" },
                                { value: "b", label: "let" },
                                { value: "c", label: "def" }
                            ],
                            correct: "b"
                        },
                        {
                            id: "q2",
                            text: "Q2. Which operator performs strict equality comparison?",
                            options: [
                                { value: "a", label: "==" },
                                { value: "b", label: "===" },
                                { value: "c", label: "=" }
                            ],
                            correct: "b"
                        },
                        {
                            id: "q3",
                            text: "Q3. What does DOM stand for?",
                            options: [
                                { value: "a", label: "Document Object Model" },
                                { value: "b", label: "Data Object Model" },
                                { value: "c", label: "Document Orientation Model" }
                            ],
                            correct: "a"
                        }
                    ]
                }
            },
            {
                sectionId: 2,
                title: "Section 2 — DOM & Events",
                lessons: [
                    { id: "2-1", title: "Lesson 1: Selecting Elements", duration: "20 mins" },
                    { id: "2-2", title: "Lesson 2: Manipulating Classes", duration: "25 mins" },
                    { id: "2-3", title: "Lesson 3: Event Listeners", duration: "30 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 2 — DOM & Events",
                    questions: [
                        {
                            id: "q1",
                            text: "Q1. Which method selects an element by ID?",
                            options: [
                                { value: "a", label: "querySelector()" },
                                { value: "b", label: "getElementById()" },
                                { value: "c", label: "getElementsByClassName()" }
                            ],
                            correct: "b"
                        },
                        {
                            id: "q2",
                            text: "Q2. How do you attach an event listener in JS?",
                            options: [
                                { value: "a", label: "addEventListener()" },
                                { value: "b", label: "attachEvent()" },
                                { value: "c", label: "onEvent()" }
                            ],
                            correct: "a"
                        },
                        {
                            id: "q3",
                            text: "Q3. Which event fires when an element is clicked?",
                            options: [
                                { value: "a", label: "hover" },
                                { value: "b", label: "click" },
                                { value: "c", label: "submit" }
                            ],
                            correct: "b"
                        }
                    ]
                }
            }
        ]
    },
    {
        id: 3,
        title: "UI/UX Design Basics & Figma Prototype",
        category: "Design",
        instructor: "Emma Watson",
        price: 0,
        rating: 4.6,
        reviewsCount: 75,
        lessonsCount: 6,
        duration: "6 hours",
        image: "images/uiux.svg",
        description: "Understand user experience principles and create interactive prototypes using Figma.",
        whatYouWillLearn: [
            "User research and wireframing techniques",
            "Figma fundamentals and UI kits",
            "Design systems and components",
            "Interactive prototyping and testing"
        ],
        sections: [
            {
                sectionId: 1,
                title: "Section 1 — UX Principles",
                lessons: [
                    { id: "1-1", title: "Lesson 1: Intro to UX/UI Design", duration: "15 mins" },
                    { id: "1-2", title: "Lesson 2: Wireframing", duration: "25 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 1 — UX Principles",
                    questions: [
                        { id: "q1", text: "Q1. What does UI stand for?", options: [{ value: "a", label: "User Interaction" }, { value: "b", label: "User Interface" }], correct: "b" },
                        { id: "q2", text: "Q2. What does UX stand for?", options: [{ value: "a", label: "User Experience" }, { value: "b", label: "User Execution" }], correct: "a" },
                        { id: "q3", text: "Q3. Which tool is used for prototyping?", options: [{ value: "a", label: "Figma" }, { value: "b", label: "Notepad" }], correct: "a" }
                    ]
                }
            },
            {
                sectionId: 2,
                title: "Section 2 — Figma Prototyping",
                lessons: [
                    { id: "2-1", title: "Lesson 1: Components & Variants", duration: "20 mins" },
                    { id: "2-2", title: "Lesson 2: Smart Animations", duration: "25 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 2 — Figma Prototyping",
                    questions: [
                        { id: "q1", text: "Q1. What are components in Figma?", options: [{ value: "a", label: "Reusable design elements" }, { value: "b", label: "Code snippets" }], correct: "a" },
                        { id: "q2", text: "Q2. What does Smart Animate do?", options: [{ value: "a", label: "Creates smooth fluid transitions" }, { value: "b", label: "Exports PNG files" }], correct: "a" },
                        { id: "q3", text: "Q3. Is Figma collaborative?", options: [{ value: "a", label: "Yes, real-time collaboration" }, { value: "b", label: "No, offline only" }], correct: "a" }
                    ]
                }
            }
        ]
    },
    {
        id: 4,
        title: "Modern CSS: Flexbox, Grid & Sass",
        category: "Design",
        instructor: "John Doe",
        price: 29,
        rating: 4.7,
        reviewsCount: 95,
        lessonsCount: 6,
        duration: "7 hours",
        image: "images/css.svg",
        description: "Build responsive, beautiful layouts easily using CSS Flexbox, Grid, and preprocessor Sass.",
        whatYouWillLearn: [
            "Advanced CSS selectors and variables",
            "Mastering CSS Flexbox and Grid",
            "CSS animations and transitions",
            "SASS preprocessing architecture"
        ],
        sections: [
            {
                sectionId: 1,
                title: "Section 1 — Flexbox & Grid",
                lessons: [
                    { id: "1-1", title: "Lesson 1: Flexbox Deep Dive", duration: "20 mins" },
                    { id: "1-2", title: "Lesson 2: CSS Grid Layouts", duration: "25 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 1 — Flexbox & Grid",
                    questions: [
                        { id: "q1", text: "Q1. Flexbox dimensions?", options: [{ value: "a", label: "One dimension" }, { value: "b", label: "Two dimensions" }], correct: "a" },
                        { id: "q2", text: "Q2. Grid columns property?", options: [{ value: "a", label: "grid-template-columns" }, { value: "b", label: "column-size" }], correct: "a" },
                        { id: "q3", text: "Q3. Sass file extension?", options: [{ value: "a", label: ".scss" }, { value: "b", label: ".cs" }], correct: "a" }
                    ]
                }
            },
            {
                sectionId: 2,
                title: "Section 2 — Sass Preprocessor",
                lessons: [
                    { id: "2-1", title: "Lesson 1: Variables & Nesting", duration: "20 mins" },
                    { id: "2-2", title: "Lesson 2: Mixins & Partials", duration: "25 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 2 — Sass Preprocessor",
                    questions: [
                        { id: "q1", text: "Q1. How to define a mixin?", options: [{ value: "a", label: "@mixin name" }, { value: "b", label: "def mixin" }], correct: "a" },
                        { id: "q2", text: "Q2. Partial prefix symbol?", options: [{ value: "a", label: "Underscore (_)" }, { value: "b", label: "Dollar ($)" }], correct: "a" },
                        { id: "q3", text: "Q3. Does Sass require compilation?", options: [{ value: "a", label: "Yes, into standard CSS" }, { value: "b", label: "No, runs natively in browser" }], correct: "a" }
                    ]
                }
            }
        ]
    },
    {
        id: 5,
        title: "Python for Data Science & Analytics",
        category: "Data Science",
        instructor: "Alan Turing",
        price: 89,
        rating: 4.9,
        reviewsCount: 240,
        lessonsCount: 6,
        duration: "18 hours",
        image: "images/python.svg",
        description: "Dive into data analysis, Pandas, NumPy, and basic machine learning with Python.",
        whatYouWillLearn: [
            "Python programming fundamentals",
            "Data manipulation with Pandas",
            "Numerical computing with NumPy",
            "Data visualization and machine learning basics"
        ],
        sections: [
            {
                sectionId: 1,
                title: "Section 1 — Python Essentials",
                lessons: [
                    { id: "1-1", title: "Lesson 1: Python Syntax", duration: "20 mins" },
                    { id: "1-2", title: "Lesson 2: Pandas Library", duration: "30 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 1 — Python Essentials",
                    questions: [
                        { id: "q1", text: "Q1. Data manipulation library?", options: [{ value: "a", label: "Pandas" }, { value: "b", label: "React" }], correct: "a" },
                        { id: "q2", text: "Q2. Define function keyword?", options: [{ value: "a", label: "def" }, { value: "b", label: "function" }], correct: "a" },
                        { id: "q3", text: "Q3. Comment symbol?", options: [{ value: "a", label: "#" }, { value: "b", label: "//" }], correct: "a" }
                    ]
                }
            },
            {
                sectionId: 2,
                title: "Section 2 — NumPy & Machine Learning",
                lessons: [
                    { id: "2-1", title: "Lesson 1: NumPy Arrays", duration: "25 mins" },
                    { id: "2-2", title: "Lesson 2: Scikit-Learn Basics", duration: "30 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 2 — NumPy & Machine Learning",
                    questions: [
                        { id: "q1", text: "Q1. Core NumPy data structure?", options: [{ value: "a", label: "ndarray" }, { value: "b", label: "matrix-list" }], correct: "a" },
                        { id: "q2", text: "Q2. Scikit-Learn purpose?", options: [{ value: "a", label: "Machine learning algorithms" }, { value: "b", label: "Web routing" }], correct: "a" },
                        { id: "q3", text: "Q3. What is data cleaning?", options: [{ value: "a", label: "Handling missing values" }, { value: "b", label: "Formatting text" }], correct: "a" }
                    ]
                }
            }
        ]
    },
    {
        id: 6,
        title: "Digital Marketing 101: SEO & Social Ads",
        category: "Marketing",
        instructor: "Sarah Connor",
        price: 39,
        rating: 4.4,
        reviewsCount: 60,
        lessonsCount: 6,
        duration: "10 hours",
        image: "images/marketing.svg",
        description: "Scale business growth through targeted SEO strategies and high-converting social ads.",
        whatYouWillLearn: [
            "Search Engine Optimization (SEO) strategies",
            "Social Media Marketing campaigns",
            "Email marketing automation",
            "Google Analytics tracking and reports"
        ],
        sections: [
            {
                sectionId: 1,
                title: "Section 1 — SEO Fundamentals",
                lessons: [
                    { id: "1-1", title: "Lesson 1: SEO Basics", duration: "15 mins" },
                    { id: "1-2", title: "Lesson 2: Social Ads Setup", duration: "20 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 1 — SEO Fundamentals",
                    questions: [
                        { id: "q1", text: "Q1. What does SEO stand for?", options: [{ value: "a", label: "Search Engine Optimization" }, { value: "b", label: "Social Email Operations" }], correct: "a" },
                        { id: "q2", text: "Q2. Traffic tracking tool?", options: [{ value: "a", label: "Google Analytics" }, { value: "b", label: "Photoshop" }], correct: "a" },
                        { id: "q3", text: "Q3. B2B networking platform?", options: [{ value: "a", label: "LinkedIn" }, { value: "b", label: "TikTok" }], correct: "a" }
                    ]
                }
            },
            {
                sectionId: 2,
                title: "Section 2 — Paid Campaigns",
                lessons: [
                    { id: "2-1", title: "Lesson 1: Target Audience", duration: "20 mins" },
                    { id: "2-2", title: "Lesson 2: ROI Optimization", duration: "25 mins" }
                ],
                quiz: {
                    title: "Quiz: Section 2 — Paid Campaigns",
                    questions: [
                        { id: "q1", text: "Q1. What does ROI stand for?", options: [{ value: "a", label: "Return on Investment" }, { value: "b", label: "Rate of Interest" }], correct: "a" },
                        { id: "q2", text: "Q2. Purpose of A/B testing?", options: [{ value: "a", label: "Compare two ad versions" }, { value: "b", label: "Double costs" }], correct: "a" },
                        { id: "q3", text: "Q3. What is audience targeting?", options: [{ value: "a", label: "Reaching specific potential buyers" }, { value: "b", label: "Broadcasting randomly" }], correct: "a" }
                    ]
                }
            }
        ]
    }
];

// Hàm mã hóa ký tự HTML an toàn để hiển thị các thẻ như <p>, <para>, <text>
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Retrieve courses from localStorage or initialize with default data
function getCourses() {
    let storedCourses = localStorage.getItem('learnhub_courses');
    if (!storedCourses) {
        localStorage.setItem('learnhub_courses', JSON.stringify(DEFAULT_COURSES));
        return DEFAULT_COURSES;
    }
    try {
        return JSON.parse(storedCourses);
    } catch (e) {
        return DEFAULT_COURSES;
    }
}

// Save courses array to localStorage
function saveCourses(courses) {
    localStorage.setItem('learnhub_courses', JSON.stringify(courses));
}

// Render dynamic content on the course detail page (supporting multiple sections & quizzes)
function initDetailPage() {
    const videoPlaceholder = document.getElementById('video-thumbnail-placeholder');
    const sidebarThumbnail = document.getElementById('course-sidebar-thumbnail');
    if (!videoPlaceholder && !sidebarThumbnail) return;

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || '1';

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
        if (ratingEl) ratingEl.innerHTML = course.rating;

        if (course.reviewsCount) {
            updateText("course-rating-count", `(${course.reviewsCount} ratings)`);
        }

        const descContainer = document.getElementById("detail-description");
        if (descContainer && course.description) {
            descContainer.innerHTML = `<p>${course.description}</p>`;
        }

        const learnListContainer = document.getElementById("detail-learn-list");
        if (learnListContainer && course.whatYouWillLearn) {
            learnListContainer.innerHTML = course.whatYouWillLearn.map(item => `
                <div class="col-md-6 mb-2">
                    <i class="bi bi-check2 text-success me-2"></i> ${item}
                </div>
            `).join('');
        }

        // Render multiple sections into curriculumAccordion dynamically
        const accordionContainer = document.getElementById("curriculumAccordion");
        if (accordionContainer && course.sections) {
            accordionContainer.innerHTML = course.sections.map((sec, index) => {
                const isShow = index === 0 ? "show" : "";
                const isCollapsed = index === 0 ? "" : "collapsed";
                const ariaExpanded = index === 0 ? "true" : "false";

                const lessonsHTML = sec.lessons.map(lesson => `
                    <div class="lesson-list-item p-3 border-bottom d-flex align-items-center justify-content-between">
                        <div class="lesson-left d-flex align-items-center">
                            <input type="checkbox" class="lesson-checkbox me-3" id="chk-${lesson.id}" data-lesson-id="${lesson.id}" data-section="${sec.sectionId}">
                            <label for="chk-${lesson.id}" class="mb-0 cursor-pointer">${lesson.title}</label>
                        </div>
                        <span class="lesson-duration text-muted small">${lesson.duration}</span>
                    </div>
                `).join('');

                // Đặt input radio VÀO BÊN TRONG thẻ label để radio button và text nằm chung trên 1 dòng
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
                    <div class="accordion-item mb-3 border rounded overflow-hidden shadow-sm" id="section-item-${sec.sectionId}">
                        <h2 class="accordion-header" id="heading-${sec.sectionId}">
                            <button class="accordion-button ${isCollapsed} d-flex justify-content-between align-items-center bg-light text-dark fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${sec.sectionId}" aria-expanded="${ariaExpanded}">
                                <span class="d-flex align-items-center gap-2">
                                    ${sec.title} (${sec.lessons.length} lessons)
                                    <span class="badge-section-completed badge bg-success ms-2" id="badge-section-${sec.sectionId}" style="display: none;"><i class="bi bi-check-circle-fill"></i> Done</span>
                                </span>
                            </button>
                        </h2>
                        <div id="collapse-${sec.sectionId}" class="accordion-collapse collapse ${isShow}" data-bs-parent="#curriculumAccordion">
                            <div class="accordion-body p-0">
                                <div class="lesson-list">
                                    ${lessonsHTML}
                                </div>
                                <div class="quiz-section-trigger-wrapper p-3 bg-white text-end border-top">
                                    <button class="btn btn-outline-primary btn-sm btn-quiz-trigger fw-semibold" data-section="${sec.sectionId}">
                                        <i class="bi bi-patch-question-fill me-1"></i> Take Quiz: ${sec.title}
                                    </button>
                                </div>
                                <div class="quiz-panel-inline p-4 bg-white border-top" id="quiz-panel-${sec.sectionId}" style="display: none;">
                                    <div class="quiz-header">
                                        <h5 class="quiz-title">${sec.quiz.title}</h5>
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
                this.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80';
            };
        }

        if (sidebarThumbnail) {
            sidebarThumbnail.src = imagePath;
            sidebarThumbnail.onerror = function() {
                this.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80';
            };
        }
    }
}

// Initialize application index grid filtering and sorting
function initApp() {
    getCourses();
    initDetailPage();

    let currentCategory = 'All';
    let searchQuery = '';
    let currentSort = 'default';

    const coursesGrid = document.getElementById('courses-grid');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const gridSearchInput = document.getElementById('grid-search-input');
    const sortDropdown = document.getElementById('sort-dropdown');
    const noCoursesMessage = document.getElementById('no-courses-message');
    const btnResetFilters = document.getElementById('btn-reset-filters');

    function renderCourses() {
        if (!coursesGrid) return;

        let courses = getCourses();

        if (currentCategory !== 'All') {
            courses = courses.filter(c => c.category.toLowerCase() === currentCategory.toLowerCase());
        }

        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            courses = courses.filter(c => 
                c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
            );
        }

        let sortedCourses = [...courses];
        if (currentSort === 'price-asc') {
            sortedCourses.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            sortedCourses.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'rating-desc') {
            sortedCourses.sort((a, b) => b.rating - a.rating);
        }

        if (sortedCourses.length === 0) {
            coursesGrid.innerHTML = '';
            if (noCoursesMessage) noCoursesMessage.style.display = 'block';
            return;
        }

        if (noCoursesMessage) noCoursesMessage.style.display = 'none';

        coursesGrid.innerHTML = sortedCourses.map(course => {
            const isFree = course.price === 0;
            const priceDisplay = isFree ? 'FREE' : `$${course.price}`;
            const priceClass = isFree ? 'course-price free' : 'course-price';
            const btnClass = isFree ? 'btn btn-outline-primary btn-enroll' : 'btn btn-primary btn-enroll';

            return `
                <div class="col course-card-item" data-category="${course.category}" data-price="${course.price}" data-rating="${course.rating}">
                    <div class="course-card">
                        <div class="course-image-wrapper">
                            <img src="${course.image}" alt="${course.title}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80'">
                            <span class="course-badge">${course.category}</span>
                        </div>
                        <div class="course-body">
                            <div class="course-meta">
                                <span class="course-rating">
                                    <i class="bi bi-star-fill"></i> ${course.rating}
                                </span>
                                <span class="text-muted">(${course.reviewsCount} reviews)</span>
                            </div>
                            <h3 class="course-title">${course.title}</h3>
                            <div class="course-instructor">
                                <i class="bi bi-person-circle"></i>
                                <span>${course.instructor}</span>
                            </div>
                            <div class="course-info-list">
                                <span><i class="bi bi-book"></i> ${course.lessonsCount} lessons</span>
                                <span><i class="bi bi-clock"></i> ${course.duration}</span>
                            </div>
                        </div>
                        <div class="course-footer">
                            <span class="${priceClass}">${priceDisplay}</span>
                            <a href="course-detail.html?id=${course.id}" class="${btnClass}">Enroll Now</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                categoryTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                currentCategory = this.getAttribute('data-category');
                renderCourses();
            });
        });
    }

    if (gridSearchInput) {
        gridSearchInput.addEventListener('input', function(e) {
            searchQuery = e.target.value;
            renderCourses();
        });
    }

    if (sortDropdown) {
        sortDropdown.addEventListener('change', function(e) {
            currentSort = e.target.value;
            renderCourses();
        });
    }

    if (btnResetFilters) {
        btnResetFilters.addEventListener('click', function() {
            currentCategory = 'All';
            searchQuery = '';
            currentSort = 'default';

            if (gridSearchInput) gridSearchInput.value = '';
            if (sortDropdown) sortDropdown.value = 'default';

            categoryTabs.forEach(t => {
                if (t.getAttribute('data-category') === 'All') {
                    t.classList.add('active');
                    t.setAttribute('aria-selected', 'true');
                } else {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                }
            });

            renderCourses();
        });
    }

    renderCourses();
}

// Application entry point
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
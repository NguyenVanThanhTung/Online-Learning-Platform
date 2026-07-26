window.LearnHubApp = window.LearnHubApp || {};

window.LearnHubApp.config = {
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};

window.LearnHubApp.pages = window.LearnHubApp.pages || {};

window.LearnHubApp.getCurrentPage = function getCurrentPage() {
  return document.body ? document.body.dataset.page || 'index' : 'index';
};

window.LearnHubApp.registerPage = function registerPage(pageName, initFn) {
  if (typeof pageName !== 'string' || typeof initFn !== 'function') {
    return;
  }

  window.LearnHubApp.pages[pageName] = initFn;
};

window.LearnHubApp.runPage = function runPage() {
  const pageName = window.LearnHubApp.getCurrentPage();
  const initFn = window.LearnHubApp.pages[pageName];

  if (typeof initFn === 'function') {
    initFn();
  }
};

/* ==========================================================
   DOMAINS: SEED DATA & STORAGE CONTRACT (FE-001 / Admin / Detail)
   ========================================================== */

// 1. Domain Seed Data (6 khóa học mẫu ban đầu)
window.LearnHubApp.seedCourses = [
  {
    id: 1,
    title: "HTML Fundamentals",
    category: "web-dev",
    instructor: "Sarah Johnson",
    lessonsCount: 12,
    price: 0, // FREE
    rating: 4.9,
    status: "published",
    description: "Learn the core concepts of HTML5 and build semantic web structures from scratch.",
    whatYouLearn: [
      "Semantic HTML tags",
      "Forms and validations",
      "Accessibility best practices",
      "SEO page structuring"
    ],
    curriculum: [
      {
        sectionTitle: "Section 1 — HTML Basics",
        lessons: [
          { id: 101, title: "Introduction to HTML5" },
          { id: 102, title: "Text formatting and tags" },
          { id: 103, title: "Links and Images" }
        ],
        quiz: {
          title: "Quiz: HTML Basics",
          questions: [
            {
              question: "What does HTML stand for?",
              options: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "Hyperlink Text Markup Language",
                "None of the above"
              ],
              correctIndex: 0
            },
            {
              question: "Which tag is used to define a paragraph?",
              options: ["<para>", "<p>", "<pg>", "<text>"],
              correctIndex: 1
            },
            {
              question: "Which element is used for the largest heading?",
              options: ["<h6>", "<head>", "<h1>", "<header>"],
              correctIndex: 2
            }
          ]
        }
      },
      {
        sectionTitle: "Section 2 — Advanced Forms & Tables",
        lessons: [
          { id: 104, title: "HTML Tables structure" },
          { id: 105, title: "Advanced Form Controls" }
        ],
        quiz: {
          title: "Quiz: Forms & Tables",
          questions: [
            {
              question: "Which tag is used to create a drop-down list?",
              options: ["<list>", "<select>", "<input type='dropdown'>", "<dropdown>"],
              correctIndex: 1
            },
            {
              question: "Which attribute specifies input field should not be empty?",
              options: ["validate", "placeholder", "required", "mandatory"],
              correctIndex: 2
            },
            {
              question: "Which tag defines a table row?",
              options: ["<td>", "<th>", "<tr>", "<trow>"],
              correctIndex: 2
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "CSS Mastery",
    category: "design",
    instructor: "Mike Chen",
    lessonsCount: 18,
    price: 49,
    rating: 4.7,
    status: "published",
    description: "Master modern layouts with Flexbox, CSS Grid, and responsive styling techniques.",
    whatYouLearn: ["Flexbox layout model", "CSS Grid systems", "Responsive media queries", "Animations and transitions"],
    curriculum: [
      {
        sectionTitle: "Section 1 — Layouts with Flexbox",
        lessons: [
          { id: 201, title: "Flexbox container properties" },
          { id: 202, title: "Flex items alignment" }
        ],
        quiz: {
          title: "Quiz: Flexbox",
          questions: [
            {
              question: "Which property sets main axis direction in Flexbox?",
              options: ["flex-direction", "align-items", "justify-content", "flex-wrap"],
              correctIndex: 0
            },
            {
              question: "Which property aligns items along cross axis?",
              options: ["justify-content", "align-items", "align-content", "flex-align"],
              correctIndex: 1
            },
            {
              question: "Flexbox is a...",
              options: ["1D layout system", "2D layout system", "Database model", "JavaScript framework"],
              correctIndex: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "JavaScript Pro",
    category: "web-dev",
    instructor: "Alex Rivera",
    lessonsCount: 24,
    price: 89,
    rating: 4.8,
    status: "published",
    description: "From ES6+ modern syntax to asynchronous programming and DOM manipulation.",
    whatYouLearn: ["ES6+ syntax and features", "DOM events handling", "Async/Await and Fetch API", "Real-world apps development"],
    curriculum: [
      {
        sectionTitle: "Section 1 — JavaScript Basics",
        lessons: [
          { id: 301, title: "Variables and Scopes" },
          { id: 302, title: "Arrow Functions" },
          { id: 303, title: "Array methods (map, filter, reduce)" }
        ],
        quiz: {
          title: "Quiz: JS Basics",
          questions: [
            {
              question: "Which keyword declares a block-scoped variable?",
              options: ["var", "let", "define", "constant"],
              correctIndex: 1
            },
            {
              question: "What method adds an element to the end of an array?",
              options: ["shift()", "unshift()", "push()", "pop()"],
              correctIndex: 2
            },
            {
              question: "Which method creates a new filtered array?",
              options: ["map()", "filter()", "forEach()", "reduce()"],
              correctIndex: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "Data Science 101",
    category: "data-science",
    instructor: "Dr. Park",
    lessonsCount: 20,
    price: 79,
    rating: 4.6,
    status: "published",
    description: "Introduction to data analysis, visualization, and Python libraries.",
    whatYouLearn: ["Python fundamentals", "Pandas and NumPy", "Data visualization", "Basic statistical models"],
    curriculum: [
      {
        sectionTitle: "Section 1 — Python Intro",
        lessons: [
          { id: 401, title: "Data types in Python" },
          { id: 402, title: "Working with NumPy arrays" }
        ],
        quiz: {
          title: "Quiz: Python & NumPy",
          questions: [
            {
              question: "How do you create a one-dimensional array in NumPy?",
              options: ["np.array()", "np.create()", "np.list()", "np.matrix()"],
              correctIndex: 0
            },
            {
              question: "Which library is primary for tabular data analysis?",
              options: ["Matplotlib", "Pandas", "Requests", "Math"],
              correctIndex: 1
            },
            {
              question: "Is Python dynamically typed?",
              options: ["Yes", "No", "Only in functions", "Depends on libraries"],
              correctIndex: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "UI/UX Design",
    category: "design",
    instructor: "Emma Wilson",
    lessonsCount: 15,
    price: 59,
    rating: 4.8,
    status: "published",
    description: "Learn wireframing, prototyping, and user-centered interface design principles.",
    whatYouLearn: ["User research basics", "Wireframing in Figma", "Design systems", "Usability testing"],
    curriculum: [
      {
        sectionTitle: "Section 1 — Design Principles",
        lessons: [
          { id: 501, title: "Introduction to UI/UX" },
          { id: 502, title: "Color theory and typography" }
        ],
        quiz: {
          title: "Quiz: UI/UX Foundations",
          questions: [
            {
              question: "What does UI stand for?",
              options: ["User Interaction", "User Interface", "Unified Integration", "User Internet"],
              correctIndex: 1
            },
            {
              question: "What is a wireframe used for?",
              options: ["Final visual polish", "Low-fidelity structural layout", "Backend coding", "Database schema"],
              correctIndex: 1
            },
            {
              question: "Which rule helps guide user attention?",
              options: ["Rule of thirds / Visual hierarchy", "Random placement", "Monochrome enforcement", "Heavy margins"],
              correctIndex: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: "Digital Marketing",
    category: "marketing",
    instructor: "Tom B.",
    lessonsCount: 10,
    price: 39,
    rating: 4.5,
    status: "published",
    description: "Grow your online presence with SEO, social media strategies, and email campaigns.",
    whatYouLearn: ["SEO optimization", "Social media growth hacks", "Email marketing funnels", "Analytics tracking"],
    curriculum: [
      {
        sectionTitle: "Section 1 — SEO Basics",
        lessons: [
          { id: 601, title: "Keyword research overview" },
          { id: 602, title: "On-page SEO fundamentals" }
        ],
        quiz: {
          title: "Quiz: SEO Basics",
          questions: [
            {
              question: "What does SEO stand for?",
              options: ["Search Engine Optimization", "Site Execution Order", "Social Email Outreach", "System Engine Online"],
              correctIndex: 0
            },
            {
              question: "Which of these is an on-page SEO factor?",
              options: ["Backlinks from external sites", "Meta title and description", "Server physical location", "Domain age only"],
              correctIndex: 1
            },
            {
              question: "Why is keyword research important?",
              options: ["To know what users are searching for", "To slow down competitors", "To bypass web hosting fees", "To increase font sizes"],
              correctIndex: 0
            }
          ]
        }
      }
    ]
  }
];

// 2. Storage Contract (Các hàm thao tác localStorage chuẩn hóa)
window.LearnHubApp.storage = {
  COURSES_KEY: 'learnhub_courses',
  PROGRESS_KEY: 'learnhub_lesson_progress',
  QUIZ_KEY: 'learnhub_quiz_results',

  getCourses() {
    const data = localStorage.getItem(this.COURSES_KEY);
    if (!data) {
      this.saveCourses(window.LearnHubApp.seedCourses);
      return window.LearnHubApp.seedCourses;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return window.LearnHubApp.seedCourses;
    }
  },

  saveCourses(courses) {
    localStorage.setItem(this.COURSES_KEY, JSON.stringify(courses));
  },

  getCompletedLessons() {
    const data = localStorage.getItem(this.PROGRESS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCompletedLessons(lessonIds) {
    localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(lessonIds));
  },

  getQuizResults() {
    const data = localStorage.getItem(this.QUIZ_KEY);
    return data ? JSON.parse(data) : {};
  },

  saveQuizResult(sectionId, scoreData) {
    const results = this.getQuizResults();
    results[sectionId] = scoreData;
    localStorage.setItem(this.QUIZ_KEY, JSON.stringify(results));
  }
};

document.addEventListener('DOMContentLoaded', function onDomReady() {
  window.LearnHubApp.runPage();
});

/* ==========================================================
   PAGE REGISTRATION & INITIALIZATION
   ========================================================== */

// Đăng ký trang chủ (index.html với <body data-page="index">)
if (window.LearnHubApp.startIndexPage) {
  window.LearnHubApp.registerPage('index', window.LearnHubApp.startIndexPage);
}

// Đăng ký trang chi tiết khóa học (course-detail.html với <body data-page="course-detail">)
if (window.LearnHubApp.startCourseDetailPage) {
  window.LearnHubApp.registerPage('course-detail', window.LearnHubApp.startCourseDetailPage);
}

// Tự động kích hoạt khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function onDomReady() {
  window.LearnHubApp.runPage();
});

// Dự phòng trường hợp script load sau khi DOM đã load xong
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => {
    if (window.LearnHubApp && typeof window.LearnHubApp.runPage === 'function') {
      window.LearnHubApp.runPage();
    }
  }, 0);
}
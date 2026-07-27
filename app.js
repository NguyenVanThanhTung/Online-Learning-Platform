// Dữ liệu mẫu chuẩn gồm 6 khóa học ban đầu
const DEFAULT_COURSES = [
    {
        id: 1,
        title: "HTML5 & CSS3 Fundamentals for Beginners",
        category: "Web Dev",
        instructor: "John Doe",
        price: 0,
        rating: 4.5,
        reviewsCount: 89,
        lessonsCount: 12,
        duration: "8 hours",
        image: "images/html.svg",
        description: "Learn the core foundations of web development with semantic HTML5 and modern CSS3."
    },
    {
        id: 2,
        title: "JavaScript Essentials & ES6+ Concepts",
        category: "Web Dev",
        instructor: "Jane Smith",
        price: 49,
        rating: 4.8,
        reviewsCount: 120,
        lessonsCount: 15,
        duration: "12 hours",
        image: "images/javascript.svg",
        description: "Master modern JavaScript, asynchronous programming, and ES6+ features."
    },
    {
        id: 3,
        title: "UI/UX Design Basics & Figma Prototype",
        category: "Design",
        instructor: "Emma Watson",
        price: 0,
        rating: 4.6,
        reviewsCount: 75,
        lessonsCount: 8,
        duration: "6 hours",
        image: "images/uiux.svg",
        description: "Understand user experience principles and create interactive prototypes using Figma."
    },
    {
        id: 4,
        title: "Modern CSS: Flexbox, Grid & Sass",
        category: "Design",
        instructor: "John Doe",
        price: 29,
        rating: 4.7,
        reviewsCount: 95,
        lessonsCount: 10,
        duration: "7 hours",
        image: "images/css.svg",
        description: "Build responsive, beautiful layouts easily using CSS Flexbox, Grid, and preprocessor Sass."
    },
    {
        id: 5,
        title: "Python for Data Science & Analytics",
        category: "Data Science",
        instructor: "Alan Turing",
        price: 89,
        rating: 4.9,
        reviewsCount: 240,
        lessonsCount: 20,
        duration: "18 hours",
        image: "images/python.svg",
        description: "Dive into data analysis, Pandas, NumPy, and basic machine learning with Python."
    },
    {
        id: 6,
        title: "Digital Marketing 101: SEO & Social Ads",
        category: "Marketing",
        instructor: "Sarah Connor",
        price: 39,
        rating: 4.4,
        reviewsCount: 60,
        lessonsCount: 12,
        duration: "10 hours",
        image: "images/marketing.svg",
        description: "Scale business growth through targeted SEO strategies and high-converting social ads."
    }
];

/**
 * Lấy danh sách khóa học từ localStorage (hoặc khởi tạo nếu chưa có)
 */
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

/**
 * Lưu danh sách khóa học vào localStorage
 */
function saveCourses(courses) {
    localStorage.setItem('learnhub_courses', JSON.stringify(courses));
}

/**
 * Hàm khởi tạo ứng dụng
 */
function initApp() {
    getCourses();

    // Các biến trạng thái bộ lọc (Filter & Search State)
    let currentCategory = 'All';
    let searchQuery = '';
    let currentSort = 'default';

    // DOM Elements
    const coursesGrid = document.getElementById('courses-grid');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const gridSearchInput = document.getElementById('grid-search-input');
    const sortDropdown = document.getElementById('sort-dropdown');
    const noCoursesMessage = document.getElementById('no-courses-message');
    const btnResetFilters = document.getElementById('btn-reset-filters');

    /**
     * Render danh sách khóa học ra giao diện dựa trên bộ lọc hiện tại
     */
    function renderCourses() {
        if (!coursesGrid) return; // Nếu không ở trang index thì bỏ qua

        let courses = getCourses();

        // 1. Lọc theo danh mục (Category Filter)
        if (currentCategory !== 'All') {
            courses = courses.filter(c => c.category.toLowerCase() === currentCategory.toLowerCase());
        }

        // 2. Lọc theo từ khóa tìm kiếm (Search Query - Title hoặc Instructor)
        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase().trim();
            courses = courses.filter(c => 
                c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
            );
        }

        // 3. Sắp xếp (Sorting) - Dùng [...courses] để tránh làm thay đổi mảng gốc trong localStorage
        let sortedCourses = [...courses];
        if (currentSort === 'price-asc') {
            sortedCourses.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'price-desc') {
            sortedCourses.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'rating-desc') {
            sortedCourses.sort((a, b) => b.rating - a.rating);
        }

        // 4. Hiển thị kết quả lên Grid hoặc hiện thông báo trống
        if (sortedCourses.length === 0) {
            coursesGrid.innerHTML = '';
            if (noCoursesMessage) noCoursesMessage.style.display = 'block';
            return;
        }

        if (noCoursesMessage) noCoursesMessage.style.display = 'none';

        // Tạo HTML cho từng thẻ khóa học (Đã tích hợp dự phòng lỗi ảnh onerror)
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

    // LẮNG NGHE SỰ KIỆN TƯƠNG TÁC (EVENT LISTENERS)
    // Xử lý đổi danh mục tab
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

    // Xử lý thanh tìm kiếm chính trong lưới khóa học
    if (gridSearchInput) {
        gridSearchInput.addEventListener('input', function(e) {
            searchQuery = e.target.value;
            renderCourses();
        });
    }

    // Xử lý sắp xếp (Sort dropdown)
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function(e) {
            currentSort = e.target.value;
            renderCourses();
        });
    }

    // Nút reset bộ lọc khi không tìm thấy kết quả
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

    // Khởi chạy render lần đầu tiên khi load trang
    renderCourses();
}

// Kích hoạt khi DOM đã tải xong
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
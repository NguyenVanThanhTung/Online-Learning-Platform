## 1. Kiến trúc tổng thế
Đây là một ứng dụng Front-end thuần (Static Web Application). Tức:
- Không có Backend.
- Không có Database.
- localStorage đóng vai trò như Database.

```
                Browser
                    │
         HTML + CSS + Bootstrap
                    │
            Vanilla JavaScript
                    │
        ┌───────────┴───────────┐
        │                       │
     UI Layer             Business Layer
        │                       │
        └───────────┬───────────┘
                    │
              Data Layer
                    │
             localStorage
```

## 2. Kiến trúc thư mục
```
online-learning-flatform/
│
├── index.html
├── course-detail.html
├── admin.html
│
├── css/
│   ├── style.css
│   └── components.css
│
├── js/
│   ├── controllers/
│   │   ├── course-controller.js
│   │   ├── admin-controller.js
│   │   ├── lesson-controller.js
│   │   └── quiz-controller.js
│   │
│   ├── data/
│   │   └── courses.js
│   │
│   ├── services/
│   │   ├── storage-service.js
│   │   ├── course-service.js
│   │   ├── lesson-service.js
│   │   └── quiz-service.js
│   │
│   ├── components/
│   │   ├── course-card.js
│   │   ├── course-table.js
│   │   ├── pagination.js
│   │   ├── search-box.js
│   │   ├── filter-bar.js
|   |   ├── progress-bar.j
|   |   ├── quiz-panel.js
|   |   ├── modal.js
│   │   └── toast.js
│   │
│   ├── pages/
│   │   ├── admin.js
│   │   ├── course-detail.js
│   │   └── index.js
│   │   
│   ├── utils/
│   │   ├── validator.js
│   │   └── helper.js
│   │
│   ├── store/
│   │   └── app-state.js
│   │
│   └── app.js
│
├── tests/
│   ├── course-service.test.js
│   ├── lesson-service.test.js
│   ├── quiz-service.test.js
│   ├── storage-service.test.js
│   └── validator.test.js
│
├── images/
│
├── assets/
│
└── README.md
```

## 3. Layer Architecture
### 3.1. Presentation Layer
Là các trang HTML, chỉ chứa layout (HTML Skeleton, Bootstrap Layout, Container). Không xử lý logic (render data, business, localStorage).
```
index.html
course-detail.html
admin.html
```

### 3.2. UI Layer
Nhiệm vụ chỉ Render giao diện. UI không biết localStage, không biết lấy dữ liệu từ đâu.
```
components/
course-card.js
course-table.js
pagination.js
search-box.js
filter-bar.js
course-modal.js
toast.js
confirm-modal.js
quiz-renderer.js
lesson-renderer.js
progress-bar.js
```

### 3.3. Controller Layer
Controller chịu trách nhiệm lắng nghe event, gọi service, gọi renderer. Controller cũng quản lý UI State.
```
Page
↓
Controller
↓
Service
↓
Storage
```

```
currentPage
keyword
sort
selectedCategory
```

### 3.4. Business Layer
Đây là nơi xử lý logic. Service không được phép đụng UI.
```
Search Course
Filter
Sort
CRUD
Pagination
Quiz
Lesson Progress
Validation
```
Tức:
```
CourseService.search()
CourseService.filter()
CourseService.add()
CourseService.update()
CourseService.delete()
```

### 3.5. Data Layer
Chỉ có nhiệm vụ đọc ghi localStorage. Business Layer chỉ gọi Data Layer, không gọi localStorage trực tiếp.
StorageService
```
load(key)
save(key)
remove(key)
exists(key)
seed()
```

## 4. Kiến trúc dữ liệu
### 4.1. Domain Model
```
Course
   ├── Sections[]

Section
   ├── Lessons[]
   ├── Quiz[]

Lesson

Quiz
```

### 4.2 Course
```
Course
---------
id
title
category
instructor
sections[]
price
rating
status
thumbnail
description
curriculum
```

### 4.3. Lesson
```
Lesson
---------
id
title
completed
```

### 4.4. Section
```
Section
---------
id
title
lessons[]
quiz[]
```

### 4.5. Quiz
```
Quiz
---------
id
question
options[]
correctAnswer
```

## 5. Các module chính
### 5.1 StorageService
- load()
- save()
- exists()
- remove()
- seed()

### 5.2. CourseService
- getAll()
- getById()
- search()
- filter()
- sort()
- paginate()
- add()
- update()
- delete()

### 5.3. LessonService
- toggleLesson()
- calculateProgress()
- completeSection()
- loadProgress()
- saveProgress()

### 5.4. QuizService
- submitQuiz()
- retakeQuiz()
- calculateScore()
- checkPass()
- saveResult()

### 5.5. Validator
- validateTitle()
- validatePrice()
- validateLessonCount()
- validateRating()
- validateRequired()

### 5.6. Renderer
- renderCourseCards()
- renderTable()
- renderPagination()
- renderAccordion()
- renderQuiz()
- renderProgress()
- showToast()
- showModal()

### 5.7. State Management
AppState
- searchKeyword
- selectedCategory
- selectedStatus
- sortOption
- currentPage
- filteredCourses
- displayCourses

## 6. Event Flow
### 6.1. Search Course
```
User
↓
Search Input
↓
CourseController
↓
CourseService.search()
↓
AppState
↓
CourseRenderer
↓
Course List Updated
```

### 6.2. Create Course
```
User
↓
Submit Form
↓
AdminController
↓
Validator
↓
CourseService.add()
↓
StorageService.save()
↓
CourseTable.render()
↓
Toast.show()
```

### 6.3. Delete Course
```
Delete Button
↓
Confirm Modal
↓
AdminController
↓
CourseService.delete()
↓
StorageService.save()
↓
CourseTable.render()
↓
Toast.show()
```

### 6.4. Complete Lesson
```
Checkbox
↓
LessonController
↓
LessonService.toggle()
↓
StorageService.save()
↓
ProgressBar.render()
```

### 6.5. Submit Quit
```
Submit Quiz
↓
QuizController
↓
QuizService.submit()
↓
StorageService.save()
↓
QuizRenderer.renderResult()
```

## 7. Kiến trúc tổng thể (Solution Architecture)
```
                     LearnHub
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   index.html   course-detail.html   admin.html
        │               │                │
        └───────────────┼────────────────┘
                        ▼
                  Page Controllers
        (index.js, course-detail.js, admin.js)
                        │
        ┌───────────────┼────────────────────────┐
        ▼               ▼                        ▼
 CourseService     LessonService          QuizService
        │               │                        │
        └───────────────┼────────────────────────┘
                        ▼
                 StorageService
                        │
                  localStorage
                        │
                        ▼
                 Browser Storage
```
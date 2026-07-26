# Architecture Document — Online Learning Platform

## 1. Mục tiêu hệ thống
Dự án là một trang web học trực tuyến tĩnh bằng HTML, CSS và JavaScript thuần, đáp ứng các yêu cầu từ requirement gồm:
- Trang danh sách khóa học và trang chi tiết khóa học
- Tính năng tìm kiếm, lọc, sắp xếp khóa học
- Trình phát bài học giả lập và quiz cho từng section
- Bảng quản trị admin cho CRUD khóa học
- Dữ liệu được lưu trong localStorage để duy trì trạng thái sau refresh

## 2. Kiến trúc tổng quan
Hệ thống được xây dựng theo mô hình web tĩnh (static web app) với cấu trúc phân tách rõ ràng giữa giao diện, logic và dữ liệu. Mỗi trang HTML chịu trách nhiệm hiển thị giao diện, còn các file JavaScript xử lý logic tương ứng và chia sẻ dữ liệu qua app.js.

### 2.1 Nguyên tắc thiết kế
- Chia UI theo từng page riêng: listing, detail, admin
- Dùng JavaScript theo file riêng cho từng chức năng
- Dữ liệu ban đầu được hardcode, sau đó được lưu vào localStorage
- Tuân thủ chuẩn naming: file chữ thường, class tên kebab-case, biến JS camelCase
- Responsive thiết kế bằng Bootstrap 5

### 2.2 Architecture overview
```text
                   Client Browser
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
  index.html     course-detail.html     admin.html
        │                 │                 │
        └──────────────┬──┴─────────────────┘
                       │
                  Shared Logic
                     app.js
                       │
      ┌────────────────┼────────────────┐
      │                │                │
  Course Data     Utility Layer    Storage Layer
                                       │
                                localStorage
```

## 3. Cấu trúc thư mục đề xuất
```text
GroupX_fee.finalexam.t01/
├── index.html                ← Trang danh sách khóa học (Problem 01 + 02)
├── course-detail.html        ← Trang chi tiết khóa học + lesson player (Problem 03)
├── admin.html                ← Trang quản trị CRUD khóa học (Problem 04)
├── style.css                 ← File CSS chung cho toàn dự án
├── app.js                    ← Logic dùng chung: dữ liệu khóa học, utility, localStorage
├── admin.js                  ← Logic cho trang admin: CRUD, tìm kiếm, lọc, phân trang
├── detail.js                 ← Logic cho trang chi tiết: accordion, progress, quiz
├── images/                   ← Tất cả ảnh và icon nội bộ
└── README.txt                ← Danh sách thành viên nhóm
```

## 4. Layered Architecture
```text
┌──────────────────────────────────────────────┐
│              Presentation Layer              │
├──────────────────────────────────────────────┤
│ index.html                                  │
│ course-detail.html                          │
│ admin.html                                  │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│                Page Logic Layer              │
├──────────────────────────────────────────────┤
│ detail.js                                   │
│ admin.js                                    │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│              Shared Logic Layer              │
├──────────────────────────────────────────────┤
│ app.js                                      │
│                                              │
│ • Course Data                               │
│ • Utility Functions                         │
│ • Shared Rendering                          │
│ • localStorage Functions                    │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│             Browser localStorage             │
└──────────────────────────────────────────────┘
```

## 5. Phân công trách nhiệm từng file

### 4.1 index.html
- Hiển thị navbar chung, hero section, tabs danh mục, grid danh sách khóa học
- Kết nối với các chức năng tìm kiếm, lọc và sắp xếp ở phía client
- Tải các file CSS/JS cần thiết

### 4.2 course-detail.html
- Hiển thị thông tin khóa học chi tiết
- Bao gồm banner khóa học, mô tả, accordion curriculum, sidebar thông tin
- Kết nối với logic lesson progress và quiz

### 4.3 admin.html
- Hiển thị giao diện admin panel
- Có navbar, sidebar, bảng quản lý khóa học, modal tạo/sửa/xóa
- Kết nối với các tính năng CRUD, tìm kiếm, lọc, phân trang

### 4.4 style.css
- Chứa tất cả style dùng chung cho toàn hệ thống
- Quản lý layout responsive, navbar, card, modal, badge, progress bar, table
- Không dùng inline style

### 4.5 app.js
- Chứa dữ liệu mẫu ban đầu của khóa học
- Cung cấp các hàm tiện ích dùng chung như:
  - format giá tiền
  - lấy dữ liệu từ localStorage
  - lưu dữ liệu vào localStorage
  - render dữ liệu chung
- Dùng để chia sẻ dữ liệu giữa index và admin nếu cần
- Chứa các module chức năng chính:
  - Data module: courses, categories, sortOptions, statusOptions
  - Utility module: generateId, formatPrice, formatRating, debounce, showToast, hideToast
  - Storage module: loadCourses, saveCourses, loadLessonProgress, saveLessonProgress, loadQuizResults, saveQuizResults
  - Shared rendering: createCourseCard, renderNavbar, renderFooter, renderNoResult

### 4.6 detail.js
- Chịu trách nhiệm cho các tính năng trên page chi tiết:
  - render curriculum
  - xử lý checkbox lesson completed
  - lưu state progress vào localStorage
  - render progress bar
  - hiển thị quiz và tính điểm
  - mở accordion section tiếp theo sau khi pass quiz

### 4.7 admin.js
- Chịu trách nhiệm cho quản trị dữ liệu khóa học:
  - khởi tạo dữ liệu nếu localStorage rỗng
  - render bảng khóa học
  - xử lý tìm kiếm, lọc theo category và status
  - phân trang 5 bản ghi/trang
  - mở modal thêm/sửa khóa học
  - validate form
  - lưu vào localStorage sau mỗi thao tác CRUD
  - hiển thị toast thông báo
- Các hàm chính bao gồm:
  - initAdmin()
  - renderTable()
  - searchCourses()
  - filterCourses()
  - paginate()
  - createCourse()
  - updateCourse()
  - deleteCourse()
  - validateForm()

## 5. Luồng dữ liệu

### 5.1 Home Page
```text
Page Load
↓
Load Courses
↓
Render Cards
```

### 5.2 Search / Category / Sort
```text
Typing
↓
Search Filter
↓
Category Filter
↓
Sort
↓
Render
```

### 5.3 Detail Page
```text
Open Page
↓
Load Course
↓
Load Progress
↓
Render Curriculum
```

### 5.4 Lesson Checkbox
```text
Checkbox Click
↓
Update Progress Array
↓
Save localStorage
↓
Update Progress Bar
```

### 5.5 Quiz Flow
```text
Submit
↓
Calculate Score
↓
Save Result
↓
Show Feedback
↓
Unlock Next Section
```

### 5.6 Admin Page
```text
Load
↓
Read localStorage
↓
Render Table
```

### 5.7 Create / Update / Delete
```text
Open Modal
↓
Validate
↓
Create/Update/Delete Object
↓
Save
↓
Render
↓
Toast
```

### 5.8 Dữ liệu khóa học
- Ban đầu, dữ liệu được hardcode trong app.js dưới dạng array các object khóa học
- Khi người dùng thao tác trên admin, dữ liệu sẽ được cập nhật và lưu lại vào localStorage
- Khi tải lại trang, dữ liệu được đọc từ localStorage nếu tồn tại

### 5.2 Dữ liệu tiến độ học tập
- Mỗi lesson có một lessonId riêng
- Khi checkbox được đánh dấu, lessonId sẽ được thêm vào mảng completedLessonIds
- Trạng thái này được lưu trong localStorage để khôi phục sau khi reload

### 5.3 Dữ liệu quiz
- Quiz được định nghĩa sẵn trong detail.js cho mỗi section
- Kết quả quiz sau khi submit sẽ được lưu vào localStorage để biết section đã pass hay fail

## 6. Mô hình tương tác người dùng

### 6.1 Trang chủ (index.html)
1. Khi tải trang, dữ liệu khóa học được render thành card
2. Người dùng có thể nhập từ khóa vào thanh tìm kiếm
3. Người dùng chọn category tab hoặc sort dropdown
4. UI sẽ re-render lại danh sách theo điều kiện lọc

### 6.2 Trang chi tiết (course-detail.html)
1. Trang load dữ liệu khóa học được chọn
2. Người dùng tick lesson complete
3. Progress bar cập nhật theo số lesson hoàn thành
4. Người dùng làm quiz, submit kết quả và nhận phản hồi

### 6.3 Trang admin (admin.html)
1. Admin mở trang, dữ liệu khóa học được load từ localStorage
2. Admin có thể thêm, sửa hoặc xóa khóa học
3. Mỗi thao tác đều cập nhật lại localStorage và rerender bảng

## 7. Quản lý trạng thái
Do đây là dự án frontend tĩnh, trạng thái được quản lý theo cách đơn giản:
- State cho danh sách khóa học: array trong JS
- State cho filter/search: biến cục bộ trong admin.js và app.js
- State cho lesson progress: array lessonId trong localStorage
- State cho quiz result: object hoặc array lưu trong localStorage

## 8. Giao diện và trải nghiệm người dùng
- Dùng Bootstrap 5 để đảm bảo layout responsive trên desktop, tablet, mobile
- Navbar có thể collapse trên mobile
- Grid card hiển thị 3 cột trên desktop, 2 cột trên tablet, 1 cột trên mobile
- Modal và toast dùng để tương tác thêm/sửa/xóa khóa học

## 9. Lưu ý triển khai
- Tất cả ảnh dùng trong dự án phải nằm trong thư mục images/
- Không dùng inline style hoặc inline onclick
- Mỗi hàm JavaScript cần có comment ngắn mô tả mục đích
- Code cần rõ ràng, dễ đọc và có thể mở trực tiếp bằng browser mà không cần build tool

## 10. Kết luận
Architecture này phù hợp với yêu cầu của đề bài vì:
- Giữ cấu trúc đơn giản, dễ triển khai
- Phân tách rõ ràng giữa các màn hình và logic
- Dễ mở rộng thêm tính năng trong tương lai
- Tuân thủ đúng cấu trúc folder đề xuất trong requirement

# WSV eCommerce API Project

Đây là dự án backend cho một hệ thống thương mại điện tử, được xây dựng bằng Node.js và Express, tuân thủ các thực tiễn tốt nhất về bảo mật, hiệu suất và khả năng mở rộng.

## 1\. Tổng quan & Tiến độ dự án

Dự án hiện đang ở giai đoạn phát triển các tính năng cốt lõi. Các chức năng quan trọng về xác thực người dùng và quản lý sản phẩm đã được hoàn thành, tạo nền tảng vững chắc để phát triển các module phức tạp hơn.

### Các tính năng đã hoàn thành ✔️

  * **Xác thực & Phân quyền (Authentication & Authorization):**
      * Đăng ký (`Sign-up`) cho các Shop mới với cơ chế mã hóa mật khẩu an toàn (Bcrypt).
      * Đăng nhập (`Login`) và tạo cặp Token (Access Token & Refresh Token) sử dụng thuật toán `RS256` mạnh mẽ.
      * Đăng xuất (`Logout`), vô hiệu hóa token của phiên làm việc.
      * Cơ chế làm mới token (`Refresh Token`) để duy trì phiên đăng nhập mà không cần đăng nhập lại.
      * Hệ thống `API Key` và `Permission` để bảo vệ các endpoint quan trọng.
  * **Quản lý Sản phẩm (Product Management):**
      * API tạo sản phẩm mới.
      * Áp dụng **Factory Pattern** để quản lý việc tạo ra các loại sản phẩm khác nhau (ví dụ: `Clothing`, `Electronics`), giúp hệ thống dễ dàng mở rộng trong tương lai.
  * **Cơ sở hạ tầng (Infrastructure):**
      * Cấu trúc dự án rõ ràng theo từng module chức năng.
      * Hệ thống xử lý lỗi tập trung (`errorHandler`).
      * Cấu trúc response trả về cho client được chuẩn hóa (`SuccessResponse`, `ErrorResponse`).
      * Kết nối và quản lý cơ sở dữ liệu MongoDB bằng Mongoose, có theo dõi số lượng kết nối.

### Lộ trình phát triển tiếp theo 🚀

  * Hoàn thiện các API CRUD cho Sản phẩm (Read, Update, Delete).
  * Xây dựng module Giỏ hàng (Cart).
  * Xây dựng module Đặt hàng (Checkout & Order).
  * Xây dựng module Quản lý người dùng/khách hàng.
  * Tích hợp hệ thống thanh toán.
  * Viết Unit Test và Integration Test.

## 2\. Cấu trúc thư mục & Tệp

Dự án được tổ chức theo kiến trúc module, giúp dễ dàng bảo trì và mở rộng.

```
.
├── src
│   ├── auth/               # Chứa logic xác thực và phân quyền (JWT, middleware)
│   │   ├── authUtils.js
│   │   └── checkAuth.js
│   ├── configs/            # Chứa các tệp cấu hình (DB, môi trường)
│   │   └── config.mongodb.js
│   ├── controllers/        # Lớp điều khiển, nhận request và gọi service tương ứng
│   │   ├── access.controller.js
│   │   └── product.controller.js
│   ├── core/               # Các lớp lõi của hệ thống (Error, Success responses)
│   │   ├── error.response.js
│   │   └── success.response.js
│   ├── databases/          # Khởi tạo và quản lý kết nối cơ sở dữ liệu
│   │   └── init.mongodb.js
│   ├── helpers/            # Các hàm tiện ích, hỗ trợ
│   │   ├── asyncHandler.js
│   │   └── check_connect.js
│   ├── middlewares/        # Middleware xử lý lỗi
│   │   └── errorHandler.js
│   ├── models/             # Định nghĩa Schema và Model cho MongoDB
│   │   ├── apikey.model.js
│   │   ├── keytoken.model.js
│   │   ├── product.model.js
│   │   └── shop.model.js
│   ├── routes/             # Định tuyến các endpoint của API
│   │   ├── access/
│   │   ├── apikey/
│   │   ├── product/
│   │   └── index.js        # Router chính, tổng hợp các router con
│   ├── services/           # Chứa business logic của ứng dụng
│   │   ├── access.service.js
│   │   ├── apikey.service.js
│   │   ├── keyToken.service.js
│   │   ├── product.service.js
│   │   └── shop.service.js
│   └── utils/              # Các tiện ích chung khác
│       ├── httpStatusCode.js
│       ├── index.js
│       ├── reasonPhrases.js
│       └── statusCodes.js
├── .gitignore              # Các tệp/thư mục được Git bỏ qua
├── package.json            # Thông tin dự án và các dependencies
├── server.js               # Điểm khởi đầu (entry point) của ứng dụng
└── *.http                  # Các tệp để kiểm thử API (ví dụ: REST Client for VSCode)
```

## 3\. Metadata & Hướng dẫn sử dụng

### Yêu cầu

  * Node.js (v18 trở lên)
  * MongoDB
  * Docker (Tùy chọn, để chạy MongoDB)

### Cài đặt

1.  Clone repository về máy:

    ```bash
    git clone <your-repository-url>
    cd project_nodejs_backend
    ```

2.  Cài đặt các dependencies:

    ```bash
    npm install
    ```

3.  Tạo tệp `.env` ở thư mục gốc và cấu hình các biến môi trường nếu cần (hiện tại đang dùng cấu hình mặc định).

### Chạy ứng dụng

Để khởi động server ở chế độ development (với `nodemon` tự động restart khi có thay đổi):

```bash
npm start
```

Server sẽ chạy tại `http://localhost:3052`.

### Các dependencies chính

  * **express**: Framework chính để xây dựng API.
  * **mongoose**: ODM để tương tác với MongoDB.
  * **bcrypt**: Thư viện mã hóa mật khẩu.
  * **jsonwebtoken**: Thư viện tạo và xác thực JSON Web Tokens.
  * **dotenv**: Quản lý biến môi trường.
  * **helmet, compression, morgan**: Các middleware giúp tăng cường bảo mật và hiệu suất.
  * **nodemon**: Tự động khởi động lại server khi có thay đổi code.

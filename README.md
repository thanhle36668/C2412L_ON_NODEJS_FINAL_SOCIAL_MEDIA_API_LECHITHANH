# Social Media API — Backend NodeJS

Backend API cho ứng dụng mạng xã hội cơ bản.
Stack: Node.js + Express + MySQL + Sequelize + JWT.

## 1. Yêu cầu môi trường

- Node.js >= 18
- Laragon (dùng làm server MySQL)
- MySQL Workbench (để tạo database và import dữ liệu)
- Git

## 2. Clone project từ GitHub

```bash
git clone https://github.com/thanhle36668/C2412L_ON_NODEJS_FINAL_SOCIAL_MEDIA_API_LECHITHANH.git
cd C2412L_ON_NODEJS_FINAL_SOCIAL_MEDIA_API_LECHITHANH
```

## 3. Cài dependencies

```bash
npm install
```

## 4. Bật MySQL bằng Laragon

1. Mở Laragon.
2. Nhấn **Start All** (hoặc Start MySQL) để bật MySQL.
3. Mặc định MySQL chạy ở `localhost:3306`.

## 5. Tạo database và import dữ liệu

File `database.sql` nằm ở thư mục gốc của project. File này đã chứa lệnh `CREATE DATABASE social_db_final` + tạo 3 bảng `user`, `post`, `comment`, nên bạn chỉ cần chạy nó **1 lần duy nhất**. Chọn 1 trong 2 cách dưới đây:

### Cách A: Dùng MySQL Workbench (khuyên dùng cho người mới)

1. Mở Laragon -> nhấn **Start All** để MySQL chạy ở `localhost:3306`.
2. Mở MySQL Workbench -> ở màn hình chính, nhấn dấu `+` cạnh **MySQL Connections** để tạo kết nối mới với thông tin:
   - Connection Name: `Laragon` (đặt tùy ý)
   - Hostname: `127.0.0.1`, Port: `3306`
   - Username: `root`, Password: để trống (mặc định của Laragon) — nếu bạn đã đặt password cho root thì nhấn **Store in Vault** để nhập.
   - Nhấn **Test Connection** -> báo thành công -> **OK**.
3. Double-click vào connection `Laragon` vừa tạo để vào màn hình query.
4. Trên thanh menu chọn **File > Open SQL Script...** -> trỏ tới file `database.sql` trong thư mục project (ví dụ `C:\...\NODEJS_FINAL_CLONE\database.sql`) -> **Open**.
5. Nhấn biểu tượng **tia sét** trên thanh toolbar (hoặc phím `Ctrl + Shift + Enter`) để **Execute** toàn bộ script.
6. Kiểm tra kết quả: ở panel bên trái mục **Schemas**, nhấn nút **Refresh** (biểu tượng 2 mũi tên xoay) -> thấy xuất hiện database `social_db_final` -> mở rộng ra thấy 3 bảng `user`, `post`, `comment` là thành công.
   - Có thể chạy thêm lệnh kiểm tra: `SHOW DATABASES; USE social_db_final; SHOW TABLES;`

### Cách B: Dùng dòng lệnh (nhanh, không cần Workbench)

Mở terminal **tại thư mục gốc của project** (nơi có file `database.sql`):

```bash
# Nếu user root KHÔNG có password (mặc định Laragon):
mysql -u root -h localhost -P 3306 < database.sql

# Nếu user root CÓ password:
mysql -u root -p -h localhost -P 3306 < database.sql
```

Kiểm tra import thành công:

```bash
mysql -u root -e "SHOW DATABASES; USE social_db_final; SHOW TABLES;"
# Kết quả mong đợi: thấy database social_db_final và 3 bảng user, post, comment
```

> Lỗi hay gặp: `ERROR 1007 (HY000): Can't create database 'social_db_final'; database exists` nghĩa là bạn đã import rồi, bỏ qua và làm tiếp bước 6.

## 6. Cấu hình file .env

Copy file mẫu ra file `.env`:

```bash
# Windows
copy .env.example .env
```

Mở file `.env` và sửa lại cho khớp với MySQL trên máy của bạn (Laragon):

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=social_db_final
DB_USER=root
DB_PASSWORD=

JWT_ACCESS_SECRET=your_secret_here
JWT_ACCESS_EXPIRES=7d

BCRYPT_SALT_ROUNDS=10
```

> Lưu ý: nếu MySQL trong Laragon của bạn có password cho user `root`, hãy điền vào `DB_PASSWORD`.

### Cách tạo `JWT_ACCESS_SECRET` (bắt buộc đổi, không để `your_secret_here`)

`JWT_ACCESS_SECRET` là chuỗi ngẫu nhiên dùng để ký token đăng nhập. Mỗi máy nên tự tạo một chuỗi riêng, dài tối thiểu 32 ký tự.

1. Mở terminal (PowerShell / CMD / Git Bash) ở bất kỳ đâu (máy đã cài Node.js >= 18 là chạy được).
2. Chạy 1 trong 2 lệnh sau để sinh chuỗi ngẫu nhiên 64 bytes (128 ký tự hex):

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

3. Terminal sẽ in ra một chuỗi dạng:

```text
a3f9c1e7b2d84f60c5e91a7d33b0f6e8c2d4a5b6e7f8091a2b3c4d5e6f70819a0b1c2d3e4f5061728394a5b6c7d8e9f0a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2
```

4. Copy toàn bộ chuỗi đó, dán vào file `.env`:

```env
JWT_ACCESS_SECRET=a3f9c1e7b2d84f60c5e91a7d33b0f6e8c2d4a5b6e7f8091a2b3c4d5e6f70819a0b1c2d3e4f5061728394a5b6c7d8e9f0a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2
```

> Không dùng lại chuỗi ví dụ ở trên. Mỗi người tự chạy lệnh để tạo chuỗi của riêng mình. Nếu lộ secret thì chỉ cần chạy lại lệnh để tạo chuỗi mới là toàn bộ token cũ sẽ hết hiệu lực.

## 7. Chạy project

```bash
npm run dev
```

Khi chạy thành công sẽ thấy:

```text
Kết nối thành công....
App is running in port 3000
```

Mở trình duyệt truy cập để kiểm tra server:

```text
GET http://localhost:3000/health
```

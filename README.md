# Technical Test Fullstack - Talenavi

Repositori ini berisi hasil pengerjaan Technical Test untuk posisi Fullstack Developer Internship di PT Dynamic Talenta Navigator (Talenavi). Proyek ini terdiri dari dua bagian utama: **Frontend** (Slicing UI Login Page) dan **Backend** (REST API Todo List & Export Excel).

## Tech Stack
- **Backend:** Laravel 12, Laravel Excel (maatwebsite/excel), MySQL
- **Frontend:** React.js (Vite), Tailwind CSS
- **Tools:** Postman, Git

---

## Cara Menjalankan Proyek (Local)
  
### Prasyarat Penting
Pastikan ekstensi PHP **`zip`** dan **`gd`** sudah aktif di `php.ini` Anda. Kedua ekstensi ini wajib aktif agar fitur *export* Excel dari `maatwebsite/excel` dapat berjalan.

### 1. Menjalankan Backend (Laravel)
Buka terminal dan masuk ke folder backend:
```
cd backend
composer install
```

Salin file environment dan generate key:
```
cp .env.example .env
php artisan key:generate
```

Buka file **`.env`**, sesuaikan konfigurasi database (buat database baru di MySQL/phpMyAdmin terlebih dahulu):
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database_anda
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan migrasi database dan nyalakan server:
```
php artisan migrate
php artisan serve
```
Server backend akan berjalan di **`http://127.0.0.1:8000.`**

### 2. Menjalankan Frontend (React.js)
Buka terminal dan masuk ke folder frontend:
```
cd frontend
npm install
npm run dev
```
Buka **`http://localhost:5173 di browser Anda.`**

---

## Dokumentasi API (Backend)

### 1. Create Todo
- Method: POST
- URL: /api/todos
- Headers: Accept: application/json
- Body Request (JSON):
  - title (string, required)
  - assignee (string, optional)
  - due_date (date, required, tidak boleh masa lalu)
  - time_tracked (numeric, optional, min 0, default 0)
  - status (enum: pending, open, in_progress, completed, optional, default pending)
  - priority (enum: low, medium, high, required)
- Response: 201 Created (Mengembalikan objek Todo yang baru dibuat).

### 2. Export Todo List to Excel
- Method: GET
- URL: /api/todos/export
- Query Parameters (Opsional, bisa digabung):
  - **`title`** : Pencarian parsial (contoh: ?title=Belajar)
  - **`assignee`** : Multi-value dipisah koma (contoh: ?assignee=John,Doe)
  - **`status`** : Multi-value dipisah koma (contoh: ?status=pending,in_progress)
  - **`priority`** : Multi-value dipisah koma (contoh: ?priority=low,high)
  - **`start`** & **`end`** : Rentang tanggal due_date (format YYYY-MM-DD)
  - **`min`** & **`max`** : Rentang time_tracked
- Response: File **`.xlsx`** yang berisi data terfilter dan baris ringkasan (summary row) di bagian bawah (Total Todos & Total Time Tracked).

---

## Postman Collection
Semua request API di atas dapat diuji menggunakan Postman Collection yang sudah disediakan:
- File Collection: **`postman/Talenavi_Todo_API.postman_collection.json`**

## Fitur Frontend (Login Page)
- Responsif:
  - Desktop (≥ 1024px): Layout dua kolom (Banner di kiri, Form di kanan).
  - Mobile (< 1024px): Form di tengah dengan Banner sebagai background penuh dan overlay gelap.
- Validasi Form:
  - Email wajib diisi dan harus berformat valid.
  - Password wajib diisi minimal 6 karakter.
  - Menampilkan pesan error sederhana jika validasi gagal.
- LocalStorage: Jika validasi berhasil, data email dan loginAt disimpan ke localStorage, lalu menampilkan alert("Login berhasil!").
---

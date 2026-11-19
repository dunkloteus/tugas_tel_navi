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
```bash
cd backend
composer install
```

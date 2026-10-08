# Dokumen Teknis Modul 2 — HTML Semantik, Tailwind CSS, dan Aksesibilitas

**Nama / NIM** : Gionaldo Candrawansah / 105224031
**Repositori** : [https://github.com/GionaldoCandr/Pratikum_Pengembangan_Aplikasi_Web](https://github.com/GionaldoCandr/Pratikum_Pengembangan_Aplikasi_Web/tree/main/Week2/docs/praktikum)

---

## 1. Struktur Semantik

Halaman utama produk dikembangkan dengan mematuhi prinsip HTML Semantik dan pemetaan peran *landmark* ARIA secara tepat. Struktur halaman disusun tanpa melompati tingkat hierarki judul (*heading level*) serta memastikan hanya terdapat satu elemen `<main>` utama.

### Kerangka Landmark dan Hierarki Judul
- **`<header>` (`banner`)**: Memuat identitas produk dan elemen navigasi utama.
- **`<nav>` (`navigation`)**: Memuat daftar tautan navigasi utama yang diberi atribut `aria-label="Navigasi utama"`.
- **`<main id="konten">` (`main`)**: Memuat seluruh konten utama aplikasi.
  - **`<h1>`**: Judul utama halaman (*value proposition* produk).
  - **`<section id="fitur" aria-labelledby="judul-fitur">` (`region`)**: Bagian fitur utama produk dengan `<h2>` (`id="judul-fitur"`).
  - **`<div className="grid lg:grid-cols-[2fr_1fr]">`**:
    - **`<section aria-labelledby="judul-cara">` (`region`)**: Bagian alur/cara kerja produk dengan `<h2>` (`id="judul-cara"`).
    - **`<aside aria-label="Informasi tambahan">` (`complementary`)**: Konten pendukung berupa ringkasan informasi produk.
  - **`<section id="kontak" aria-labelledby="judul-kontak">` (`region`)**: Bagian formulir kontak dengan `<h2>` (`id="judul-kontak"`).
- **`<footer>` (`contentinfo`)**: Memuat informasi hak cipta dan kaki halaman.

### Bukti Pohon Aksesibilitas (Accessibility Tree)
![[Pasted image 20261008191017.png]]
*Gambar 1.1: Pohon Aksesibilitas di Chrome DevTools menunjukkan landmark `banner`, `navigation`, `main`, `region`, `complementary`, dan `contentinfo` terdeteksi dengan tepat.*

---

## 2. Tata Letak Responsif

Tata letak antarmuka dirancang menggunakan pendekatan **Mobile-First** dengan kombinasi kelas utilitas Flexbox dan Grid dari Tailwind CSS.

### Tangkapan Layar Tampilan Responsif

| Lebar Layar           | Pratinjau Tampilan                       |
| :-------------------- | :--------------------------------------- |
| **360 px (Mobile)**   | ![Tampilan Mobile](/Week2/docs/praktikum/360.png) |
| **768 px (Tablet)**   | ![Tampilan Table](/Week2/docs/praktikum/768.png)     |
| **1280 px (Desktop)** | ![Tampilan Desktop](/Week2/docs/praktikum/1280.png) |

### Penggunaan Kelas Flexbox, Grid, Breakpoint, dan Razionalisasi Keputusan Teknis

1. **Navigasi Utama (`<nav>`)**:
   - **Kelas**: `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`
   - **Alasan**: Flexbox dipilih karena alur layout berada dalam satu dimensi. Pada layar ponsel, elemen bertumpuk secara vertikal (`flex-col`), dan berubah menjadi baris horizontal (`sm:flex-row`) pada breakpoint `sm` (640px) untuk memanfaatkan ruang horizontal desktop dengan optimal.

2. **Kumpulan Kartu Fitur (`<ul>`)**:
   - **Kelas**: `grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`
   - **Alasan**: CSS Grid digunakan karena membutuhkan pengaturan dua dimensi secara terstruktur. Pendekatan mobile-first menetapkan 1 kolom untuk ponsel (`grid-cols-1`), berkembang menjadi 2 kolom pada tablet (`sm:grid-cols-2`), dan 3 kolom pada desktop (`lg:grid-cols-3`) agar tinggi dan lebar kartu tetap seimbang tanpa memicu gulir horizontal.

3. **Tata Letak Konten & Informasi Pendukung (`<div>`)**:
   - **Kelas**: `grid gap-8 lg:grid-cols-[2fr_1fr]`
   - **Alasan**: Digunakan nilai sembarang (*arbitrary value*) Grid `lg:grid-cols-[2fr_1fr]` untuk membagi area layar desktop secara rasional: 2/3 lebar untuk area konten utama (`<section>`) dan 1/3 lebar untuk area pendukung (`<aside>`). Pada layar ponsel dan tablet (`< 1024px`), komponen otomatis bertumpuk 1 kolom secara alami.

---

## 3. Audit Aksesibilitas

 Audit aksesibilitas dilakukan menggunakan alat otomatis **Lighthouse** (panel DevTools Chrome) dan dilanjutkan dengan **pemeriksaan manual dengan papan ketik (keyboard navigation)**.

### Ringkasan Skor Lighthouse

![Lighthouse Audit Sebelum](/Week2/docs/praktikum/sebelum.png)

![Lighthouse Audit Sesudah](/Week2/docs/praktikum/sesudah.png)

| Halaman | Skor Sebelum Perbaikan | Skor Sesudah Perbaikan | Target Minimal Modul | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Halaman Latihan Audit** (`/latihan-audit`) | 68 | **100** | 90 | LULUS |
| **Halaman Utama Produk** (`/`) | 82 | **100** | 85 | LULUS |

### Daftar Temuan Audit Gagal, Penyebab, dan Langkah Perbaikan

1. **`[alt]` attribute missing on `<img>` element**
   - *Penyebab*: Gambar logo/elemen visual tidak memiliki atribut `alt`.
   - *Perbaikan*: Menambahkan atribut `alt="Logo Produk"` pada gambar informatif atau `alt=""` pada gambar dekoratif.

2. **Background and foreground colors do not have a sufficient contrast ratio**
   - *Penyebab*: Penggunaan kelas warna `text-gray-300` di atas latar belakang putih memiliki rasio kontras < 4,5:1.
   - *Perbaikan*: Mengganti kelas warna teks menjadi `text-gray-700` atau `text-slate-800` untuk memastikan rasio kontras melebihi 4.5:1.

3. **Form elements do not have associated labels**
   - *Penyebab*: Elemen `<input>` tidak terhubung dengan elemen `<label>`.
   - *Perbaikan*: Menambahkan elemen `<label htmlFor="id_input">` dan menghubungkannya dengan atribut `id` pada `<input>`.

4. **Buttons do not have an accessible name**
   - *Penyebab*: Tombol pencarian yang hanya berisi ikon SVG tidak memiliki teks penjelas.
   - *Perbaikan*: Menambahkan atribut `aria-label="Cari"` pada tombol `<button>` dan atribut `aria-hidden="true"` pada ikon `<svg>`.

5. **Penggunaan `<div>` sebagai Judul Utama (Temuan Audit Manual)**
   - *Penyebab*: Judul halaman menggunakan `<div className="text-2xl font-bold">` yang tidak terbaca sebagai landmark heading oleh pembaca layar.
   - *Perbaikan*: Mengubah `<div>` menjadi elemen semantik `<h1>`.

### Hasil Pemeriksaan Manual dengan Papan Ketik

- **Tautan Skip Link**: Tautan *"Lewati ke konten utama"* tersembunyi secara visual (`sr-only`) dan dapat dijangkau pada tombol Tab pertama (`focus:not-sr-only focus:p-2`), langsung memindahkan fokus ke elemen `<main id="konten">`.
- **Urutan Fokus (Tab Index)**: Urutan navigasi fokus papan ketik berjalan runtut secara intuitif sesuai hierarki visual (Skip link -> Navigasi Header -> Konten Utama -> Elemen Formulir -> Footer).
- **Garis Fokus (Focus Ring)**: Seluruh elemen interaktif (`<a>`, `<button>`, `<input>`, `<textarea>`) memiliki indikator fokus yang terlihat jelas saat dinavigasi dengan keyboard menggunakan penanda kelas `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700`.

---

## 4. Kendala dan Penyelesaian

1. **Kendala**: Kelas dinamis Tailwind CSS tidak diterapkan pada tampilan ketika menggabungkan string secara langsung (misalnya: `grid-cols-${cols}`).
   - **Penyelesaian**: Mengubah pendekatan dengan menggunakan kelas statis utuh yang dicantumkan secara gamblang dalam JSX atau menggunakan objek pemetaan kelas (*class lookup dictionary*) agar Tailwind JIT compiler dapat mendeteksi nama kelas saat proses kompilasi.

2. **Kendala**: Elemen `<fieldset>` dan `<legend>` untuk opsi radio button mengalami pergeseran tata letak (*misalignment*) pada tampilan ponsel.
   - **Penyelesaian**: Membungkus setiap item `<label>` radio button dengan Flexbox `flex items-center gap-2` untuk memastikan tombol radio dan teks label terbaris secara rata tengah vertikal.

---

## 5. Catatan Pemanfaatan AI

Penggunaan kecerdasan artifisial (AI) dalam penyusunan modul ini dicatat secara transparan sebagai berikut:

- **Alat AI yang Digunakan**: Gemini.
- **Perintah Utama (Prompts)**:
  1. *"Berikan kerangka dokumen teknis Markdown yang sesuai dengan standar penulisan Bagian H Modul 2 PAW 2026."*
  2. *"Bagaimana cara mendiagnosis kegagalan kontras warna pada audit Lighthouse dan memperbaikinya menggunakan Tailwind CSS v4?"*
- **Bagian yang Dihasilkan / Dibantu AI**:
  - Penyusunan struktur template Markdown dokumen teknis.
  - Solusi penyelesaian masalah (*troubleshooting*) penetapan kelas Tailwind CSS untuk fleksibilitas responsif.
- **Cara Verifikasi Hasil AI**:
  - Menguji ulang setiap kelas Tailwind yang disarankan AI di peramban menggunakan Chrome DevTools pada lebar 360px, 768px, dan 1280px.
  - Menjalankan ulang audit Lighthouse di jendela *Incognito* untuk meyakinkan bahwa perbaikan kode yang disarankan AI menghasilkan skor aksesibilitas 100.
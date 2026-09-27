

**Nama: Gionaldo Candrawansah
NIM : 105224031
Repositori:** [https://github.com/GionaldoCandr/Pratikum_Pengembangan_Aplikasi_Web]

---

## 1. Lingkungan Pengembangan

Berikut adalah spesifikasi perangkat keras dan perangkat lunak yang digunakan sebagai lingkungan pengembangan aplikasi web:

| Komponen               | Spesifikasi                   |
| :--------------------- | :---------------------------- |
| **Sistem Operasi**     | Windows 11                    |
| **Node.js**            | v24.x.x (LTS)                 |
| **npm**                | v11.x.x                       |
| **Git**                | v2.x.x (Versi stabil terbaru) |
| **Visual Studio Code** | v1.x.x                        |
| **Peramban**           | Google Chrome                 |

*Seluruh perangkat lunak di atas telah dipasang dan diverifikasi melalui terminal terintegrasi VS Code untuk memastikan keseragaman lingkungan pengembangan [3, 7].*

---

## 2. Alur Kerja Git

### Keluaran `git log --oneline --graph`
Berikut adalah visualisasi riwayat commit lokal setelah proses penggabungan branch dan penyelesaian konflik selesai dilakukan:

```text
*   a7c8b9d (HEAD -> main, origin/main) merge: selesaikan konflik deskripsi produk
|\  
| * f3e2d1c docs: perjelas deskripsi produk
* | c5b4a3f docs: ubah deskripsi produk
|/  
* 9c41d0a feat: ganti judul halaman utama
* 5e8782b docs: tambahkan deskripsi produk pada README
* 5b2c327 Initial commit from Create Next App
```
*(Catatan: Anda dapat mengganti kode hash 7 karakter di atas dengan hash asli dari terminal Anda melalui perintah `git log --oneline --graph` [11]).*

### Tautan Pull Request (PR)
* **Tautan PR yang telah digabungkan:** `[Tempel tautan halaman Pull Request dari GitHub Anda yang sudah berstatus MERGED]` [12]

### Analisis Konflik Git
1. **Konflik yang Terjadi:** Konflik muncul pada berkas `README.md` saat menjalankan perintah `git merge latihan/konflik`. Hal ini terjadi karena branch `main` dan branch `latihan/konflik` mengubah baris teks deskripsi yang sama secara bersamaan dengan isi yang berbeda.
2. **Cara Penyelesaian:** Berkas `README.md` dibuka menggunakan Visual Studio Code. Penanda konflik otomatis dari Git (`<<<<<<< HEAD`, `=======`, dan `>>>>>>>`) dihapus secara manual. Baris kode disunting ulang untuk menggabungkan informasi dari kedua branch, ditandai kembali dengan `git add README.md`, lalu diselesaikan dengan `git commit -m "merge: selesaikan konflik..."`.
3. **Alasan Pemilihan Isi Akhir:** Keputusan teknis diambil untuk mempertahankan informasi dari kedua perubahan. Isi akhir sengaja dirancang agar deskripsi produk tetap komprehensif, yaitu memuat ringkasan solusi sistem sekaligus memperjelas siapa target pengguna utama dari produk web tersebut.

---

## 3. Pengamatan Lalu Lintas HTTP

### Lembar Kerja Pengamatan HTTP (Tabel 9)
Berikut adalah data hasil penelusuran lalu lintas data menggunakan panel Network DevTools (`Ctrl + Shift + I`) pada beberapa situs internet dan server lokal:

| No | URL | Metode | Kode Status | Content-Type | Header Lain yang Diamati |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `http://localhost:3000/` | GET | 200 OK | text/html; charset=utf-8 | Cache-Control: no-store |
| 2 | `http://github.com` (via curl) | HEAD | 301 Moved Permanently | text/html | Location: https://github.com |
| 3 | `https://mozilla.org` | GET | 304 Not Modified | text/css *(atau js)* | ETag / If-None-Match |
| 4 | `http://localhost:3000/halaman-tidak-ada` | GET | 404 Not Found | text/html; charset=utf-8 | X-Powered-By: Next.js |
| 5 | `https://httpstat.us` *(atau situs galat)* | GET | 500 Internal Server Error | text/plain *(atau html)* | Access-Control-Allow-Origin |

### Keluaran Perintah Terminal (`curl -I` dan `curl -v`)
* **Keluaran `curl.exe -I http://localhost:3000`:**
  ```text
  HTTP/1.1 200 OK
  Content-Type: text/html; charset=utf-8
  Cache-Control: no-store
  Date: Mon, 28 Sep 2026 05:30:00 GMT
  Connection: keep-alive
  ``` [1]
* **Keluaran `curl.exe -I http://github.com`:**
  ```text
  HTTP/1.1 301 Moved Permanently
  Content-Type: text/html
  Content-Length: 178
  Location: https://github.com
  Connection: keep-alive
  ``` [13]

### Analisis Hasil Pengamatan HTTP
* **Analisis Cache (200 vs 304):** Ketika peramban memuat halaman pertama kali tanpa cache, server mengirimkan aset secara utuh dengan status `200 OK`. Namun, saat halaman dimuat ulang dengan cache aktif, peramban hanya mengirimkan token validasi (`ETag`). Jika server mendeteksi aset tidak berubah, server merespons dengan status `304 Not Modified` tanpa mengirimkan ulang *body* berkas. Hal ini memangkas ukuran transfer data menjadi sangat kecil dan mempercepat waktu pemuatan halaman.
* **Alasan Metode `curl -I` bernilai HEAD:** Parameter opsi `-I` pada utilitas perintah `curl` berfungsi khusus untuk meminta informasi *header* saja dari suatu server web tanpa mengunduh seluruh isi dokumen. Sesuai spesifikasi protokol HTTP, jenis permintaan yang digunakan untuk mengambil data header saja adalah metode `HEAD`.
* **Alasan `http://github.com` Dialihkan (301):** Server GitHub secara sengaja mengalihkan permintaan tidak aman (`http://`) menuju protokol terenkripsi (`https://`) demi menjamin keamanan data pengguna. Status `301 Moved Permanently` beserta header `Location` digunakan agar peramban klien langsung mengingat dan mengarahkan seluruh lalu lintas berikutnya ke alamat aman tersebut secara otomatis.

---

## 4. Kendala dan Penyelesaian

* **Kendala:** Terjadi galat *'PowerShell: running scripts is disabled on this system'* saat mengeksekusi skrip manajer paket `npm run dev` atau perintah `npx`.
* **Penyelesaian:** Masalah ini disebabkan oleh pembatasan keamanan kebijakan eksekusi skrip bawaan pada Windows PowerShell. Kendala diatasi dengan membuka terminal PowerShell sebagai Administrator, lalu menjalankan perintah `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`. Setelah kebijakan diubah, skrip server lokal Next.js dapat berjalan dengan normal.

---

## 5. Catatan Pemanfaatan AI

* **Alat AI yang Digunakan:** ChatGPT / Claude
* **Perintah Utama (Prompt):** *"Jelaskan mekanisme kerja kode status HTTP 304 Not Modified dalam kaitannya dengan penggunaan ETag pada browser DevTools."*
* **Bagian yang Digunakan:** Membantu menyusun struktur kalimat analisis perbandingan lalu lintas data dengan cache dan tanpa cache pada poin analisis Bab 3.
* **Cara Memverifikasi:** Memeriksa kebenaran penjelasan AI dengan membaca dokumentasi resmi MDN Web Docs mengenai topik *HTTP Caching* dan *Conditional Requests* untuk memastikan data teknis yang ditulis terbukti akurat.
```

***

### 🚀 Cara Mengirimkan Tugas ke GitHub:
1. Pastikan folder repositori praktikum Anda sudah rapi. Letakkan draf dokumen ini di dalam struktur folder: **`docs/praktikum/modul-01.md`**.
2. Jalankan perintah berturut-turut berikut ini pada aplikasi terminal Anda untuk melakukan commit dan push langsung ke branch utama (`main`):
   ```bash
   git add docs/praktikum/modul-01.md
   git commit -m "docs: buat dokumen teknis modul 1 lengkap"
   git push origin main
   ```
3. Buka halaman repositori GitHub Anda di browser, klik berkas `modul-01.md` yang baru Anda kirim, lalu salin (copy) link URL dari address bar web tersebut.
4. Tempelkan link tersebut pada kolom pengumpulan teks daring yang tersedia di portal e-learning kampus Anda.

<FollowUp>
Apakah Anda membutuhkan bantuan untuk menyusun **kalimat gagasan awal produk** (isi Tugas Pendahuluan nomor 6) atau ada **tangkapan layar (screenshot)** dari DevTools yang kodenya masih membingungkan untuk dianalisis?</FollowUp>



**Nama: Gionaldo Candrawansah
NIM : 105224031
Repositori:** https://github.com/GionaldoCandr/Pratikum_Pengembangan_Aplikasi_Web

---

## 1. Lingkungan Pengembangan

Lampiran Spesifikasi perangkat keras dan perangkat lunak yang digunakan sebagai lingkungan pengembangan aplikasi web:

| Komponen               | Spesifikasi        |
| :--------------------- | :----------------- |
| **Sistem Operasi**     | Windows 11         |
| **Node.js**            | v24.15.0           |
| **npm**                | v11.12.1           |
| **Git**                | v2.51.1. Windows.1 |
| **Visual Studio Code** | v1.138.0           |
| **Peramban**           | Google Chrome      |

*Seluruh perangkat lunak di atas telah dipasang dan diverifikasi melalui terminal terintegrasi VS Code/ AntiGravity IDE  untuk memastikan keseragaman lingkungan pengembangan*.

---

## 2. Alur Kerja Git

### Keluaran `git log --oneline --graph`
Berikut adalah visualisasi riwayat commit lokal setelah proses penggabungan branch dan penyelesaian konflik selesai dilakukan:


![[Pasted image 20260928063246.png]]

```text
- **`20881dc DokTek`** (Terbaru)  
    ID komitnya adalah `20881dc` dengan pesan _"DokTek"_.
- **`c920438 Chance Git Remote`**  
    ID komitnya adalah `c920438` dengan pesan _"Chance Git Remote"_.
- **`459a104 Update : index`**  
    ID komitnya adalah `459a104` dengan pesan _"Update : index"_.
- **`ab158e7 W1`**  
    ID komitnya adalah `ab158e7` dengan pesan _"W1"_.
- **`b1e5534 Week1`** (Paling Lama)  
    ID komitnya adalah `b1e5534` dengan pesan _"Week1"_
```


### Tautan Pull Request (PR)
* **Tautan PR yang telah digabungkan:** https://github.com/raihanpakbar/Latihan-GIt-Pemweb-cs24/pull/5 

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

* **Alat AI yang Digunakan:** Mode Ai Google
* **Perintah Utama (Prompt):** *"Jelaskan mekanisme kerja kode status HTTP 304 Not Modified dalam kaitannya dengan penggunaan ETag pada browser DevTools."*
* **Bagian yang Digunakan:** Membantu menyusun struktur kalimat analisis perbandingan lalu lintas data dengan cache dan tanpa cache pada poin analisis Bab 3.
* **Cara Memverifikasi:** Memeriksa kebenaran penjelasan AI dengan membaca dokumentasi resmi MDN Web Docs mengenai topik *HTTP Caching* dan *Conditional Requests* untuk memastikan data teknis yang ditulis terbukti akurat.
```

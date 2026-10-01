import Link from "next/link";

// Contoh data fitur untuk dipetakan ke Grid dua dimensi
const daftarFitur = [
  { id: 1, judul: "Fitur Unggulan 1", deskripsi: "Manfaat konkret fitur pertama untuk menyelesaikan masalah pengguna." },
  { id: 2, judul: "Fitur Unggulan 2", deskripsi: "Manfaat konkret fitur kedua untuk meningkatkan efisiensi pengguna." },
  { id: 3, judul: "Fitur Unggulan 3", deskripsi: "Manfaat konkret fitur ketiga yang membedakan dari kompetitor." },
];

export default function Beranda() {
  const kelasKolomIsian = 
    "rounded border px-3 py-2 focus-visible:outline-2 " +
    "focus-visible:outline-offset-2 focus-visible:outline-blue-700";

  return (
    <>
      {/* Aksesibilitas: Tautan jalan pintas untuk pengguna papan ketik */}
      <a href="#konten-utama" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-blue-700 focus:p-3 focus:font-semibold focus:text-white">
        Lewati ke konten utama
      </a>

      {/* LANDMARK: BANNER (Kepala Halaman) */}
      <header className="border-b bg-white">
        {/* LANDMARK: NAVIGATION (Navigasi Utama) */}
        <nav aria-label="Navigasi utama" className="mx-auto flex max-w-6xl flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            NamaProdukGionaldoZex
          </Link>
          <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6 font-medium text-gray-700">
            <li><a href="#fitur" className="hover:text-blue-700">Fitur</a></li>
            <li><a href="#cara-kerja" className="hover:text-blue-700">Cara Kerja</a></li>
            <li><a href="#kontak" className="hover:text-blue-700">Hubungi Kami</a></li>
          </ul>
        </nav>
      </header>

      {/* LANDMARK: MAIN (Konten Utama - Hanya boleh ada satu per halaman) */}
      <main id="konten-utama" className="mx-auto max-w-6xl p-4 space-y-16">
        
        {/* SECTION 1: HERO (Nilai Utama Produk) */}
        <section aria-labelledby="judul-hero" className="py-12 text-center sm:text-left">
          {/* H1: Judul utama tertinggi, wajib urut dan tidak boleh melompat */}
          <h1 id="judul-hero" className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
            Solusi Digital Terbaik untuk Mengakselerasi Bisnis Anda
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Ini deskripi singkat saja.
          </p>
          <div className="mt-6">
            <a href="#kontak" className="inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
              Mulai Sekarang
            </a>
          </div>
        </section>

        {/* SECTION 2: FITUR UTAMA (Grid Multi-kolom Responsif) */}
        <section id="fitur" aria-labelledby="judul-fitur">
          <h2 id="judul-fitur" className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Fitur Unggulan Produk
          </h2>
          {/* Pendekatan Mobile-First: 1 kolom di ponsel, 2 di tablet, 3 di desktop */}
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {daftarFitur.map((fitur) => (
              <li key={fitur.id}>
                {/* Komponen independen yang semantik menggunakan <article> */}
                <article className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900">{fitur.judul}</h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">{fitur.deskripsi}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* LAYOUT DUA KOLOM: KONTEN UTAMA DAN INFORMASI PENDUKUNG */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          
          {/* SECTION 3: CARA KERJA */}
          <section id="cara-kerja" aria-labelledby="judul-cara">
            <h2 id="judul-cara" className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Bagaimana Cara Kerjanya?
            </h2>
            <ol className="mt-4 space-y-4 list-decimal list-inside text-gray-700">
              <li><strong>Daftar Akun:</strong> Buat akun produk Anda dalam hitungan menit secara gratis.</li>
              <li><strong>Integrasi Data:</strong> Hubungkan sistem operasional lama Anda dengan mudah.</li>
              <li><strong>Pantau Hasil:</strong> Lihat peningkatan performa secara real-time melalui dasbor.</li>
            </ol>
          </section>

          {/* LANDMARK: ASIDE (Informasi Pendukung/Komplementer) */}
          <aside aria-label="Informasi tambahan pengumuman" className="rounded-xl bg-gray-50 p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Mengingat Ulang</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Bergabunglah bersama lebih dari 10.000+ pelaku industri yang telah mempercayakan transformasi digital mereka pada produk kami.
            </p>
          </aside>
        </div>

        {/* SECTION 4: FORMULIR KONTAK (Aksesibilitas Penuh) */}
        <section id="kontak" aria-labelledby="judul-kontak" className="max-w-xl">
          <h2 id="judul-kontak" className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Hubungi Kami
          </h2>
          <p className="mt-1 text-sm text-gray-600">Punya pertanyaan? Tim kami siap membantu Anda kapan saja.</p>
          
          <form className="mt-6 grid gap-4">
            {/* Input Nama */}
            <div className="flex flex-col gap-1">
              <label htmlFor="nama" className="text-sm font-medium text-gray-800">Nama Lengkap</label>
              <input id="nama" name="nama" type="text" required autoComplete="name" className={kelasKolomIsian} />
            </div>

            {/* Input Email dengan Teks Petunjuk Aksesibel */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-800">Alamat Surel (Email)</label>
              <input id="email" name="email" type="email" required autoComplete="email" aria-describedby="email-bantuan" className={kelasKolomIsian} />
              <p id="email-bantuan" className="text-xs text-gray-500">
                Gunakan alamat surel aktif perusahaan Anda.
              </p>
            </div>

            {/* Pilihan Radio dengan Fieldset dan Legend */}
            <fieldset className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
              <legend className="px-2 text-sm font-medium text-gray-800">Kategori Kebutuhan</legend>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" name="peran" value="pengguna" className="h-4 w-4 text-blue-700" /> Layanan Personal
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" name="peran" value="mitra" className="h-4 w-4 text-blue-700" /> Kemitraan Bisnis
              </label>
            </fieldset>

            {/* Input Pesan */}
            <div className="flex flex-col gap-1">
              <label htmlFor="pesan" className="text-sm font-medium text-gray-800">Pesan Anda</label>
              <textarea id="pesan" name="pesan" rows={4} required className={kelasKolomIsian} />
            </div>

            {/* Tombol Kirim Form */}
            <button type="submit" className={kelasKolomIsian + " bg-blue-700 font-semibold text-white hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"}>
              Kirim Pesan
            </button>
          </form>
        </section>

      </main>

      {/* LANDMARK: FOOTER (Informasi Kaki Halaman) */}
      <footer className="mt-20 border-t bg-gray-50 border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500 sm:flex sm:justify-between sm:text-left">
          <p>© 2026 Nama Produk. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="mt-2 sm:mt-0">Program Studi Ilmu Komputer Universitas Pertamina</p>
        </div>
      </footer>
    </>
  );
}

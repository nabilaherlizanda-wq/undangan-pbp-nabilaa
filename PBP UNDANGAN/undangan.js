/* ===== Pengaturan: ganti tanggal acara di sini ===== */
const TANGGAL_ACARA = new Date("2027-01-17T09:00:00+07:00");
const LOKASI_QUERY  = "Gedung Graha Bunga, Surabaya";   // dipakai untuk peta & tombol petunjuk arah

/* ===== 1. Ketuk segel: dua separuh amplop bergeser, undangan terlihat ===== */
const amplop = document.getElementById("amplop");
document.getElementById("segel").addEventListener("click", () => {
  amplop.classList.add("open");                 // CSS yang menganimasikan
});

/* ===== 2. Ketuk tombol: tulisan langsung berganti ===== */
const slides = document.querySelectorAll(".slide");
let sekarang = 0;
let sibuk = false;                              // cegah klik dobel saat animasi

document.querySelectorAll("[data-next]").forEach((tombol) => {
  tombol.addEventListener("click", () => {
    if (sibuk) return;
    sibuk = true;
    slides[sekarang].classList.add("pergi");    // slide lama memudar
    setTimeout(() => {
      slides[sekarang].classList.remove("active", "pergi");
      sekarang = (sekarang + 1) % slides.length; // setelah slide terakhir, balik ke awal
      slides[sekarang].classList.add("active");  // slide baru muncul
      sibuk = false;
    }, 350);
  });
});

/* ===== Tombol "Lihat dari awal": amplop menutup lagi ===== */
document.getElementById("ulang").addEventListener("click", () => {
  amplop.classList.remove("open");              // CSS menggeser dua separuh kembali ke tengah
  setTimeout(() => {                            // setelah amplop menutup, reset isi ke slide 1
    slides[sekarang].classList.remove("active");
    sekarang = 0;
    slides[0].classList.add("active");
  }, 1600);
});

/* ===== 3. Hitung mundur ===== */
const pad = (n) => String(n).padStart(2, "0");
function updateHitung() {
  const t = Math.max(TANGGAL_ACARA - new Date(), 0);
  document.getElementById("cd-hari").textContent  = pad(Math.floor(t / 86400000));
  document.getElementById("cd-jam").textContent   = pad(Math.floor(t / 3600000) % 24);
  document.getElementById("cd-menit").textContent = pad(Math.floor(t / 60000) % 60);
  document.getElementById("cd-detik").textContent = pad(Math.floor(t / 1000) % 60);
}
updateHitung();
setInterval(updateHitung, 1000);

/* ===== 4. Peta Google Maps dan tombol petunjuk arah dibuat dari LOKASI_QUERY ===== */
const q = encodeURIComponent(LOKASI_QUERY);
document.getElementById("peta").src = `https://www.google.com/maps?q=${q}&output=embed`;
document.getElementById("rute").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
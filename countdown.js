// Tunggu hingga DOM selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM sudah siap dan tersedia!");
    
    // Set tanggal target
    const countDownDate = new Date("Jan 25, 2025 00:00:00").getTime();

    // Fungsi untuk memperbarui countdown
    function updateCountdown() {
        // Dapatkan waktu saat ini
        const now = new Date().getTime();
        
        // Hitung selisih waktu
        const distance = countDownDate - now;
        
        // Kalkulasi waktu
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Pastikan elemen ada sebelum mengupdate
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");
        const countdownEl = document.getElementById("countdown");

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            daysEl.innerHTML = String(days).padStart(2, '0');
            hoursEl.innerHTML = String(hours).padStart(2, '0');
            minutesEl.innerHTML = String(minutes).padStart(2, '0');
            secondsEl.innerHTML = String(seconds).padStart(2, '0');
        }
        
        // Jika hitungan mundur selesai
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (countdownEl) {
                countdownEl.innerHTML = "ACARA TELAH DIMULAI";
            }
        }
    }

    // Jalankan updateCountdown setiap detik
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Jalankan updateCountdown sekali saat halaman dimuat
    updateCountdown();
});

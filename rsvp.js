// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getDatabase, ref, push, get, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

  // Konfigurasi Firebase Anda
  const firebaseConfig = {
    apiKey: "AIzaSyB5f8WB_6ocCrzcJFoReWrnQSE08BDPotw",
    authDomain: "database-bharata.firebaseapp.com",
    databaseURL: "https://database-bharata-default-rtdb.firebaseio.com",
    projectId: "database-bharata",
    storageBucket: "database-bharata.firebasestorage.app",
    messagingSenderId: "30913219799",
    appId: "1:30913219799:web:b0c72254fc990dd1f5b492",
    measurementId: "G-HJMM4W8YQ5"
  };

  // Inisialisasi Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const activityRef = ref(db, 'activities');

// Fungsi untuk kapitalisasi huruf pertama setiap kata
function capitalizeFirstLetter(name) {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Mendengarkan penambahan data secara real-time menggunakan onChildAdded
onChildAdded(activityRef, (snapshot) => {
  const activity = snapshot.val(); // Mendapatkan data dari snapshot
  const key = snapshot.key; // Mendapatkan key unik dari data
  const messagesContainer = document.getElementById('messages');

  // Mengatur warna badge dan teks berdasarkan status kehadiran
  const badgeColor = 
    activity.attendance.toLowerCase() === 'hadir' ? '#58b15b' : 
    activity.attendance.toLowerCase() === 'tidak' ? '#bb5f5f' : 
    activity.attendance.toLowerCase() === 'transparan' ? '#bb8d5f' :
    activity.attendance.toLowerCase() === 'bingung' ? '#9e9e9e' : '#9e9e9e'; // Default: abu-abu

  const badgeText = 
    activity.attendance.toLowerCase() === 'hadir' ? 'Hadir' :
    activity.attendance.toLowerCase() === 'tidak' ? 'Tidak Hadir' : 
    activity.attendance.toLowerCase() === 'transparan' ? 'Insya Allah' : 
    activity.attendance.toLowerCase() === 'bingung' ? 'Belum Tau' : 'Belum Tau'; // Default: Tidak Diketahui

  // Konversi timestamp ke format tanggal dan waktu
  const timestamp = new Date(activity.timestamp).toLocaleString('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  // Konversi timestamp ke format DD.MM.YYYY HH:mm
  const timestampDate = new Date(activity.timestamp);
  const formattedTimestamp = `${String(timestampDate.getDate()).padStart(2, '0')}.${String(timestampDate.getMonth() + 1).padStart(2, '0')}.${timestampDate.getFullYear()} ${String(timestampDate.getHours()).padStart(2, '0')}:${String(timestampDate.getMinutes()).padStart(2, '0')}`;

  // Kapitalisasi nama
  const capitalizedName = capitalizeFirstLetter(activity.name);

  // Membuat elemen baru untuk pesan
  const div = document.createElement('div');
  div.className = `message ${activity.attendance.toLowerCase()}`;
  div.innerHTML = `
    <div class="message-content">
        <strong><i class="bi bi-person-circle"></i> ${capitalizedName} 
          <span class="badge" style="background-color: ${badgeColor}">${badgeText}</span>
        </strong>
      <p>${activity.message}</p>
        <small style="color: #888; font-size: 9px; float:right;font-style:italic;">${formattedTimestamp}</small>
    </div>
  `;

  // Menambahkan pesan ke container
  messagesContainer.prepend(div);
});



  // Tambahkan data ke Firebase ketika form dikirim
  document.getElementById('greetingForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const message = document.getElementById('message').value;

    try {
      await push(activityRef, { name, attendance, message, timestamp: Date.now() });
      console.log('Pesan berhasil disimpan!');
      document.getElementById('greetingForm').reset();
      loadMessages();
    } catch (error) {
      console.error('Error menyimpan pesan:', error);
    }

        // Tutup modal setelah submit
    const modal = bootstrap.Modal.getInstance(document.getElementById('greetingModal'));
    modal.hide();

    // Reset form
    this.reset();
  });

  // Panggil fungsi loadMessages saat halaman dimuat
  document.addEventListener('DOMContentLoaded', loadMessages);

// Mendapatkan parameter URL
const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get('KepadaYth');

// Mengisi elemen namaTamu
document.addEventListener('DOMContentLoaded', function() {
    const elemenNamaTamu = document.getElementById('namaTamu');
    console.log('Parameter to:', namaTamu); // Debug parameter

    if (elemenNamaTamu) {
        elemenNamaTamu.textContent = namaTamu 
            ? decodeURIComponent(namaTamu.replace(/-/g, ' ')) 
            : 'Tamu Undangan';
    } else {
        console.error('Elemen namaTamu tidak ditemukan');
    }
});

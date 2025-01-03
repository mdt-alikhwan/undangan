        const audio = document.getElementById('backgroundMusic');
        const playButton = document.getElementsByClassName('musikfull')[0];

        // Coba memulai audio autoplay
        audio.play().then(() => {
            console.log("Audio started playing automatically.");
            audio.muted = false; // Matikan mute setelah autoplay berhasil
        }).catch(error => {
            console.warn("Autoplay failed. User interaction needed to play audio.");
            playButton.style.display = "inline-block"; // Tampilkan tombol jika autoplay gagal
        });

        // Mulai audio saat tombol diklik
        playButton.addEventListener('click', function() {
            audio.muted = false; // Pastikan mute dimatikan
            audio.play().then(() => {
                console.log("Audio started playing after user interaction.");
                playButton.style.display = "none"; // Sembunyikan tombol setelah audio dimulai
            }).catch(error => {
                console.error("Error playing audio:", error);
            });
        });

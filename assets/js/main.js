// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '🌹'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(heart);
    }
}

// ============================================
// PHOTO GALLERY
// ============================================
let currentPhotoIndex = 0;
const photos = document.querySelectorAll('.photo-slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function resetInterval() {
    clearInterval(slideInterval); // Limpia el intervalo actual
    slideInterval = setInterval(nextPhoto, 5000); // Reinicia el intervalo
}

function showPhoto(index) {
    photos.forEach(photo => photo.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    photos[index].classList.add('active');
    dots[index].classList.add('active');
    currentPhotoIndex = index;
}

function nextPhoto() {
    let next = (currentPhotoIndex + 1) % photos.length;
    showPhoto(next);
    resetInterval();
}

function previousPhoto() {
    let prev = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(prev);
    resetInterval();
}

function goToPhoto(index) {
    showPhoto(index);
    resetInterval();
}

// Auto-advance photos every 5 seconds
slideInterval = setInterval(nextPhoto, 5000);

// ============================================
// MUSIC PLAYER
// ============================================
const songs = [
    { title: "Love of My Life - Queen", memory: "De tus favoritas y siempre te gusta tocar en la guitarra", audio:"/assets/mp3/Love Of My Life (Remastered 2011).mp3" },
    { title: "Safe And Sound - Capital Cities", memory: "La cación que siempre me recuerda a vos", audio:"/assets/mp3/Safe_And_Sound.mp3" },
    { title: "Sunflower - Post Malone, Swae Lee", memory: "Una canción que siempre te tiene de buen mood", audio:"/assets/mp3/Sunflower.mp3" },
    { title: "Niño - Milo J", memory: "De parte del último album que te hizo llorar", audio:"/assets/mp3/Niño.mp3" },
    { title: "Ma Meilluere Ennemie - Arcane", memory: "Porque yo también quiero bailar con vos con 4 frames locos", audio:"/assets/mp3/3_frames.mp3" },
];

let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById('audioPlayer');

function updateSongDisplay() {
    document.getElementById('currentSong').textContent = '🎵 ' + songs[currentSongIndex].title;
    document.querySelector('.now-playing').textContent = songs[currentSongIndex].memory;
    audioPlayer.src = songs[currentSongIndex].audio;

    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.classList.toggle('active', index === currentSongIndex);
    });
}

function togglePlay() {
    if (isPlaying){
        audioPlayer.pause();
    }else {
        audioPlayer.play();
    }

    isPlaying = !isPlaying;
    document.getElementById('playBtn').textContent = isPlaying ? '⏸️' : '▶️';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongDisplay();
    if (isPlaying){
        audioPlayer.play();
    }
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongDisplay();
    if (isPlaying){
        audioPlayer.play();
    }
}

function selectSong(index) {
    currentSongIndex = index;
    updateSongDisplay();
    audioPlayer.play();
    isPlaying = true;
    document.getElementById('playBtn').textContent = '⏸️';
}
document.addEventListener('DOMContentLoaded', () => {
    updateSongDisplay();
    audioPlayer.load();

});

// ============================================
// VIDEO PLAYER
// ============================================
function playVideo() {
    const placeholder = document.querySelector('.video-placeholder');
    const icon = placeholder.querySelector('.video-icon');
    const text = placeholder.querySelector('.video-text');
    const video = placeholder.querySelector('video');

    // clones in case we need to restore
    let iconClone = null;
    let textClone = null;

    if (icon) {
        iconClone = icon.cloneNode(true);
        icon.remove();
    }
    if (text) {
        textClone = text.cloneNode(true);
        text.remove();
    }

    if (video) {
        // when it ends, put back the icon/text
        video.onended = () => {
            // reset video appearance
            video.classList.remove('active');
            video.currentTime = 0;

            // if clones still exist insert, otherwise recreate
            if (iconClone) {
                // guard against double insert
                if (!placeholder.querySelector('.video-icon')) {
                    placeholder.insertBefore(iconClone, video);
                }
            } else {
                // maybe re-create if initial elements were missing
                const newIcon = document.createElement('div');
                newIcon.className = 'video-icon';
                newIcon.textContent = '▶️';
                placeholder.insertBefore(newIcon, video);
            }
            if (textClone) {
                if (!placeholder.querySelector('.video-text')) {
                    placeholder.insertBefore(textClone, video);
                }
            } else {
                const newText = document.createElement('div');
                newText.className = 'video-text';
                newText.textContent = 'Pero un meme de los buenos';
                placeholder.insertBefore(newText, video);
            }
        };

        video.classList.add('active');
        video.play();
    }
}    

const videoWrappers = document.querySelectorAll('.video-wrapper');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
let currentVideoIndex = Math.floor(videoWrappers.length / 2);
let isPlaying = true;  // Indica si el video se está reproduciendo
let isMuted = true;  // Indica si el video está muteado
let isManualSelection = false; // Controla si el video fue seleccionado manualmente
let nextVideoTimeout = null;   // Almacena el timeout para el siguiente video

window.addEventListener('load', () => {
    const centerVideo = videoWrappers[currentVideoIndex].querySelector('video');
    centerVideo.muted = true;
    videoWrappers[currentVideoIndex].classList.add('active');
    muteBtn.textContent = 'Unmute';

    centerVideo.play().then(() => {
        centerVideo.addEventListener('ended', handleVideoEnd);
    }).catch(error => {
        console.error("Reproducción automática fallida:", error);
    });
});

// Función para reproducir el siguiente video automáticamente
function playNextVideo() {
    if (!isPlaying) return;

    // Pausa el video actual y quita la clase 'active'
    const currentVideo = videoWrappers[currentVideoIndex].querySelector('video');
    currentVideo.pause();
    videoWrappers[currentVideoIndex].classList.remove('active');

    // Avanza al siguiente video, reiniciando si se llega al último
    currentVideoIndex = (currentVideoIndex + 1) % videoWrappers.length;

    // Reproducir el siguiente video
    const nextWrapper = videoWrappers[currentVideoIndex];
    nextWrapper.classList.add('active');
    const nextVideo = nextWrapper.querySelector('video');

    nextVideo.currentTime = 0;  // Reinicia el video
    nextVideo.play();

    // Asegurar que los eventos se manejen adecuadamente
    nextVideo.removeEventListener('ended', handleVideoEnd);
    nextVideo.addEventListener('ended', handleVideoEnd);
}

// Función para manejar el fin del video
function handleVideoEnd() {
    if (!isManualSelection) {
        playNextVideo(); // Continúa con el siguiente video automáticamente
    } else {
        // Video playback ended after manual selection
        isManualSelection = false; // Restablecer manual selection flag
        isPlaying = true; // Resumir reproducción automática flag (opcional)
    }
}

// Función para seleccionar un video manualmente
function selectVideo(index) {
    isPlaying = false;
    isManualSelection = true;

    // Si hay un timeout para la reproducción automática, cancelarlo
    clearTimeout(nextVideoTimeout);

    // Pausa el video actual y quita la clase 'active'
    const currentVideo = videoWrappers[currentVideoIndex].querySelector('video');
    currentVideo.pause();
    videoWrappers[currentVideoIndex].classList.remove('active');

    // Actualiza el índice del video seleccionado manualmente
    currentVideoIndex = index;

    // Reproducir el video seleccionado
    const selectedWrapper = videoWrappers[currentVideoIndex];
    selectedWrapper.classList.add('active');
    const selectedVideo = selectedWrapper.querySelector('video');

    selectedVideo.currentTime = 0;  // Comienza desde el inicio
    selectedVideo.play();

    // Reestablecer el evento de fin del video para la reproducción manual
    selectedVideo.removeEventListener('ended', handleVideoEnd);
    selectedVideo.addEventListener('ended', () => {
        isManualSelection = false;
        isPlaying = true;
        playNextVideo();  // Reanuda la reproducción automática desde el siguiente video
    });
}

// Agregar un evento de clic a cada video para permitir la selección manual
videoWrappers.forEach((wrapper, index) => {
    wrapper.addEventListener('click', () => {
        selectVideo(index);  // Seleccionar el video clicado
    });
});

// Función para alternar entre reproducir y pausar el video
function togglePlayPause() {
    isPlaying = !isPlaying;
    const currentVideo = videoWrappers[currentVideoIndex].querySelector('video');
    if (isPlaying) {
        currentVideo.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        currentVideo.pause();
        playPauseBtn.textContent = 'Play';
    }
}

// Función para alternar entre silenciar y activar el sonido
function toggleMute() {
    isMuted = !isMuted;
    videoWrappers.forEach(wrapper => {
        wrapper.querySelector('video').muted = isMuted;
    });
    muteBtn.textContent = isMuted ? 'Unmute' : 'Mute';
}

// Asignar eventos a los botones de play/pause y mute
playPauseBtn.addEventListener('click', togglePlayPause);
muteBtn.addEventListener('click', toggleMute);
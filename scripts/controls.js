const videoBackground = document.getElementById('videoBackground');
const videoOverlay = document.getElementById('videoOverlay');

// Sincroniza la reproducción de los videos
function syncVideoPlayback() {
    videoOverlay.addEventListener('play', () => {
        videoBackground.play();
    });

    videoOverlay.addEventListener('pause', () => {
        videoBackground.pause();
    });

    videoOverlay.addEventListener('seeked', () => {
        videoBackground.currentTime = videoOverlay.currentTime;
    });

    videoOverlay.addEventListener('timeupdate', () => {
        if (Math.abs(videoOverlay.currentTime - videoBackground.currentTime) > 0.1) {
            videoBackground.currentTime = videoOverlay.currentTime;
        }
    });
}

// Llama a la función para sincronizar los videos
syncVideoPlayback();
const video = document.createElement('video');
const canvas = document.getElementById('cameraCanvas');
const context = canvas.getContext('2d');
let currentStream;

// Función para acceder a la cámara
const startCamera = async (facingMode) => {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } });
        currentStream = stream;
        video.srcObject = stream;
        video.play();
    } catch (error) {
        console.error('Error al acceder a la cámara:', error);
    }
};

// Cambiar entre cámaras frontal y trasera
const toggleCamera = () => {
    const facingMode = (currentStream && currentStream.getVideoTracks()[0].getSettings().facingMode === 'user') ? 'environment' : 'user';
    startCamera(facingMode);
};

// Iniciar con la cámara frontal
startCamera('user');

// Actualizar el canvas con los frames de la cámara
video.addEventListener('play', () => {
    const updateCanvas = () => {
        if (!video.paused && !video.ended) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(updateCanvas);
        }
    };
    updateCanvas();
});

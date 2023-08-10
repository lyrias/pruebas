const video = document.createElement('video');
const canvas = document.getElementById('cameraCanvas');
const context = canvas.getContext('2d');

let selectedCamera = 'environment'; // Valor por defecto para la cámara trasera

// Acceder a la cámara con la opción de cámara seleccionada
const startCamera = async (facingMode) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } });
        video.srcObject = stream;
        video.play();
    } catch (error) {
        console.error('Error al acceder a la cámara:', error);
    }
};

// Cambiar entre cámaras frontal y trasera
const toggleCamera = () => {
    selectedCamera = (selectedCamera === 'user') ? 'environment' : 'user';
    video.srcObject.getTracks().forEach(track => track.stop());
    startCamera(selectedCamera);
};

// Iniciar con la cámara seleccionada
startCamera(selectedCamera);

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

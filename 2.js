// Obtener el canvas y su contexto de dibujo
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Variables de estado del dibujo
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let lineColor = 'black'; // Color inicial

// Ajustar el tamaño del canvas al tamaño del Second Life Prim
function resizeCanvas() {
    // Usamos el tamaño de la ventana (que SL Media Prim usa)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Inicializar y redimensionar
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);


// === FUNCIÓN DE DIBUJO ===
function draw(e) {
    if (!isDrawing) return; // Detener la ejecución si no estamos haciendo clic
    
    // Configuración del pincel
    ctx.strokeStyle = lineColor;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    // Iniciar el trazo
    ctx.beginPath();
    // Mover desde el punto anterior
    ctx.moveTo(lastX, lastY);
    // Dibujar hasta el punto actual del ratón
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    // Actualizar las últimas coordenadas
    [lastX, lastY] = [e.clientX, e.clientY];
}

// === MANEJO DE EVENTOS DEL RATÓN/TÁCTIL ===

// Cuando el ratón es presionado (iniciar dibujo)
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY]; // Establecer punto de inicio
});

// Mientras el ratón se mueve (continuar dibujo)
canvas.addEventListener('mousemove', draw);

// Cuando el ratón es soltado o sale del canvas (detener dibujo)
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// === FUNCIONES DE CONTROL ===

// Función para borrar el lienzo (llamada por el botón)
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para cambiar el color (llamada por los botones)
function changeColor(color) {
    lineColor = color;
}
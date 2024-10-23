const carrusel2 = document.querySelector(".carrusel2-items");
const carrusel2Images = carrusel2.querySelectorAll('img');
const modal2 = document.getElementById('modal2');
const modal2Image = document.getElementById('modal2-image');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let maxScrollLeft = carrusel2.scrollWidth - carrusel2.clientWidth;
let intervalo = null;
let step = 1;
let currentImageIndex = 0;

// Función para iniciar el carrusel
const start = () => {
    intervalo = setInterval(function () {
        carrusel2.scrollLeft = carrusel2.scrollLeft + step;
        if (carrusel2.scrollLeft >= maxScrollLeft - 1) {
            step = step * -1;
        } else if (carrusel2.scrollLeft <= 0) {
            step = step * -1;
        }
    }, 10);
};

// Función para detener el carrusel
const stop = () => {
    clearInterval(intervalo);
};

// Función para abrir el modal
const openModal2 = (src, index) => {
    modal2Image.src = src;
    modal2.style.display = "flex";
    currentImageIndex = index;
    stop();
};

// Función para cerrar el modal
const closeModal2 = () => {
    modal2.style.display = "none";
    if (!carrusel2.matches(":hover")) {
        start();
    }
};

// Función para cambiar la imagen en el modal
const changeImage2 = (direction) => {
    currentImageIndex = (currentImageIndex + direction + carrusel2Images.length) % carrusel2Images.length;
    modal2Image.src = carrusel2Images[currentImageIndex].src;
};

// Event listeners para las imágenes del carrusel
carrusel2Images.forEach((img, index) => {
    img.addEventListener("click", () => {
        openModal2(img.src, index);
    });
});

// Event listeners para los botones del modal
closeBtn.addEventListener("click", closeModal2);
prevBtn.addEventListener("click", () => changeImage2(-1));
nextBtn.addEventListener("click", () => changeImage2(1));

// Event listeners para el carrusel
carrusel2.addEventListener("mouseover", stop);
carrusel2.addEventListener("mouseout", () => {
    if (modal2.style.display !== "flex") {
        start();
    }
});

// Event listener para cerrar el modal haciendo clic fuera de la imagen
modal2.addEventListener("click", (e) => {
    if (e.target === modal2) {
        closeModal2();
    }
});

// Event listener para las teclas de flecha
document.addEventListener('keydown', (e) => {
    if (modal2.style.display === "flex") {
        if (e.key === "ArrowLeft") {
            changeImage2(-1);
        } else if (e.key === "ArrowRight") {
            changeImage2(1);
        } else if (e.key === "Escape") {
            closeModal2();
        }
    }
});

// Ajustar maxScrollLeft en caso de cambio de tamaño de ventana
window.addEventListener("resize", () => {
    maxScrollLeft = carrusel2.scrollWidth - carrusel2.clientWidth;
});

// Iniciar el carrusel
start();
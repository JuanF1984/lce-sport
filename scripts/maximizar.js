const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeButton = document.querySelector('.close');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const images = document.querySelectorAll('.carrousel-img img');
let currentIndex = 0; // Índice de la imagen actual
let carouselInterval; // Variable para almacenar el intervalo del carrusel

// Función para abrir el modal con una imagen específica
function openModal(index) {
  modal.style.display = 'flex';
  showImage(index);
}

// Función para mostrar una imagen específica
function showImage(index) {
  currentIndex = index;
  modalImage.src = images[currentIndex].src;
  updateImageVisibility();
}

// Función para cambiar la imagen
function changeImage(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  showImage(currentIndex);
}

// Actualizar la visibilidad de las imágenes en el carrusel
function updateImageVisibility() {
  images.forEach((img, index) => {
    img.style.display = index === currentIndex ? 'block' : 'none';
  });
}

// Event listeners para cada imagen en la galería
images.forEach((img, index) => {
  img.addEventListener('click', () => openModal(index));
});

// Event listener para el botón de cerrar
closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Event listeners para los botones de navegación
prevButton.addEventListener('click', () => changeImage(-1));
nextButton.addEventListener('click', () => changeImage(1));

// Event listener para cerrar el modal al hacer clic en el fondo
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Función para activar o desactivar el carrusel automático
function toggleCarousel() {
  if (window.innerWidth <= 600) {
    if (!carouselInterval) {
      updateImageVisibility();
      carouselInterval = setInterval(() => changeImage(1), 3000);
    }
  } else {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
    images.forEach(img => img.style.display = 'block');
  }
}

// Ejecuta cuando la página carga y cuando se cambia el tamaño de la ventana
window.addEventListener('load', toggleCarousel);
window.addEventListener('resize', toggleCarousel);

// Añadir event listeners para pausar el carrusel al interactuar con él
modal.addEventListener('mouseenter', () => {
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
});

modal.addEventListener('mouseleave', () => {
  if (window.innerWidth <= 600) {
    carouselInterval = setInterval(() => changeImage(1), 3000);
  }
});

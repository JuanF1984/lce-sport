window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('header').style.display = 'grid';
        document.getElementById('main').style.display = 'block';
        document.getElementById('footer').style.display = 'block';
        let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
        let intervalo = null;
        let step = 1;
        const start = () => {

            intervalo = setInterval(function () {
                carrusel.scrollLeft = carrusel.scrollLeft + step;
                if (carrusel.scrollLeft >= maxScrollLeft - 1) {
                    step = step * -1;
                } else if (carrusel.scrollLeft <= 0) {
                    step = step * -1;
                }
            }, 10);
        };

        const stop = () => {
            clearInterval(intervalo);
        };

        carrusel.addEventListener("mouseover", () => {
            stop();
        });

        carrusel.addEventListener("mouseout", () => {
            start();
        });

        start();
    }, 5000); // Cambia este valor para ajustar el tiempo de carga
    const carrusel = document.querySelector(".carrusel2-items");


});
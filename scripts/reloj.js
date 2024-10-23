// Fecha del último día de octubre
const endDate = new Date('October 28, 2024 15:00:00').getTime();

function updateClock() {
    const now = new Date().getTime();
    const timeRemaining = endDate - now;

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement && hoursElement) {
        daysElement.textContent = days < 10 ? `0${days}` : days;
        hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
        if (minutesElement && secondsElement) {
            minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
            secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
        }
    }

    // Si el tiempo se acaba
    if (timeRemaining < 0) {
        clearInterval(timer);
        document.querySelector('.clock').textContent = "¡Evento Finalizado!";
    }
}

// Actualizar cada segundo
const timer = setInterval(updateClock, 1000);


window.addEventListener('DOMContentLoaded', () => {
    const timer = setInterval(updateClock, 1000);
    updateClock(); // Llamada inicial después de que la página ha cargado
});

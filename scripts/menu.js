document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu a');
    const menuCheckbox = document.getElementById('menu-hamburguesa');
    const body = document.body;

    // Función para manejar el estado del menú
    function handleMenuState() {
        if(menuCheckbox.checked) {
            body.classList.add('menu-open');
        } else {
            body.classList.remove('menu-open');
        }
    }

    // Event listener para el checkbox
    menuCheckbox.addEventListener('change', handleMenuState);

    // Event listener para los links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuCheckbox.checked = false;
            body.classList.remove('menu-open');
        });
    });
});
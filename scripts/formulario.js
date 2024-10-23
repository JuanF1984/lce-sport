import { db } from './firebase-config.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js';

document.getElementById('gamerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    if (!nombre || !email) {
        alert('Por favor, completa los campos obligatorios (Nombre y Email)');
        return;
    }

    // Obtener el resto de los valores
    const localidad = document.getElementById('localidad').value;
    const celular = document.getElementById('celular').value;
    const mensaje = document.getElementById('mensaje').value;

    try {
        // Agregar un nuevo documento a la colección "users"
        const docRef = await addDoc(collection(db, 'mensajesLCE'), {
            nombre: nombre,
            email: email,
            localidad: localidad,
            celular: celular,
            mensaje: mensaje
        });

        console.log('Documento escrito con ID: ', docRef.id);
        alert('Información enviada correctamente.');
        document.getElementById('gamerForm').reset();  // Limpiar el formulario

    } catch (e) {
        console.error('Error al agregar el documento: ', e);
        alert('Error al enviar la información.');
    }
});

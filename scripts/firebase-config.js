  // firebaseConfig.js
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js';
  
  // Aquí va tu configuración de Firebase
  const firebaseConfig = {
      apiKey: "AIzaSyBFxw-E_sCmIpMljle3ijHndAwlrM3kN4c",
      authDomain: "formulario-lc-esport.firebaseapp.com",
      projectId: "formulario-lc-esport",
      storageBucket: "formulario-lc-esport.appspot.com",
      messagingSenderId: "1071147115321",
      appId: "1:1071147115321:web:c0ee5fbb87d5974f9e7ee8",
      measurementId: "G-J8CB2LSFZF"
  };
  
  // Inicializamos Firebase y Firestore
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  
  export { db };

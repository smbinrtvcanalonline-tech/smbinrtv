// ============================================
// SMBINRTV - Firebase Configuration
// ============================================
// INSTRUCCIONES:
// 1. Ve a https://console.firebase.google.com
// 2. Crea un proyecto llamado "smbinrtv"
// 3. Activa Firestore, Storage y Authentication
// 4. Copia tu configuración aquí abajo
// 5. Elimina el comentario de las líneas de import
// ============================================

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getFirestore, collection, getDocs, addDoc, query, orderBy, limit }
//   from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ---- REEMPLAZA ESTO CON TU CONFIGURACIÓN ----
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// ---- CUANDO TENGAS LA CONFIG, DESCOMENTA ESTO ----
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const auth = getAuth(app);

// ---- FUNCIONES DE EJEMPLO ----

// Cargar noticias propias desde Firestore
// export async function cargarNoticias(cantidad = 6) {
//   const q = query(collection(db, "noticias"), orderBy("fecha", "desc"), limit(cantidad));
//   const snap = await getDocs(q);
//   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
// }

// Agregar noticia
// export async function agregarNoticia(data) {
//   return await addDoc(collection(db, "noticias"), {
//     ...data,
//     fecha: new Date(),
//     vistas: 0
//   });
// }

console.log('Firebase: Configura tus credenciales en js/firebase-config.js');

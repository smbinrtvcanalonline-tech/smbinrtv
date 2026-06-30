import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMKZ1an2qj7i1Imb6QK2GY_zbxb6aTqSg",
  authDomain: "smbinrtv-diario.firebaseapp.com",
  projectId: "smbinrtv-diario",
  storageBucket: "smbinrtv-diario.firebasestorage.app",
  messagingSenderId: "893568788949",
  appId: "1:893568788949:web:07f06830a9a4f3716e355c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

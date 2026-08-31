// 1. Impor module yang diperlukan dari firebase dan firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc,
    increment
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

// 2.konfigurasi firebase 
const firebaseConfig = {
  apiKey: "AIzaSyAk8Sxpz4YgDpQDW_G16syA7MTOUwu9dJM",
  authDomain: "uasgenap2026-4c825.firebaseapp.com",
  projectId: "uasgenap2026-4c825",
  storageBucket: "uasgenap2026-4c825.firebasestorage.app",
  messagingSenderId: "374262431493",
  appId: "1:374262431493:web:7714c207c50c34b2d6016c"
}

// 3.insialisasi firebase dan firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const messageCollection = collection(db, "message")
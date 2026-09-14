console.log('tes me')
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
const messagesCollection = collection(db, "message")

console.log('tes 00')
// Menemukan elemen-elemen DOM yang diperlukan
const chatForm = document.getElementById("chat-form")
const usernameInput = document.getElementById("username")
const messageInput = document.getElementById("message")
const chatBox = document.getElementById("chat-box")

// fitur kirim pesan 
chatForm.addEventListener("submit", async (e) => {
  event.preventDefault()
  
  const username = usernameInput.value.trim()
  const message = messageInput.value.trim()
  
  if (username && message) {
    // kirim ke firebase 
    try {
      await addDoc(messagesCollection, {
        username: username,
        message: message,
        waktu: serverTimestamp()
      })
      // bersihkan input setelah mengirim pesan
      messageInput.value = ""
    } catch (error) {
      console.log("Gagal mengirim pesan", error)
    }
  }
})

console.log('tes 0')

// fitur pesan listener(Realtime)
const queryPesan = query(messageCollection, orderBy("waktu", "asc"))

console.log("tes 1")

onSnapshot(queryPesan, (cuplikan) => {
  //Bersihkan chatBox sebelum menampilkan pesan baru
  chatBox.innerHTML = ""
  
  // tampilkan pesen baru chatBox
  cuplikan.forEach((doc) => {
    //Ambil data dari dokumen 
    const data = doc.data()
    
    // membuat tampilan waktu 
    const waktu = data.waktu.toDate().toLocaletimeString([], { hour: '2-digit', minute: '2-digit' })
    
    // render pesan (memanggil fungsi renderPesan)
    renderPesan(data.username, data.message, waktu)
  })
})

function renderPesan(username, message, waktu) {
  // buat elemen untuk menampilkan pesan 
  const massageDiv = document.createElement("div")
  
  // menambah nama class massage-card ke elemen massageDiv 
  massageDiv.classList.add("message-card")
  
  // menambahkan kontak pesan ke massageDiv
  massageDiv.innerHTML = `
  <div class="message-content">
    <strong>${username}</strong>
    <span>${message}</span>
  </div>
  <span class="time">${waktu}</span>
  ` //backtick
  
  // menambahkan massageDiv ke chatBox
  chatBox.appendChild(massageDiv)
}
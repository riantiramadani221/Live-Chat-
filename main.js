
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


// fitur pesan listener(Realtime)
const queryPesan = query(messagesCollection, orderBy("waktu", "asc"))


onSnapshot(queryPesan, (cuplikan) => {
  //Bersihkan chatBox sebelum menampilkan pesan baru
  chatBox.innerHTML = ""
  
  // tampilkan pesen baru chatBox
  cuplikan.forEach((doc) => {
    //Ambil data dari dokumen 
    const data = doc.data()
    
    // membuat tampilan waktu 
    const waktu = data.waktu.toDate().toLocaleTimeString([], 
    { hour: '2-digit', minute: '2-digit' })
    
    // render pesan (memanggil fungsi renderPesan)
    renderPesan(data.username, data.message, waktu)
  })
  
  // scroll chatBox ke bawa setiap kali ada pesan baru 
  chatBox.scrollTop = chatBox.scrollHeight
})

function renderPesan(username, message, waktu) {
  // buat elemen untuk menampilkan pesan 
  const massageDiv = document.createElement("div")
  
  // menambah nama class massage-card ke elemen massageDiv 
  massageDiv.classList.add("message-card")
  
// memanggil fungsi stringToColor untuk mendapatkan warna berdasarkan username
const warnaUser = stringToColor(username)
  
  // menambahkan kontak pesan ke massageDiv
  massageDiv.innerHTML = `
  <div class="message-content">
    <strong style="color: ${warnaUser}">${username}</strong>
    <span>${message}</span>
  </div>
  <span class="time">${waktu}</span>
  ` //backtick
  
  // menambahkan massageDiv ke chatBox
  chatBox.appendChild(massageDiv)
}

// Fungsi untuk mengubah String Nama menjadi Warna (HSL) yang Konsisten
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Ambil nilai Hue 0 - 360, dengan Saturation 65% & Lightness 40% agar warna tetap kontras/jelas
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 40%)`;
}
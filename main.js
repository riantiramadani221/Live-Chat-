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
// array yang berisi daftar URL stiker
const daftarStiker = [
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Grinning%20face/3D/grinning_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20with%20tears%20of%20joy/3D/face_with_tears_of_joy_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rolling%20on%20the%20floor%20laughing/3D/rolling_on_the_floor_laughing_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Beaming%20face%20with%20smiling%20eyes/3D/beaming_face_with_smiling_eyes_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Grinning%20squinting%20face/3D/grinning_squinting_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Smiling%20face%20with%20heart-eyes/3D/smiling_face_with_heart_eyes_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Star-struck/3D/star-struck_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20blowing%20a%20kiss/3D/face_blowing_a_kiss_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Smiling%20face%20with%20hearts/3D/smiling_face_with_hearts_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Smiling%20face%20with%20sunglasses/3D/smiling_face_with_sunglasses_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Zany%20face/3D/zany_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20savoring%20food/3D/face_savoring_food_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Squinting%20face%20with%20tongue/3D/squinting_face_with_tongue_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Thinking%20face/3D/thinking_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Exploding%20head/3D/exploding_head_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20screaming%20in%20fear/3D/face_screaming_in_fear_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Flushed%20face/3D/flushed_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Crying%20face/3D/crying_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Loudly%20crying%20face/3D/loudly_crying_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Angry%20face/3D/angry_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20with%20symbols%20on%20mouth/3D/face_with_symbols_on_mouth_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Thumbs%20up/3D/thumbs_up_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Thumbs%20down/3D/thumbs_down_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clapping%20hands/3D/clapping_hands_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Victory%20hand/3D/victory_hand_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Folded%20hands/3D/folded_hands_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Red%20heart/3D/red_heart_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire/3D/fire_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Party%20popper/3D/party_popper_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Collision/3D/collision_3d.png"
]

// Menemukan elemen-elemen DOM yang diperlukan
const chatForm = document.getElementById("chat-form")
const usernameInput = document.getElementById("username")
const messageInput = document.getElementById("message")
const chatBox = document.getElementById("chat-box")
const pemilihStiker = document.getElementById("pemilih-stiker")
const divDaftarStiker = document.getElementById("daftar-stiker")
const tombolStiker = document.getElementById("tombol-stiker")


// Render popup stiker
daftarStiker.forEach((url) => {
  // buat elemen img untuk setiap stiker
  const img = document.createElement("img")
  // menentukan sumber gambar stiker dari url
  img.src = url
  // menambah nama class pilihan- stiker
  img.classList.add("pilihan-stiker")
  
  // mengirim stiker ke firestore saat diklik
  img.onclick = () => {
    kirimStiker(url)
  }
  
  // menyemunyikan gambar yang tidak tersedia (URL salah)
  img.onerror = () => {
    img.style.display = "none"
  }
  
  // elemen img ditambahkan ke divDaftarStiker
  divDaftarStiker.appendChild(img)
})

// menampilkan panel pemilihan stiker saat tombol stiker diklik 
tombolStiker.onclick = () => {
  // toggle class tersembunyi pada panel pemilihan stiker 
  pemilihStiker.classList.toggle("tersembunyi")
}

//fungsi kirim stiker ke firestore
async function kirimStiker(url) {
  const username = usernameInput.value.trim()
  // sembunyikan panel pemilihan stiker setelah milih stiker 
  pemilihStiker.classList.add("tersembunyi")
  // mengirim ke firestore
  try {
    await addDoc(messagesCollection, {
      username: username,
      message: url,
      waktu: serverTimestamp(),
      tipe: "stiker"
    })
  } catch (error) {
    console.log("Gagal mengirim stiker:", error)
  }
}

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
    const waktu = data.waktu.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    // render pesan (memanggil fungsi renderPesan)
    renderPesan(data.username, data.message, waktu,data.tipe)
  })
  
  // scroll chatBox ke bawa setiap kali ada pesan baru 
  chatBox.scrollTop = chatBox.scrollHeight
})

function renderPesan(username, message, waktu, tipe ="teks") {
  // buat elemen untuk menampilkan pesan 
  const massageDiv = document.createElement("div")
  
  // menambah nama class massage-card ke elemen massageDiv 
  massageDiv.classList.add("message-card")
  
  // memanggil fungsi stringToColor untuk mendapatkan warna berdasarkan username
  const warnaUser = stringToColor(username)
  
  let isiPesan
  
  // jika tipe pesan adalah stiker, tampilan gambar 
  if (tipe==="stiker"){
    isiPesan=`<img src="${message}" alt="stiker" class="stiker"/>`
  }else{
    // kalau bukan stiker 
    isiPesan=`<span>$ {massage}</span`
  }
  
  // menambahkan kontak pesan ke massageDiv
  massageDiv.innerHTML = `
  <div class="message-content">
    <strong style="color: ${warnaUser}">${username}</strong>
    ${isiPesan}
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
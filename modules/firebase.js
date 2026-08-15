import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyChiqFpO-oFCxeh389cCRpeYx9CIWe9yms",
  authDomain: "aizzay-istri.firebaseapp.com",
  projectId: "aizzay-istri",
  storageBucket: "aizzay-istri.firebasestorage.app",
  messagingSenderId: "394975896550",
  appId: "1:394975896550:web:556491e973ef0266b56c27",
  measurementId: "G-H2P9TJ4JTL"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

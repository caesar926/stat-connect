import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfKcHjdlXpzkkmeLmQ9pycgkjnayG50mk",
  authDomain: "stat-connect-5da33.firebaseapp.com",
  projectId: "stat-connect-5da33",
  storageBucket: "stat-connect-5da33.firebasestorage.app",
  messagingSenderId: "886745060084",
  appId: "1:886745060084:web:baa829f39ec667cb4bc4a1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };